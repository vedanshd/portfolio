import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Experience() {
  const experience = {
    company: "Ericsson",
    position: "Software Intern",
    period: "May 2024 – July 2024",
    responsibilities: [
      "Telecommunication Fundamentals – Strong knowledge of network operations & mobile communication protocols",
      "Linux Proficiency – Experience with command-line operations, scripting, and system administration",
      "Python Programming – Built automation scripts, data analysis pipelines, and efficiency-improving tools",
      "Software Testing & Troubleshooting – Developed test cases to enhance software reliability & optimize network performance",
      "Cross-Functional Collaboration – Worked with diverse teams to improve network efficiency and service quality"
    ]
  };

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{experience.company}</CardTitle>
              <p className="text-muted-foreground">{experience.period}</p>
              <p className="font-medium">{experience.position}</p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {experience.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
