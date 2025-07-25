import { useCallback, useEffect, useRef, useState } from 'react';

interface VoiceCommandsHook {
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  toggleListening: () => void;
  isSupported: boolean;
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const useVoiceCommands = (): VoiceCommandsHook => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any | null>(null);

  const speak = useCallback((message: string, priority: boolean = false) => {
    if ((window as any).voiceAssistant && !(window as any).voiceAssistant.isMuted()) {
      (window as any).voiceAssistant.speak(message, priority);
    }
  }, []);

  // Fallback data fetcher
  const fetchFallbackData = useCallback(async () => {
    try {
      const response = await fetch('/data.json');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch fallback data:', error);
      return null;
    }
  }, []);

  // Extract content from DOM sections
  const extractSectionContent = useCallback((sectionId: string): string => {
    const section = document.getElementById(sectionId);
    if (!section) return '';
    
    // Remove script tags, style tags, and other non-content elements
    const clone = section.cloneNode(true) as HTMLElement;
    const scripts = clone.querySelectorAll('script, style, nav, button');
    scripts.forEach(el => el.remove());
    
    return clone.textContent?.trim() || '';
  }, []);

  const extractEducationInfo = useCallback(async (): Promise<string> => {
    const educationSection = document.getElementById('education');
    
    if (educationSection) {
      const educationCards = educationSection.querySelectorAll('[data-education-card]');
      const educationInfo: string[] = [];
      
      educationCards.forEach(card => {
        const degree = card.querySelector('h3')?.textContent?.trim();
        const institution = card.querySelector('p:first-of-type')?.textContent?.trim();
        const year = card.querySelector('p:last-of-type')?.textContent?.trim();
        
        if (degree && institution) {
          educationInfo.push(`${degree} from ${institution}${year ? ` in ${year}` : ''}`);
        }
      });
      
      if (educationInfo.length > 0) {
        return `Here's my education background: ${educationInfo.join(', ')}.`;
      }
    }
    
    // Fallback to data.json
    const fallbackData = await fetchFallbackData();
    return fallbackData?.education || "I completed my education as shown in the education section.";
  }, [fetchFallbackData]);

  const extractSkillsInfo = useCallback(async (): Promise<string> => {
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
      const skillElements = skillsSection.querySelectorAll('[data-skill]');
      const skills: string[] = [];
      
      skillElements.forEach(skill => {
        const skillName = skill.textContent?.trim();
        if (skillName) {
          skills.push(skillName);
        }
      });
      
      if (skills.length > 0) {
        return `My skills include ${skills.join(', ')}.`;
      }
    }
    
    // Fallback to data.json
    const fallbackData = await fetchFallbackData();
    return fallbackData?.skills || "You can see all my skills in the skills section.";
  }, [fetchFallbackData]);

  const extractCertificationsInfo = useCallback(async (): Promise<string> => {
    const achievementsSection = document.getElementById('achievements');
    
    if (achievementsSection) {
      const certCards = achievementsSection.querySelectorAll('[data-achievement-card]');
      const certifications: string[] = [];
      
      certCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent?.trim();
        const organization = card.querySelector('p')?.textContent?.trim();
        
        if (title) {
          certifications.push(title + (organization ? ` from ${organization}` : ''));
        }
      });
      
      if (certifications.length > 0) {
        return `My certifications include: ${certifications.join(', ')}.`;
      }
    }
    
    // Fallback to data.json
    const fallbackData = await fetchFallbackData();
    return fallbackData?.certifications || "You can see all my certifications in the achievements section.";
  }, [fetchFallbackData]);

  const extractAboutInfo = useCallback(async (): Promise<string> => {
    const heroSection = document.getElementById('home');
    
    if (heroSection) {
      const nameElement = heroSection.querySelector('h1');
      const titleElement = heroSection.querySelector('[data-title]') || heroSection.querySelector('h2');
      const descriptionElement = heroSection.querySelector('[data-description]') || heroSection.querySelector('p');
      
      const name = nameElement?.textContent?.trim();
      const title = titleElement?.textContent?.trim();
      const description = descriptionElement?.textContent?.trim();
      
      if (name) {
        let intro = `I'm ${name}`;
        if (title) intro += `, a ${title}`;
        if (description) intro += `. ${description}`;
        return intro;
      }
    }
    
    // Fallback to data.json
    const fallbackData = await fetchFallbackData();
    return fallbackData?.intro || "Hi, I'm Soni Kumari. Welcome to my portfolio!";
  }, [fetchFallbackData]);

  // Improved: Speak only the most relevant content for each section
  const scrollToSection = useCallback(async (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      let spoken = false;
      // Custom extraction for each section
      if (sectionId === 'contact') {
        // Try to get main contact info (email, social, etc.)
        const email = section.querySelector('a[href^="mailto:"]')?.textContent;
        const socials = Array.from(section.querySelectorAll('a[href^="http"], a[href^="https"]'))
          .map(a => a.textContent?.trim()).filter(Boolean);
        let contactMsg = '';
        if (email) contactMsg += `You can email me at ${email}. `;
        if (socials.length > 0) contactMsg += `Connect with me on: ${socials.join(', ')}.`;
        if (contactMsg) {
          speak(contactMsg, true);
          spoken = true;
        }
      } else if (sectionId === 'skills') {
        // Speak only the list of skills
        const skillEls = section.querySelectorAll('[data-skill]');
        const skills = Array.from(skillEls).map(el => el.textContent?.trim()).filter(Boolean);
        if (skills.length > 0) {
          speak(`My skills are: ${skills.join(', ')}.`, true);
          spoken = true;
        }
      } else if (sectionId === 'projects') {
        // Speak only project titles and short descriptions
        const projectTitles = Array.from(section.querySelectorAll('h2, h3, .project-title'))
          .map(el => el.textContent?.trim()).filter(Boolean);
        if (projectTitles.length > 0) {
          speak(`Here are some of my projects: ${projectTitles.join(', ')}.`, true);
          spoken = true;
        }
      }
      // Add more custom logic for other sections if needed
      if (!spoken) {
        // Fallback to generic extraction
        const content = extractSectionContent(sectionId);
        if (content && content.length > 20) {
          speak(content, true);
        } else {
          const fallbackData = await fetchFallbackData();
          if (fallbackData && fallbackData[sectionId]) {
            speak(fallbackData[sectionId], true);
          } else {
            speak(`I couldn't find any information for the ${sectionId} section.`, true);
          }
        }
      }
    } else {
      // Fallback to data.json
      const fallbackData = await fetchFallbackData();
      if (fallbackData && fallbackData[sectionId]) {
        speak(fallbackData[sectionId], true);
      } else {
        speak(`I couldn't find the ${sectionId} section.`, true);
      }
    }
  }, [speak, extractSectionContent, fetchFallbackData]);

  const processVoiceCommand = useCallback(async (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // About/Who questions
    if (lowerCommand.includes('who is soni') || lowerCommand.includes('about soni') || lowerCommand.includes('tell me about')) {
      const aboutInfo = await extractAboutInfo();
      speak(aboutInfo, true);
    }
    
    // Education questions
    else if (lowerCommand.includes('education') || lowerCommand.includes('graduate') || lowerCommand.includes('study') || lowerCommand.includes('degree')) {
      const educationInfo = await extractEducationInfo();
      speak(educationInfo, true);
    }
    
    // Skills questions
    else if (lowerCommand.includes('skills') || lowerCommand.includes('technologies') || lowerCommand.includes('programming')) {
      // For skills, scroll and speak only the section content
      await scrollToSection('skills');
    }
    
    // Certifications questions
    else if (lowerCommand.includes('certification') || lowerCommand.includes('achievement') || lowerCommand.includes('certificate')) {
      // For achievements, scroll and speak only the section content
      await scrollToSection('achievements');
    }
    
    // Projects questions
    else if (lowerCommand.includes('project') || lowerCommand.includes('work') || lowerCommand.includes('portfolio')) {
      await scrollToSection('projects');
    }
    // Contact questions
    else if (lowerCommand.includes('contact') || lowerCommand.includes('reach') || lowerCommand.includes('get in touch')) {
      await scrollToSection('contact');
    }
    // Experience questions
    else if (lowerCommand.includes('experience') || lowerCommand.includes('job') || lowerCommand.includes('career')) {
      await scrollToSection('experience');
    }
    // Home/top
    else if (lowerCommand.includes('home') || lowerCommand.includes('top') || lowerCommand.includes('beginning')) {
      await scrollToSection('home');
    }
    
    // Default response
    else {
      speak("I didn't understand that command. You can ask me about my education, skills, certifications, or ask me to navigate to different sections.", true);
    }
  }, [speak, extractAboutInfo, extractEducationInfo, extractSkillsInfo, extractCertificationsInfo, scrollToSection]);

  const initializeRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log('Voice command received:', transcript);
      processVoiceCommand(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'not-allowed') {
        speak("Microphone access was denied. Please allow microphone access to use voice commands.", true);
      } else if (event.error === 'no-speech') {
        speak("I didn't hear anything. Please try again.", true);
      }
    };

    recognitionRef.current = recognition;
  }, [processVoiceCommand, speak]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        speak("I'm listening. What would you like to know?", true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  }, [isListening, speak]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  useEffect(() => {
    initializeRecognition();
  }, [initializeRecognition]);

  return {
    isListening,
    startListening,
    stopListening,
    toggleListening,
    isSupported
  };
};