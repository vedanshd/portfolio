import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VoiceNavigationDialog } from "./VoiceNavigationDialog";

// Define SpeechRecognition types
interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface VoiceNavigationProps {
  sections: string[];
  onNavigate: (section: string) => void;
}

export function VoiceNavigation({ sections, onNavigate }: VoiceNavigationProps) {
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);
  const { toast } = useToast();

  // Initialize speech recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error("Speech recognition not supported in this browser");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      processVoiceCommand(transcript);
    };
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      
      toast({
        title: "Voice Recognition Error",
        description: `Error: ${event.error}. Please try again.`,
        variant: "destructive",
      });
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    setSpeechRecognition(recognition);
    
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [toast]);

  // Process voice commands
  const processVoiceCommand = useCallback((transcript: string) => {
    console.log("Voice command:", transcript);
    
    // Check if the command contains any of the section names
    const matchedSection = sections.find(section => 
      transcript.includes(section.toLowerCase())
    );
    
    if (matchedSection) {
      toast({
        title: "Voice Command Recognized",
        description: `Navigating to ${matchedSection}`,
      });
      onNavigate(matchedSection);
      return;
    }
    
    // Check for home navigation
    if (transcript.includes('home')) {
      toast({
        title: "Voice Command Recognized",
        description: "Navigating to Home",
      });
      window.location.href = '/';
      return;
    }
    
    // Check for typing demo navigation
    if (transcript.includes('typing') || transcript.includes('demo')) {
      toast({
        title: "Voice Command Recognized",
        description: "Navigating to Typing Demo",
      });
      window.location.href = '/typing-demo';
      return;
    }
    
    // No valid command found
    toast({
      title: "Voice Command Not Recognized",
      description: "Please try again with a valid section name",
      variant: "destructive",
    });
  }, [sections, onNavigate, toast]);

  // Toggle listening state
  const toggleListening = useCallback(() => {
    if (!speechRecognition) return;
    
    if (isListening) {
      speechRecognition.abort();
      setIsListening(false);
    } else {
      setIsListening(true);
      try {
        speechRecognition.start();
        toast({
          title: "Voice Navigation Activated",
          description: "Say a section name to navigate (e.g., 'About', 'Projects')",
        });
      } catch (error) {
        console.error('Speech recognition error:', error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Could not start voice recognition. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, [isListening, speechRecognition, toast]);

  return (
    <>
      <Button
        onClick={toggleListening}
        variant="outline"
        size="icon"
        className={`rounded-full p-2 transition-all duration-200 ${
          isListening 
            ? 'bg-primary text-primary-foreground animate-pulse' 
            : 'bg-background text-foreground'
        }`}
        title="Voice Navigation"
        aria-label="Toggle voice navigation"
      >
        {isListening ? (
          <Mic className="h-5 w-5" />
        ) : (
          <MicOff className="h-5 w-5" />
        )}
      </Button>
      
      {/* Voice Navigation Dialog */}
      <VoiceNavigationDialog
        isActive={isListening}
        availableCommands={sections}
      />
    </>
  );
}

// Add TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: {
      new(): SpeechRecognition;
      prototype: SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new(): SpeechRecognition;
      prototype: SpeechRecognition;
    };
  }
}