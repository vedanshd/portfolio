import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Projects() {
  const projects = [
    {
      name: "Personal Portfolio Website",
      date: "2024",
      technologies: "React, TypeScript, Tailwind CSS, Express.js, PostgreSQL, OpenAI API, Framer Motion",
      details: [
        "Voice navigation system for enhanced accessibility",
        "Dark/light theme toggle with smooth transitions",
        "AI-powered chatbot for interactive user engagement",
        "Animated UI components using Framer Motion",
        "Contact form with backend integration and email notifications",
        "Fully SEO-optimized and deployed via Vercel"
      ],
      link: "Live Demo"
    },
    {
      name: "VDreamScape – AI-Powered Dream Analysis App", 
      date: "2024",
      technologies: "Full-stack development with AI integration",
      details: [
        "Built a comprehensive dream analysis platform using AI to interpret user-submitted dreams",
        "Advanced symbol analysis and psychological narrative generation",
        "Interactive reflection prompts for deeper self-understanding",
        "Responsive UI design with seamless light/dark theme switching",
        "Integrated OpenAI API with intelligent fallback mechanisms for graceful degradation",
        "Deployed with optimized performance and user experience"
      ],
      link: "Live Demo"
    }
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-primary">{project.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{project.date}</p>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    <strong>Technologies:</strong> {project.technologies}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    {project.details.map((detail, i) => (
                      <li key={i} className="text-sm leading-relaxed">{detail}</li>
                    ))}
                  </ul>
                  {project.link && (
                    <div className="flex justify-end">
                      <span className="text-primary font-medium text-sm cursor-pointer hover:underline">
                        {project.link}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
