import StarIcon from "@/assets/icons/star.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import { HeroOrbit } from "@/components/HeroOrbit";

export const HeroSparkles = () => {
  return (
    <>
      <HeroOrbit
        size={430}
        rotation={-14}
        shouldOrbit
        orbitDuration="30s"
        shouldSpin
        spinDuration="3s"
      >
        <SparkleIcon className="size-8 text-emerald-300/20" />
      </HeroOrbit>
      <HeroOrbit
        size={440}
        rotation={79}
        shouldOrbit
        orbitDuration="32s"
        shouldSpin
        spinDuration="3s"
      >
        <SparkleIcon className="size-5 text-emerald-300/20" />
      </HeroOrbit>
      <HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="34s">
        <div className="size-2 rounded-full bg-emerald-300/20" />
      </HeroOrbit>
      <HeroOrbit
        size={530}
        rotation={178}
        shouldOrbit
        orbitDuration="36s"
        shouldSpin
        spinDuration="3s"
      >
        <SparkleIcon className="size-10 text-emerald-300/20" />
      </HeroOrbit>
      <HeroOrbit
        size={550}
        rotation={20}
        shouldOrbit
        orbitDuration="38s"
        shouldSpin
        spinDuration="6s"
      >
        <StarIcon className="size-12 text-emerald-300" />
      </HeroOrbit>
      <HeroOrbit
        size={590}
        rotation={98}
        shouldOrbit
        orbitDuration="40s"
        shouldSpin
        spinDuration="6s"
      >
        <StarIcon className="size-8 text-emerald-300" />
      </HeroOrbit>
      <HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="42s">
        <div className="size-2 rounded-full bg-emerald-300/20" />
      </HeroOrbit>
      <HeroOrbit
        size={710}
        rotation={144}
        shouldOrbit
        orbitDuration="44s"
        shouldSpin
        spinDuration="3s"
      >
        <SparkleIcon className="size-14 text-emerald-300/20" />
      </HeroOrbit>
      <HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="46s">
        <div className="size-3 rounded-full bg-emerald-300/20" />
      </HeroOrbit>
      <HeroOrbit
        size={800}
        rotation={-72}
        shouldOrbit
        orbitDuration="48s"
        shouldSpin
        spinDuration="6s"
      >
        <StarIcon className="size-28 text-emerald-300" />
      </HeroOrbit>
    </>
  );
};
