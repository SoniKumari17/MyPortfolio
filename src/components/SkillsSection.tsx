import { useState, useEffect, useRef } from 'react';
import { useVoiceHover } from '@/hooks/useVoiceHover';

const skillsData = [
  {
    title: 'Frontend',
    skills: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'React'],
    description: 'User Interface Development'
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Java', 'SQL'],
    description: 'Server-Side Development'
  },
  {
    title: 'Tools',
    skills: ['Git/GitHub', 'Postman', 'Figma', 'VS Code'],
    description: 'Development Tools'
  },
  {
    title: 'Vibe Coding',
    skills: ['Lo-fi Music', 'Clean Code', 'Best Practices', 'Problem Solving'],
    description: 'Personal Coding Style'
  },
  {
    title: 'DSA',
    skills: ['Data Structures', 'Problem Solving', 'LeetCode','geeksforgeeks'],
    description: 'Data Structures & Algorithms',
    leetcode: 'https://leetcode.com/u/SoniKumari2004/',
    gfg: 'https://www.geeksforgeeks.org/user/sonikumaj4gg/'
  },
  {
    title: 'OOPs',
    skills: ['Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism'],
    description: 'Object-Oriented Programming'
  },
  {
    title: 'CS Fundamentals',
    skills: ['Operating Systems', 'Computer Networks', 'DBMS', 'System Design'],
    description: 'Core Computer Science'
  }
];

export const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { handleSkillHover } = useVoiceHover();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20 relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-foreground mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-muted-foreground font-robot">
            Explore my expertise through this 3D skill carousel
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative flex justify-center items-center" style={{ height: '500px' }}>
          <div 
            className={`relative group ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{
              width: '800px',
              height: '400px',
              transformStyle: 'preserve-3d',
              perspective: '1200px'
            }}
          >
            {/* Carousel Wrapper */}
            <div 
              className="absolute inset-0 animate-carousel-rotate group-hover:[animation-play-state:paused]"
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
              {skillsData.map((skill, index) => {
                const rotateY = (360 / skillsData.length) * index;
                const translateZ = 300; // Distance from center
                
                return (
                  <div
                    key={skill.title}
                    className="absolute bg-background/90 backdrop-blur-lg border-2 border-accent/50 rounded-2xl p-8 shadow-2xl"
                    style={{
                      width: '350px',
                      height: '300px',
                      left: '50%',
                      top: '50%',
                      marginLeft: '-175px',
                      marginTop: '-150px',
                      transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                      transformStyle: 'preserve-3d',
                      boxShadow: '0 0 40px rgba(183, 28, 28, 0.3), inset 0 0 20px rgba(183, 28, 28, 0.1)'
                    }}
                  >
                    {/* Sparkle effects */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-accent/70 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-accent/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                    
                    {/* Glow border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 rounded-2xl blur-sm animate-pulse"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      <h3 className="text-2xl font-cyber font-bold text-accent mb-2 text-center tracking-wide">
                        {skill.title}
                      </h3>
                      <p className="text-sm text-muted-foreground/80 text-center mb-6 font-robot">
                        {skill.description}
                      </p>
                      
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        {skill.skills.map((item, skillIndex) => {
                          if (skill.title === 'DSA' && item === 'LeetCode' && skill.leetcode) {
                            return (
                              <a
                                key={item}
                                href={skill.leetcode}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-skill
                                className="bg-background/60 hover:bg-yellow-200 border border-accent/30 hover:border-yellow-500 rounded-lg px-3 py-2 text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,193,7,0.4)] hover:scale-105 group/skill cursor-pointer"
                                onMouseEnter={() => handleSkillHover({
                                  name: item,
                                  category: skill.title
                                })}
                              >
                                <span className="text-sm font-robot font-medium text-foreground hover:text-yellow-700 transition-colors duration-300">
                                  {item}
                                </span>
                              </a>
                            );
                          }
                          if (skill.title === 'DSA' && item === 'geeksforgeeks' && skill.gfg) {
                            return (
                              <a
                                key={item}
                                href={skill.gfg}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-skill
                                className="bg-background/60 hover:bg-green-200 border border-accent/30 hover:border-green-500 rounded-lg px-3 py-2 text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(67,160,71,0.4)] hover:scale-105 group/skill cursor-pointer"
                                onMouseEnter={() => handleSkillHover({
                                  name: item,
                                  category: skill.title
                                })}
                              >
                                <span className="text-sm font-robot font-medium text-foreground hover:text-green-700 transition-colors duration-300">
                                  {item}
                                </span>
                              </a>
                            );
                          }
                          return (
                            <div
                              key={item}
                              data-skill
                              className="bg-background/60 hover:bg-accent/20 border border-accent/30 hover:border-accent/60 rounded-lg px-3 py-2 text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(183,28,28,0.4)] hover:scale-105 group/skill"
                              onMouseEnter={() => handleSkillHover({
                                name: item,
                                category: skill.title
                              })}
                            >
                              <span className="text-sm font-robot font-medium text-foreground hover:text-accent transition-colors duration-300">
                                {item}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Center glow effect */}
            <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="text-center mt-8">
         <p className="text-sm text-muted-foreground/60 font-robot">
           Hover to pause • Watch the skills rotate in 3D space • You can also click on leetcode & geeksforgeeks option to visit my coding platform profile
        </p>

        </div>
      </div>
    </section>
  );
};