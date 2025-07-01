import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex items-center justify-center text-center p-4"
    >
      {/* Abstract background pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

      <div className="max-w-4xl">
        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Vedansh Dhawan
        </motion.h1>
        <motion.h2
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8"
        >
          Computer Science Engineer | AI & Full-Stack Developer
        </motion.h2>
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4"
        >
          <Button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Get in Touch
          </Button>
          <Button variant="outline" asChild>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Download Resume
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}