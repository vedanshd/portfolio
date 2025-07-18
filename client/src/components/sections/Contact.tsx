import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { FaLinkedin } from "react-icons/fa";

export function Contact() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = form.handleSubmit((data) => {
    // For GitHub Pages, we'll just show a message since there's no backend
    toast({
      title: "Contact Form Submitted!",
      description: "Please reach out to me via LinkedIn for now. Backend functionality will be available in the full deployment.",
    });
    form.reset();
  });

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Send me a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Name"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Textarea
                    placeholder="Message"
                    {...form.register("message")}
                  />
                  {form.formState.errors.message && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
              <div className="mt-6 flex justify-center">
                <Button variant="outline" asChild>
                  <a
                    href="https://www.linkedin.com/in/vedansh-dhawan-50a860323/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <FaLinkedin className="h-5 w-5" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
