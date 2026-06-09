"use client";

import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";

const experiences = portfolioData.experience;

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="My Journey"
          title="Experience & Education"
          description="A look at the roles, projects, and milestones that shaped how I build today."
        />

        <div className="relative mt-16 md:mt-20">
          {/* Center vertical line (desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(110, 231, 183, 0.4), rgba(56, 189, 248, 0.4))",
            }}
          />
          {/* Left vertical line (mobile) */}
          <div
            className="md:hidden absolute left-4 top-0 bottom-0 w-px"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(110, 231, 183, 0.4), rgba(56, 189, 248, 0.4))",
            }}
          />

          <div className="flex flex-col gap-10 md:gap-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={`${exp.company}-${exp.role}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative md:grid md:grid-cols-2 md:gap-12 pl-10 md:pl-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10">
                    <div className="size-4 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 ring-4 ring-gray-900" />
                    {index === 0 && (
                      <div className="absolute inset-0 size-4 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 animate-ping opacity-40" />
                    )}
                  </div>

                  {/* Spacer for alternating layout (desktop) */}
                  {!isLeft && <div className="hidden md:block" />}

                  <div className={isLeft ? "md:pr-8" : "md:pl-8"}>
                    <Card className="p-6 md:p-8">
                      <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-xs text-transparent bg-clip-text">
                        <span>{exp.period}</span>
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl mt-2">
                        {exp.role}
                      </h3>
                      <p className="text-white/70 text-sm md:text-base mt-1">
                        {exp.company}
                        <span className="text-white/40"> · {exp.location}</span>
                      </p>

                      <hr className="border-t-2 border-white/5 mt-4" />

                      <p className="text-white/60 text-sm md:text-base mt-4">
                        {exp.description}
                      </p>

                      <ul className="flex flex-col gap-2 mt-4">
                        {exp.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-2 text-sm text-white/60"
                          >
                            <CheckCircleIcon className="size-5 shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mt-5">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-medium px-3 py-1 rounded-full border border-white/15 text-white/70 bg-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout (desktop) */}
                  {isLeft && <div className="hidden md:block" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
