import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const sections = [
    "About",
    "Education",
    "Experience",
    "Projects",
    "Skills",
    "Contact",
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black shadow-lg"
    >
      <div className="max-w-6xl mx-auto flex justify-center p-4">
        <div className="flex gap-4">
          {sections.map((section) => (
            <Button
              key={section}
              variant="ghost"
              onClick={() => scrollToSection(section)}
              className="text-white hover:text-white/80 hover:bg-white/10"
            >
              {section}
            </Button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}