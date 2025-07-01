import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mic } from "lucide-react";

interface VoiceNavigationDialogProps {
  isActive: boolean;
  availableCommands: string[];
}

export function VoiceNavigationDialog({ 
  isActive, 
  availableCommands 
}: VoiceNavigationDialogProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 top-20 z-50 flex justify-center pointer-events-none"
        >
          <div className="bg-black/90 text-white rounded-lg shadow-lg p-4 max-w-md w-full mx-4 border border-primary/30">
            <div className="flex items-center justify-center mb-3">
              <div className="animate-pulse mr-2">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Voice Navigation Active</h3>
            </div>
            
            <p className="text-sm text-center mb-3">
              Speak one of the following commands:
            </p>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              {availableCommands.map((command) => (
                <div
                  key={command}
                  className="bg-background/10 px-2 py-1 rounded text-center"
                >
                  {command}
                </div>
              ))}
              <div className="bg-background/10 px-2 py-1 rounded text-center">
                Home
              </div>
              <div className="bg-background/10 px-2 py-1 rounded text-center">
                Typing Demo
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}