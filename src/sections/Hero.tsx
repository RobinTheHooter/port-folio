import cat from "@/assets/images/cat.png";
import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import GrainImage from "@/assets/images/grain.jpg";
import { HeroSparkles } from "@/components/HeroSparkles";
import SectionScroller from "@/components/SectionScroller";

export const HeroSection = () => {
  const email = process.env.NEXT_PUBLIC_EMAIL;

  return (
    <div id="hero" className="py-32 md:py-48 lg:py-60 relative overflow-x-clip">
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)",
        }}
      >
        <div
          className="fixed inset-0 -z-30 opacity-5"
          style={{
            backgroundImage: `url(${GrainImage.src})`,
          }}
        ></div>
        <div className="size-[620px] hero-ring"></div>
        <div className="size-[860px] hero-ring"></div>
        <div className="size-[1180px] hero-ring"></div>
        <div className="size-[1640px] hero-ring"></div>

        <HeroSparkles />
      </div>

      <div className="container">
        <div className="flex flex-col items-center">
          <div className="size-[220px] absolute top-1 md:top-16 lg:top-28"></div>

          <Image
            src={cat}
            className="size-[220px] absolute top-1 md:top-16 lg:top-28"
            alt="cat peeking"
          />

          <div className="bg-gray-950 border border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg">
            <div className="bg-green-500 size-2.5 rounded-full relative">
              <div className="bg-green-500 absolute inset-0 rounded-full animate-ping-large"></div>
            </div>
            <div>Available for new projects</div>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-3xl md:text-5xl text-center mt-8 tracking-wide">
            Building Exceptional User Experiences
          </h1>
          <p className="mt-4 text-center text-white/60 md:text-lg">
            I specialize in transforming designs into functional,
            high-performing web applications. Let's discuss your next project.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
          <SectionScroller
            targetId="projects"
            className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl"
          >
            <span className="font-semibold">Explore My Work</span>
            <ArrowDown className="size-4" />
          </SectionScroller>
          <a
            href={`mailto:${email}?subject=Let's Collaborate&body=Hi, I would like to discuss...`}
            target="_blank"
            className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 px-6 h-12 rounded-xl z-10 transition duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-700"
          >
            <span>👋</span>
            <span className="font-semibold">Let's Connect</span>
          </a>
        </div>
      </div>
    </div>
  );
};
