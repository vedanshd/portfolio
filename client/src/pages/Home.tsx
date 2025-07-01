import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function Home() {
  return (
    <div className="relative">
      <ThemeToggle />
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}
