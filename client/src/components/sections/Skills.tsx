import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Skills() {
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: ["Python", "Java", "JavaScript", "C++"]
    },
    {
      category: "Web Development",
      skills: ["React.js", "FastAPI", "Full-Stack Development"]
    },
    {
      category: "Cloud & DevOps",
      skills: ["Amazon Web Services (AWS)", "Linux"]
    },
    {
      category: "AI & Machine Learning",
      skills: ["Natural Language Processing (NLP)", "Generative AI", "Azure AI Studio"]
    },
    {
      category: "Databases",
      skills: ["Oracle Database"]
    },
    {
      category: "Other Technologies",
      skills: ["Android Development", "Computer Networking", "Data Structures"]
    },
    {
      category: "Soft Skills",
      skills: ["Communication", "Analytical Skills", "Problem-solving"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Solid background */}
      <div className="absolute inset-0 -z-10 bg-black" />

      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-center text-white"
        >
          Skills
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.category}
              variants={cardVariants}
            >
              <Card className="h-full bg-gradient-to-br from-background via-primary/5 to-background hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-primary">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className="bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}