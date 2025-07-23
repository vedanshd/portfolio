import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Certifications() {
  const certifications = [
    {
      name: "AWS Educate: Introduction to Cloud 101",
      issuer: "Amazon Web Services (AWS)",
      category: "Cloud Computing"
    },
    {
      name: "Data Fundamentals",
      issuer: "IBM-SkillsBuild",
      category: "Data Science"
    },
    {
      name: "Microsoft Azure AI Essentials Professional Certificate",
      issuer: "Microsoft and LinkedIn",
      category: "AI & Machine Learning"
    },
    {
      name: "J.P. Morgan - Quantitative Research Job Simulation",
      issuer: "Forage",
      category: "Finance & Analytics"
    },
    {
      name: "Prompt Engineering & Programming with OpenAI",
      issuer: "Columbia+",
      category: "AI & Machine Learning"
    },
    {
      name: "Foundational C# with Microsoft",
      issuer: "freeCodeCamp",
      category: "Programming"
    },
    {
      name: "Introduction to MongoDB",
      issuer: "MongoDB",
      category: "Database"
    }
  ];

  const groupedCertifications = certifications.reduce((acc, cert) => {
    if (!acc[cert.category]) {
      acc[cert.category] = [];
    }
    acc[cert.category].push(cert);
    return acc;
  }, {} as Record<string, typeof certifications>);

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
    <section id="certifications" className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Certifications
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {Object.entries(groupedCertifications).map(([category, certs]) => (
            <motion.div key={category} variants={cardVariants}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-primary">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {certs.map((cert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-l-2 border-primary/30 pl-4 py-2"
                      >
                        <h4 className="font-semibold text-sm">{cert.name}</h4>
                        <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                      </motion.div>
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
