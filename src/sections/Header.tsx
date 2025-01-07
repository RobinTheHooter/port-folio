"use client";

import React, { useState, useEffect } from "react";
import SectionScroller from "@/components/SectionScroller";

type SectionId = "hero" | "projects" | "about" | "contact";

export const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    const sections = ["hero", "projects", "about", "contact"] as SectionId[];
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.09,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id as SectionId;
          setActiveSection(id);
        }
      });
    }, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Navigation button styles
  const getNavButtonClass = (sectionId: SectionId) => {
    const baseClasses = "nav-item cursor-pointer";
    const activeClasses =
      "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900";
    return `${baseClasses} ${activeSection === sectionId ? activeClasses : ""}`;
  };

  return (
    <div className="flex justify-center items-center fixed top-3 w-full z-10">
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <SectionScroller targetId="hero" className={getNavButtonClass("hero")}>
          Home
        </SectionScroller>
        <SectionScroller
          targetId="projects"
          className={getNavButtonClass("projects")}
        >
          Projects
        </SectionScroller>
        <SectionScroller
          targetId="about"
          className={getNavButtonClass("about")}
        >
          About
        </SectionScroller>
        <SectionScroller
          targetId="contact"
          className={getNavButtonClass("contact")}
        >
          Contact
        </SectionScroller>
      </nav>
    </div>
  );
};
