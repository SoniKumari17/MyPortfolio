import { useCallback } from 'react';

interface ProjectData {
  title: string;
  description: string;
  tech: string[];
}

interface ExperienceData {
  role: string;
  company: string;
  duration: string;
}

interface AchievementData {
  title: string;
  organization: string;
}

export const useVoiceHover = () => {
  const speak = useCallback((message: string) => {
    if ((window as any).voiceAssistant && !(window as any).voiceAssistant.isMuted()) {
      (window as any).voiceAssistant.speak(message);
    }
  }, []);

  const handleProjectHover = useCallback((project: ProjectData) => {
    const techList = project.tech.join(', ');
    const message = `This is my ${project.title} project. It's built with ${techList}.`;
    speak(message);
  }, [speak]);

  const handleExperienceHover = useCallback((experience: ExperienceData) => {
    const message = `I worked as a ${experience.role} at ${experience.company} for ${experience.duration}.`;
    speak(message);
  }, [speak]);

  const handleAchievementHover = useCallback((achievement: AchievementData) => {
    const message = `I received the ${achievement.title} certificate from ${achievement.organization}.`;
    speak(message);
  }, [speak]);

  const handleEducationHover = useCallback((education: { degree: string; institution: string; year: string }) => {
    const message = `I completed my ${education.degree} from ${education.institution} in ${education.year}.`;
    speak(message);
  }, [speak]);

  const handleSkillHover = useCallback((skill: { name: string; category: string }) => {
    const message = `This is ${skill.name}, one of my ${skill.category} skills.`;
    speak(message);
  }, [speak]);

  return {
    handleProjectHover,
    handleExperienceHover,
    handleAchievementHover,
    handleEducationHover,
    handleSkillHover
  };
};