import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Experience() {
  const experience = {
    company: "Ericsson",
    position: "Software Intern",
    period: "May 2024 – July 2024",
    responsibilities: [
      "Developed Python-based automation scripts for network diagnostics, reducing manual effort by 40% and improving troubleshooting efficiency by 30%",
      "Executed over 100 test cases for telecom software validation, improving system reliability and reducing critical bugs by 25%",
      "Collaborated with cross-functional engineering teams to analyze and optimize mobile network protocols, resulting in 20% faster issue resolution across key modules",
      "Enhanced Linux system administration workflows through scripting, increasing daily telecom task efficiency by 35%",
      "Accelerated understanding of telecom architecture and network KPIs, contributing to a 15% improvement in monitoring accuracy during live network simulations"
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
