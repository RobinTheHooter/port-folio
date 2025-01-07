import ArrowRightUpIcon from "@/assets/icons/arrow-up-right.svg";

const footerLinks = [
  {
    title: "GitHub",
    href: "https://github.com/RobinTheHooter",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/jatin-chandra-choudhary-142283238/",
  },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-x-clip">
      <div
        className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 -z-10"
        style={{
          WebkitMaskImage:
            "radial-gradient(50% 50% at bottom center, black, transparent)",
          maskImage:
            "radial-gradient(50% 50% at bottom center, black, transparent)",
        }}
      ></div>
      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
          <div className="text-white/40">&copy; 2024. All rights reserved.</div>
          <nav className="flex flex-col md:flex-row items-center gap-8">
            {footerLinks.map((link) => (
              <a
                href={link.href}
                key={link.title}
                className="inline-flex items-center gap-1.5"
                target="_blank"
              >
                <span className="font-semibold">{link.title}</span>
                <ArrowRightUpIcon className="size-4" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
