"use client";

import React, { useCallback } from "react";

type SectionId = string;

interface SectionScrollerProps {
  targetId: SectionId; // ID of the section to scroll to
  children: React.ReactNode; // Content of the button/link
  className?: string; // Optional custom styles
}

const SectionScroller: React.FC<SectionScrollerProps> = ({
  targetId,
  children,
  className = "",
}) => {
  const scrollToSection = useCallback(() => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [targetId]);

  return (
    <button onClick={scrollToSection} className={className}>
      {children}
    </button>
  );
};

export default SectionScroller;
