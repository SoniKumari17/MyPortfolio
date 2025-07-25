import { useEffect, useRef, useCallback } from 'react';

interface SectionInfo {
  id: string;
  message: string;
}

const sections: SectionInfo[] = [
  { id: 'home', message: 'Welcome to the home section.' },
  { id: 'education', message: 'This is the Education section.' },
  { id: 'skills', message: 'Here are my Skills and Technologies.' },
  { id: 'projects', message: 'These are my Projects.' },
  { id: 'experience', message: "Here's my Experience section." },
  { id: 'achievements', message: 'You are now viewing my Achievements and Certifications.' },
  { id: 'contact', message: 'And this is the Contact section.' }
];

export const useVoiceNarration = () => {
  const currentSectionRef = useRef<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasReachedEndRef = useRef(false);
  const narrationPausedRef = useRef(false);

  const speak = useCallback((message: string, priority: boolean = false) => {
    if ((window as any).voiceAssistant && !(window as any).voiceAssistant.isMuted()) {
      (window as any).voiceAssistant.speak(message, priority);
    }
  }, []);

  const setupSectionObserver = useCallback(() => {
    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const options = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.3
    };

    observerRef.current = new IntersectionObserver((entries) => {
      if (narrationPausedRef.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const section = sections.find(s => s.id === sectionId);
          
          if (section && currentSectionRef.current !== sectionId) {
            currentSectionRef.current = sectionId;
            speak(section.message);
          }
        }
      });
    }, options);

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });
  }, [speak]);

  // Function to programmatically navigate and explain a section, then pause narration
  const navigateToSection = useCallback((sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    const element = document.getElementById(sectionId);
    if (element && section) {
      // Scroll to the section
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Speak the section message
      speak(section.message, true);
      // Pause further narration until resumed
      narrationPausedRef.current = true;
      currentSectionRef.current = sectionId;
      // Optionally, disconnect observer to avoid any triggers
      if (observerRef.current) observerRef.current.disconnect();
    }
  }, [speak]);

  // Function to resume narration (re-enable observer)
  const resumeNarration = useCallback(() => {
    narrationPausedRef.current = false;
    setupSectionObserver();
  }, [setupSectionObserver]);

  const setupEndOfPageObserver = useCallback(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasReachedEndRef.current) {
          hasReachedEndRef.current = true;
          speak("Thanks for visiting my portfolio! I hope you enjoyed exploring my work. Have a great day!");
          
          // Reset after a delay so it can trigger again if user scrolls up and down
          setTimeout(() => {
            hasReachedEndRef.current = false;
          }, 10000);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.8
    });

    // Observe the footer
    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

    return observer;
  }, [speak]);

  useEffect(() => {
    // Setup observers after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!narrationPausedRef.current) {
        setupSectionObserver();
      }
      const endObserver = setupEndOfPageObserver();

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
        endObserver.disconnect();
      };
    }, 3000); // Wait for initial greeting to complete

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [setupSectionObserver, setupEndOfPageObserver]);

  return { setupSectionObserver, navigateToSection, resumeNarration };
};