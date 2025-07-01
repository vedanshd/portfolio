
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { VoiceNavigation } from "@/components/voice/VoiceNavigation";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const sections = [
    "About",
    "Education",
    "Experience",
    "Projects",
    "Skills",
    "Contact",
  ];

  const { toast } = useToast();

  const scrollToSection = (id: string) => {
    const sectionElement = document.getElementById(id.toLowerCase());
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
      toast({
        title: "Navigated",
        description: `Navigated to ${id} section`,
      });
    } else {
      toast({
        title: "Navigation Error",
        description: `Could not find ${id} section`,
        variant: "destructive",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex items-center justify-center space-x-2">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-white hover:text-white/80 hover:bg-white/10"
            >
              Home
            </Button>
          </Link>
          <VoiceNavigation sections={sections} onNavigate={scrollToSection} />
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
