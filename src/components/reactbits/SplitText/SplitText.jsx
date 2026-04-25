"use client";

import { motion } from "framer-motion";

export default function SplitText({
  text = "",
  className = "",
  delay = 30, // faster
  duration = 0.5,
}) {
  const words = text.split(" ");
  let letterIndex = 0;

  return (
    <span className={className} style={{ display: "inline-block" }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((letter, i) => {
            const index = letterIndex++;
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration, delay: (index * delay) / 1000 }}
                style={{ display: "inline-block" }}
              >
                {letter}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration, delay: ((letterIndex++) * delay) / 1000 }}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {" "}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}
