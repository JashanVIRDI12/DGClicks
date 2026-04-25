"use client";

import ClickSpark from "@/components/reactbits/ClickSpark/ClickSpark";

export default function SiteWrapper({ children }) {
  return (
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={14}
      sparkRadius={28}
      sparkCount={10}
      duration={500}
      easing="ease-out"
      extraScale={1.2}
    >
      {children}
    </ClickSpark>
  );
}
