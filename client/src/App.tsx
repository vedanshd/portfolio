
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import TypingDemo from "@/pages/TypingDemo";
// import { Chatbot } from "@/components/chatbot/Chatbot"; // Disabled for GitHub Pages
import { ThemeToggle } from "@/components/layout/ThemeToggle";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/typing-demo" component={TypingDemo} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ThemeToggle />
      {/* <Chatbot /> Disabled for GitHub Pages */}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
