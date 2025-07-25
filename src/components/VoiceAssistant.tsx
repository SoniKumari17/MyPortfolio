import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';

interface VoiceAssistantProps {
  onGreetingComplete?: () => void;
}

export const VoiceAssistant = ({ onGreetingComplete }: VoiceAssistantProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const messageQueueRef = useRef<string[]>([]);
  const isSpeakingRef = useRef(false);
  
  // Voice commands hook
  const { isListening, toggleListening, isSupported: voiceCommandsSupported } = useVoiceCommands();

  const speak = useCallback((text: string, priority: boolean = false) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    // If priority message, clear queue and stop current speech
    if (priority) {
      messageQueueRef.current = [];
      if (currentUtteranceRef.current) {
        speechSynthesis.cancel();
        isSpeakingRef.current = false;
      }
    }

    // Add to queue
    messageQueueRef.current.push(text);
    
    // Process queue if not already speaking
    if (!isSpeakingRef.current) {
      processQueue();
    }
  }, [isMuted]);

  const processQueue = useCallback(() => {
    if (messageQueueRef.current.length === 0 || isMuted) {
      isSpeakingRef.current = false;
      return;
    }

    const text = messageQueueRef.current.shift()!;
    isSpeakingRef.current = true;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;

    // Try to use a female voice
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('samantha')
    ) || voices.find(voice => voice.lang.startsWith('en'));
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onend = () => {
      isSpeakingRef.current = false;
      currentUtteranceRef.current = null;
      // Process next message in queue
      setTimeout(processQueue, 500);
    };

    utterance.onerror = () => {
      isSpeakingRef.current = false;
      currentUtteranceRef.current = null;
      setTimeout(processQueue, 500);
    };

    currentUtteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, [isMuted]);

  const getTimeBasedGreeting = useCallback(() => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return "Good Morning!";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon!";
    } else if (hour >= 17 && hour < 22) {
      return "Good Evening!";
    } else {
      return "Hello!";
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (currentUtteranceRef.current) {
      speechSynthesis.cancel();
      currentUtteranceRef.current = null;
      isSpeakingRef.current = false;
      messageQueueRef.current = [];
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (!prev) {
        // Muting - stop current speech
        stopSpeaking();
      }
      return !prev;
    });
  }, [stopSpeaking]);

  // Initial greeting on page load
  useEffect(() => {
    if (!isInitialized && 'speechSynthesis' in window) {
      // Wait for voices to be loaded
      const loadVoices = () => {
        if (speechSynthesis.getVoices().length > 0) {
          setIsInitialized(true);
          
          // Initial greeting after a short delay
          setTimeout(() => {
            const greeting = getTimeBasedGreeting();
            const welcomeMessage = `${greeting} Hi, my name is Soni Kumari and welcome to my portfolio!`;
            speak(welcomeMessage, true);
            onGreetingComplete?.();
          }, 2000);
        } else {
          setTimeout(loadVoices, 100);
        }
      };

      // Some browsers need this event
      speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, [isInitialized, speak, getTimeBasedGreeting, onGreetingComplete]);

  // Expose speak function globally for other components
  useEffect(() => {
    (window as any).voiceAssistant = {
      speak,
      isMuted: () => isMuted
    };

    return () => {
      delete (window as any).voiceAssistant;
    };
  }, [speak, isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [stopSpeaking]);

  if (!('speechSynthesis' in window)) {
    return null; // Voice not supported
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {/* Voice Commands Button */}
      {voiceCommandsSupported && (
        <Button
          onClick={toggleListening}
          variant={isListening ? "default" : "outline"}
          size="icon"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          title={isListening ? "Stop Listening" : "Ask Me Anything"}
        >
          {isListening ? (
            <Mic className="h-4 w-4 animate-pulse" />
          ) : (
            <MicOff className="h-4 w-4" />
          )}
        </Button>
      )}
      
      {/* Mute/Unmute Button */}
      <Button
        onClick={toggleMute}
        variant={isMuted ? "outline" : "default"}
        size="icon"
        className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        title={isMuted ? "Unmute Voice Assistant" : "Mute Voice Assistant"}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};