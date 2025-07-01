
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
// import { Chatbot } from "@/components/chatbot/Chatbot"; // Disabled for GitHub Pages
import { ThemeToggle } from "@/components/layout/ThemeToggle";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <ThemeToggle />
      {/* <Chatbot /> Disabled for GitHub Pages */}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
