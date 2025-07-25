import { AnimatedNavbar } from '@/components/AnimatedNavbar';
import { HeroSection } from '@/components/HeroSection';
import { EducationSection } from '@/components/EducationSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { AchievementsSection } from '@/components/AchievementsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import { useVoiceNarration } from '@/hooks/useVoiceNarration';

const Index = () => {
  // Initialize voice narration
  useVoiceNarration();

  return (
    <div className="min-h-screen bg-background text-foreground font-robot">
      {/* Voice Assistant */}
      <VoiceAssistant />
      
      {/* Fixed Navbar */}
      <AnimatedNavbar isVisible={true} />
      
      {/* Main Content with padding to account for fixed navbar */}
      <main className="relative pt-20">
        <HeroSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
