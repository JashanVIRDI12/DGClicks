"use client";

import { useRef, useState, useEffect } from 'react';
import { mat4, quat, vec2, vec3 } from 'gl-matrix';
import './InfiniteMenu.css';

// ── GLSL Shaders ──────────────────────────────────────────────────────────────

const discVertShaderSource = `#version 300 es

uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;

in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

#define PI 3.141593

void main() {
  vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);
  vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;
  float radius = length(centerPos.xyz);

  if (gl_VertexID > 0) {
    vec3 rotationAxis = uRotationAxisVelocity.xyz;
    float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);
    vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
    vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
    float strength = dot(stretchDir, relativeVertexPos);
    float invAbsStrength = min(0., abs(strength) - 1.);
    strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);
    worldPosition.xyz += stretchDir * strength;
  }

  worldPosition.xyz = radius * normalize(worldPosition.xyz);
  gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;
  vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;
  vUvs = aModelUvs;
  vInstanceId = gl_InstanceID;
}`;

const discFragShaderSource = `#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;

out vec4 outColor;
in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;

void main() {
  int itemIndex = vInstanceId % uItemCount;
  int cellsPerRow = uAtlasSize;
  int cellX = itemIndex % cellsPerRow;
  int cellY = itemIndex / cellsPerRow;
  vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));
  vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;

  ivec2 texSize = textureSize(uTex, 0);
  float imageAspect = float(texSize.x) / float(texSize.y);
  float containerAspect = 1.0;
  float scale = max(imageAspect / containerAspect, containerAspect / imageAspect);

  vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
  st = (st - 0.5) * scale + 0.5;
  st = clamp(st, 0.0, 1.0);
  st = st * cellSize + cellOffset;

  outColor = texture(uTex, st);
  outColor.a *= vAlpha;
}`;

// ── Geometry helpers ──────────────────────────────────────────────────────────

class Face {
  constructor(a, b, c) { this.a = a; this.b = b; this.c = c; }
}

class Vertex {
  constructor(x, y, z) {
    this.position = vec3.fromValues(x, y, z);
    this.normal = vec3.create();
    this.uv = vec2.create();
  }
}

class Geometry {
  constructor() { this.vertices = []; this.faces = []; }

  addVertex(...args) {
    for (let i = 0; i < args.length; i += 3)
      this.vertices.push(new Vertex(args[i], args[i+1], args[i+2]));
    return this;
  }

  addFace(...args) {
    for (let i = 0; i < args.length; i += 3)
      this.faces.push(new Face(args[i], args[i+1], args[i+2]));
    return this;
  }

  get lastVertex() { return this.vertices[this.vertices.length - 1]; }

  subdivide(divisions = 1) {
    const cache = {};
    let f = this.faces;
    for (let d = 0; d < divisions; d++) {
      const nf = new Array(f.length * 4);
      f.forEach((face, ndx) => {
        const mAB = this.getMidPoint(face.a, face.b, cache);
        const mBC = this.getMidPoint(face.b, face.c, cache);
        const mCA = this.getMidPoint(face.c, face.a, cache);
        const i = ndx * 4;
        nf[i]   = new Face(face.a, mAB, mCA);
        nf[i+1] = new Face(face.b, mBC, mAB);
        nf[i+2] = new Face(face.c, mCA, mBC);
        nf[i+3] = new Face(mAB, mBC, mCA);
      });
      f = nf;
    }
    this.faces = f;
    return this;
  }

  spherize(radius = 1) {
    this.vertices.forEach(v => {
      vec3.normalize(v.normal, v.position);
      vec3.scale(v.position, v.normal, radius);
    });
    return this;
  }

  getMidPoint(ndxA, ndxB, cache) {
    const key = ndxA < ndxB ? `k_${ndxB}_${ndxA}` : `k_${ndxA}_${ndxB}`;
    if (key in cache) return cache[key];
    const a = this.vertices[ndxA].position;
    const b = this.vertices[ndxB].position;
    const ndx = this.vertices.length;
    cache[key] = ndx;
    this.addVertex((a[0]+b[0])*.5, (a[1]+b[1])*.5, (a[2]+b[2])*.5);
    return ndx;
  }

  get data() {
    return {
      vertices: new Float32Array(this.vertices.flatMap(v => Array.from(v.position))),
      indices:  new Uint16Array(this.faces.flatMap(f => [f.a, f.b, f.c])),
      normals:  new Float32Array(this.vertices.flatMap(v => Array.from(v.normal))),
      uvs:      new Float32Array(this.vertices.flatMap(v => Array.from(v.uv))),
    };
  }
}

class IcosahedronGeometry extends Geometry {
  constructor() {
    super();
    const t = Math.sqrt(5) * .5 + .5;
    this.addVertex(-1,t,0, 1,t,0, -1,-t,0, 1,-t,0, 0,-1,t, 0,1,t, 0,-1,-t, 0,1,-t, t,0,-1, t,0,1, -t,0,-1, -t,0,1)
      .addFace(0,11,5, 0,5,1, 0,1,7, 0,7,10, 0,10,11, 1,5,9, 5,11,4, 11,10,2, 10,7,6, 7,1,8, 3,9,4, 3,4,2, 3,2,6, 3,6,8, 3,8,9, 4,9,5, 2,4,11, 6,2,10, 8,6,7, 9,8,1);
  }
}

class DiscGeometry extends Geometry {
  constructor(steps = 4, radius = 1) {
    super();
    const alpha = (2 * Math.PI) / Math.max(4, steps);
    this.addVertex(0,0,0);
    this.lastVertex.uv[0] = .5; this.lastVertex.uv[1] = .5;
    for (let i = 0; i < Math.max(4,steps); i++) {
      const x = Math.cos(alpha*i), y = Math.sin(alpha*i);
      this.addVertex(radius*x, radius*y, 0);
      this.lastVertex.uv[0] = x*.5+.5; this.lastVertex.uv[1] = y*.5+.5;
      if (i > 0) this.addFace(0, i, i+1);
    }
    this.addFace(0, Math.max(4,steps), 1);
  }
}

// ── WebGL helpers ─────────────────────────────────────────────────────────────

function createShader(gl, type, source) {
  const s = gl.createShader(type);
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (gl.getShaderParameter(s, gl.COMPILE_STATUS)) return s;
  console.error(gl.getShaderInfoLog(s));
  gl.deleteShader(s);
  return null;
}

function createProgram(gl, [vertSrc, fragSrc], tfVaryings, attribLocs) {
  const p = gl.createProgram();
  [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((t,i) => {
    const s = createShader(gl, t, [vertSrc,fragSrc][i]);
    if (s) gl.attachShader(p, s);
  });
  if (tfVaryings) gl.transformFeedbackVaryings(p, tfVaryings, gl.SEPARATE_ATTRIBS);
  if (attribLocs) Object.entries(attribLocs).forEach(([k,v]) => gl.bindAttribLocation(p,v,k));
  gl.linkProgram(p);
  if (gl.getProgramParameter(p, gl.LINK_STATUS)) return p;
  console.error(gl.getProgramInfoLog(p));
  gl.deleteProgram(p);
  return null;
}

function makeVertexArray(gl, bufLocNumElmPairs, indices) {
  const va = gl.createVertexArray();
  gl.bindVertexArray(va);
  for (const [buf, loc, n] of bufLocNumElmPairs) {
    if (loc === -1) continue;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, n, gl.FLOAT, false, 0, 0);
  }
  if (indices) {
    const ib = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  }
  gl.bindVertexArray(null);
  return va;
}

function makeBuffer(gl, data, usage) {
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, data, usage);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return buf;
}

function createTexture(gl) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return tex;
}

function resizeCanvas(canvas) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.round(canvas.clientWidth * dpr);
  const h = Math.round(canvas.clientHeight * dpr);
  if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; return true; }
  return false;
}

// ── ArcballControl ────────────────────────────────────────────────────────────

class ArcballControl {
  constructor(canvas, cb) {
    this.canvas = canvas;
    this.cb = cb || (() => {});
    this.isPointerDown = false;
    this.orientation = quat.create();
    this.pointerRotation = quat.create();
    this.rotationVelocity = 0;
    this.rotationAxis = vec3.fromValues(1,0,0);
    this.snapDirection = vec3.fromValues(0,0,-1);
    this.snapTargetDirection = null;
    this._pointerPos = vec2.create();
    this._prevPointerPos = vec2.create();
    this._rv = 0;
    this._cq = quat.create();
    this._IDENTITY = quat.create();

    canvas.addEventListener('pointerdown', e => {
      vec2.set(this._pointerPos, e.clientX, e.clientY);
      vec2.copy(this._prevPointerPos, this._pointerPos);
      this.isPointerDown = true;
    });
    canvas.addEventListener('pointerup', () => { this.isPointerDown = false; });
    canvas.addEventListener('pointerleave', () => { this.isPointerDown = false; });
    canvas.addEventListener('pointermove', e => {
      if (this.isPointerDown) vec2.set(this._pointerPos, e.clientX, e.clientY);
    });
    canvas.style.touchAction = 'none';
  }

  update(dt, targetFPS = 16) {
    const ts = dt / targetFPS + 0.00001;
    let af = ts;
    const snap = quat.create();

    if (this.isPointerDown) {
      const INT = 0.3 * ts;
      const AMP = 5 / ts;
      const mid = vec2.sub(vec2.create(), this._pointerPos, this._prevPointerPos);
      vec2.scale(mid, mid, INT);
      if (vec2.sqrLen(mid) > 0.1) {
        vec2.add(mid, this._prevPointerPos, mid);
        const p = this._project(mid), q = this._project(this._prevPointerPos);
        vec2.copy(this._prevPointerPos, mid);
        af *= AMP;
        this._quatFromVecs(vec3.normalize(vec3.create(),p), vec3.normalize(vec3.create(),q), this.pointerRotation, af);
      } else {
        quat.slerp(this.pointerRotation, this.pointerRotation, this._IDENTITY, INT);
      }
    } else {
      quat.slerp(this.pointerRotation, this.pointerRotation, this._IDENTITY, 0.1*ts);
      if (this.snapTargetDirection) {
        const sqrD = vec3.squaredDistance(this.snapTargetDirection, this.snapDirection);
        af *= 0.2 * Math.max(0.1, 1 - sqrD*10);
        this._quatFromVecs(this.snapTargetDirection, this.snapDirection, snap, af);
      }
    }

    const cq = quat.multiply(quat.create(), snap, this.pointerRotation);
    this.orientation = quat.normalize(quat.create(), quat.multiply(quat.create(), cq, this.orientation));
    quat.slerp(this._cq, this._cq, cq, 0.8*ts);
    quat.normalize(this._cq, this._cq);

    const rad = Math.acos(this._cq[3]) * 2;
    const s = Math.sin(rad/2);
    let rv = 0;
    if (s > 1e-6) {
      rv = rad / (2*Math.PI);
      this.rotationAxis[0] = this._cq[0]/s;
      this.rotationAxis[1] = this._cq[1]/s;
      this.rotationAxis[2] = this._cq[2]/s;
    }
    this._rv += (rv - this._rv) * 0.5 * ts;
    this.rotationVelocity = this._rv / ts;
    this.cb(dt);
  }

  _quatFromVecs(a, b, out, af = 1) {
    const axis = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), a, b));
    const angle = Math.acos(Math.max(-1, Math.min(1, vec3.dot(a, b)))) * af;
    quat.setAxisAngle(out, axis, angle);
  }

  _project(pos) {
    const r = 2, w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    const s = Math.max(w, h) - 1;
    const x = (2*pos[0]-w-1)/s, y = (2*pos[1]-h-1)/s;
    const xySq = x*x+y*y, rSq = r*r;
    const z = xySq <= rSq/2 ? Math.sqrt(rSq-xySq) : rSq/Math.sqrt(xySq);
    return vec3.fromValues(-x, y, z);
  }
}

// ── InfiniteGridMenu class ────────────────────────────────────────────────────

class InfiniteGridMenu {
  constructor(canvas, items, onActiveItem, onMovementChange, onInit, scale = 1.0) {
    this.canvas = canvas;
    this.items = items;
    this.onActiveItem = onActiveItem;
    this.onMovementChange = onMovementChange;
    this.scaleFactor = scale;
    this.SPHERE_RADIUS = 2;
    this.TARGET_FPS = 1000/60;
    this._time = 0; this._dt = 0; this._dFrames = 0; this._frames = 0;
    this._moving = false;
    this.smoothRV = 0;

    this.camera = {
      matrix: mat4.create(), near: .1, far: 40, fov: Math.PI/4, aspect: 1,
      position: vec3.fromValues(0, 0, 3 * scale), up: vec3.fromValues(0,1,0),
      matrices: { view: mat4.create(), projection: mat4.create(), inversProjection: mat4.create() }
    };

    this._init(onInit);
  }

  _init(onInit) {
    const gl = this.canvas.getContext('webgl2', { antialias: true, alpha: true });
    if (!gl) throw new Error('No WebGL2');
    this.gl = gl;

    this.prog = createProgram(gl, [discVertShaderSource, discFragShaderSource], null, {
      aModelPosition: 0, aModelNormal: 1, aModelUvs: 2, aInstanceMatrix: 3
    });

    this.loc = {
      aModelPosition: gl.getAttribLocation(this.prog, 'aModelPosition'),
      aModelUvs:      gl.getAttribLocation(this.prog, 'aModelUvs'),
      aInstanceMatrix:gl.getAttribLocation(this.prog, 'aInstanceMatrix'),
      uWorldMatrix:   gl.getUniformLocation(this.prog, 'uWorldMatrix'),
      uViewMatrix:    gl.getUniformLocation(this.prog, 'uViewMatrix'),
      uProjectionMatrix: gl.getUniformLocation(this.prog, 'uProjectionMatrix'),
      uCameraPosition:gl.getUniformLocation(this.prog, 'uCameraPosition'),
      uRotationAxisVelocity: gl.getUniformLocation(this.prog, 'uRotationAxisVelocity'),
      uTex:           gl.getUniformLocation(this.prog, 'uTex'),
      uFrames:        gl.getUniformLocation(this.prog, 'uFrames'),
      uItemCount:     gl.getUniformLocation(this.prog, 'uItemCount'),
      uAtlasSize:     gl.getUniformLocation(this.prog, 'uAtlasSize'),
    };

    const disc = new DiscGeometry(56, 1);
    this.discData = disc.data;
    this.discVAO = makeVertexArray(gl, [
      [makeBuffer(gl, this.discData.vertices, gl.STATIC_DRAW), this.loc.aModelPosition, 3],
      [makeBuffer(gl, this.discData.uvs, gl.STATIC_DRAW), this.loc.aModelUvs, 2],
    ], this.discData.indices);

    const ico = new IcosahedronGeometry();
    ico.subdivide(1).spherize(this.SPHERE_RADIUS);
    this.instancePositions = ico.vertices.map(v => v.position);
    this.DISC_COUNT = ico.vertices.length;
    this._initInstances();
    this._initTexture();

    this.worldMatrix = mat4.create();
    this.control = new ArcballControl(this.canvas, dt => this._onControl(dt));
    this._updateCamera();
    this._updateProjection();
    this.resize();
    if (onInit) onInit(this);
  }

  _initTexture() {
    const gl = this.gl;
    this.tex = createTexture(gl);
    const n = Math.max(1, this.items.length);
    this.atlasSize = Math.ceil(Math.sqrt(n));
    const cell = 512;
    const atlas = document.createElement('canvas');
    atlas.width = this.atlasSize * cell;
    atlas.height = this.atlasSize * cell;
    const ctx = atlas.getContext('2d');

    Promise.all(this.items.map(item => new Promise(res => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => res(img);
      img.src = item.image;
    }))).then(imgs => {
      imgs.forEach((img, i) => {
        const x = (i % this.atlasSize) * cell;
        const y = Math.floor(i / this.atlasSize) * cell;
        ctx.drawImage(img, x, y, cell, cell);
      });
      gl.bindTexture(gl.TEXTURE_2D, this.tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
      gl.generateMipmap(gl.TEXTURE_2D);
    });
  }

  _initInstances() {
    const gl = this.gl;
    const arr = new Float32Array(this.DISC_COUNT * 16);
    const mats = [];
    for (let i = 0; i < this.DISC_COUNT; i++) {
      const m = new Float32Array(arr.buffer, i*64, 16);
      mat4.identity(m);
      mats.push(m);
    }
    this.discInstances = { arr, mats, buf: gl.createBuffer() };
    gl.bindVertexArray(this.discVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buf);
    gl.bufferData(gl.ARRAY_BUFFER, arr.byteLength, gl.DYNAMIC_DRAW);
    for (let j = 0; j < 4; j++) {
      const loc = this.loc.aInstanceMatrix + j;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 64, j*16);
      gl.vertexAttribDivisor(loc, 1);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);
  }

  resize() {
    resizeCanvas(this.canvas);
    if (this.gl) this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    this._updateProjection();
  }

  run(time = 0) {
    this._dt = Math.min(32, time - this._time);
    this._time = time;
    this._dFrames = this._dt / this.TARGET_FPS;
    this._frames += this._dFrames;
    this._animate(this._dt);
    this._render();
    requestAnimationFrame(t => this.run(t));
  }

  _animate(dt) {
    this.control.update(dt, this.TARGET_FPS);
    const positions = this.instancePositions.map(p => vec3.transformQuat(vec3.create(), p, this.control.orientation));
    positions.forEach((p, ndx) => {
      const s = (Math.abs(p[2]) / this.SPHERE_RADIUS) * 0.6 + 0.4;
      const final = s * 0.25;
      const m = mat4.create();
      mat4.multiply(m, m, mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)));
      mat4.multiply(m, m, mat4.targetTo(mat4.create(), [0,0,0], p, [0,1,0]));
      mat4.multiply(m, m, mat4.fromScaling(mat4.create(), [final,final,final]));
      mat4.multiply(m, m, mat4.fromTranslation(mat4.create(), [0,0,-this.SPHERE_RADIUS]));
      mat4.copy(this.discInstances.mats[ndx], m);
    });
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.discInstances.buf);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.discInstances.arr);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    this.smoothRV = this.control.rotationVelocity;
  }

  _render() {
    const gl = this.gl;
    gl.useProgram(this.prog);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniformMatrix4fv(this.loc.uWorldMatrix, false, this.worldMatrix);
    gl.uniformMatrix4fv(this.loc.uViewMatrix, false, this.camera.matrices.view);
    gl.uniformMatrix4fv(this.loc.uProjectionMatrix, false, this.camera.matrices.projection);
    gl.uniform3f(this.loc.uCameraPosition, ...this.camera.position);
    gl.uniform4f(this.loc.uRotationAxisVelocity, ...this.control.rotationAxis, this.smoothRV * 1.1);
    gl.uniform1i(this.loc.uItemCount, this.items.length);
    gl.uniform1i(this.loc.uAtlasSize, this.atlasSize);
    gl.uniform1f(this.loc.uFrames, this._frames);
    gl.uniform1f(this.loc.uScaleFactor, this.scaleFactor);
    gl.uniform1i(this.loc.uTex, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.bindVertexArray(this.discVAO);
    gl.drawElementsInstanced(gl.TRIANGLES, this.discData.indices.length, gl.UNSIGNED_SHORT, 0, this.DISC_COUNT);
    gl.bindVertexArray(null);
  }

  _updateCamera() {
    mat4.targetTo(this.camera.matrix, this.camera.position, [0,0,0], this.camera.up);
    mat4.invert(this.camera.matrices.view, this.camera.matrix);
  }

  _updateProjection() {
    if (!this.gl) return;
    const cv = this.gl.canvas;
    this.camera.aspect = cv.clientWidth / cv.clientHeight;
    const h = this.SPHERE_RADIUS * 0.35, d = this.camera.position[2];
    this.camera.fov = this.camera.aspect > 1
      ? 2 * Math.atan(h/d)
      : 2 * Math.atan(h/this.camera.aspect/d);
    mat4.perspective(this.camera.matrices.projection, this.camera.fov, this.camera.aspect, this.camera.near, this.camera.far);
    mat4.invert(this.camera.matrices.inversProjection, this.camera.matrices.projection);
  }

  _onControl(dt) {
    const ts = dt / this.TARGET_FPS + 0.0001;
    let damp = 5/ts, targetZ = 3 * this.scaleFactor;
    const isMoving = this.control.isPointerDown || Math.abs(this.smoothRV) > 0.01;
    if (isMoving !== this._moving) { this._moving = isMoving; this.onMovementChange(isMoving); }
    if (!this.control.isPointerDown) {
      const ni = this._nearestVertex();
      this.onActiveItem(ni % Math.max(1, this.items.length));
      this.control.snapTargetDirection = vec3.normalize(vec3.create(), this._getWorldPos(ni));
    } else {
      targetZ += this.control.rotationVelocity * 80 + 2.5;
      damp = 7/ts;
    }
    this.camera.position[2] += (targetZ - this.camera.position[2]) / damp;
    this._updateCamera();
  }

  _nearestVertex() {
    const n = this.control.snapDirection;
    const inv = quat.conjugate(quat.create(), this.control.orientation);
    const nt = vec3.transformQuat(vec3.create(), n, inv);
    let maxD = -1, best = 0;
    for (let i = 0; i < this.instancePositions.length; i++) {
      const d = vec3.dot(nt, this.instancePositions[i]);
      if (d > maxD) { maxD = d; best = i; }
    }
    return best;
  }

  _getWorldPos(idx) {
    return vec3.transformQuat(vec3.create(), this.instancePositions[idx], this.control.orientation);
  }
}

// ── React Component ───────────────────────────────────────────────────────────

const defaultItems = [{
  image: 'https://picsum.photos/900/900?grayscale',
  link: '/', title: '', description: ''
}];

export default function InfiniteMenu({ items = [], scale = 1.0 }) {
  const canvasRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let sketch = null;

    const handleActive = (index) => {
      const src = items.length ? items : defaultItems;
      setActiveItem(src[index % src.length]);
    };

    sketch = new InfiniteGridMenu(
      canvas,
      items.length ? items : defaultItems,
      handleActive,
      setIsMoving,
      sk => sk.run(),
      scale
    );

    const onResize = () => sketch?.resize();
    window.addEventListener('resize', onResize);
    onResize();

    return () => window.removeEventListener('resize', onResize);
  }, [items, scale]);

  const handleClick = () => {
    if (!activeItem?.link) return;
    if (activeItem.link.startsWith('http')) window.open(activeItem.link, '_blank');
    else window.location.href = activeItem.link;
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas id="infinite-grid-menu-canvas" ref={canvasRef} />
      {activeItem && (
        <>
          <h2 className={`face-title ${isMoving ? 'inactive' : 'active'}`}>{activeItem.title}</h2>
          <p className={`face-description ${isMoving ? 'inactive' : 'active'}`}>{activeItem.description}</p>
          <div onClick={handleClick} className={`action-button ${isMoving ? 'inactive' : 'active'}`}>
            <p className="action-button-icon">&#x2197;</p>
          </div>
        </>
      )}
    </div>
  );
}
