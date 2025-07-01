import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl w-full"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-background to-muted">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Background</h3>
              <p className="text-lg mb-4">
                I'm a Computer Science student at VIT Vellore with a passion for solving real-world problems through AI, full-stack development, and automation. Currently maintaining a CGPA of 9.15, I've had the opportunity to work as a Software Intern at Ericsson.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-bl from-background to-muted">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Expertise</h3>
              <p className="text-lg">
                My expertise spans Python, Java, JavaScript, C++, with a focus on AI/ML and Web Development. I'm deeply involved in the tech community as a Core Committee Member of the Blockchain Community and VIT Model United Nations Society.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}