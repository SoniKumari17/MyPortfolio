import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Instagram, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/SoniKumari17', color: 'hover:text-gray-400' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/soni-kumari-0b27b9258/', color: 'hover:text-blue-400' },
  { name: 'Email', icon: Mail, url: 'sonikumaripr16@gmail.com', color: 'hover:text-red-400' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/_soniprajapati_/?hl=en', color: 'hover:text-pink-400' }
];

export const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const { toast } = useToast();

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

  useEffect(() => {
    if (vantaRef.current && (window as any).VANTA) {
      vantaEffect.current = (window as any).VANTA.BIRDS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x0a0a0a,
        color1: 0xb71c1c,
        color2: 0x890707,
        birdSize: 1.5,
        wingSpan: 25.00,
        speedLimit: 5.00,
        separation: 20.00,
        alignment: 20.00,
        cohesion: 20.00
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Web3Forms API integration
    const formPayload = {
      access_key: "df074917-8555-4572-a28d-0cdb9f9034bf",
      name: formData.name,
      email: formData.email,
      message: formData.message
    };
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formPayload)
      });
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out! I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send message. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Vanta.js BIRDS Background */}
      <div ref={vantaRef} className="absolute inset-0" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-foreground mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground font-robot">
            Ready to start your next project? Let's work together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <Card className={`
            bg-card/50 backdrop-blur-lg border-accent/30 shadow-neon
            transition-all duration-700
            ${isVisible ? 'opacity-100 animate-slide-in-right' : 'opacity-0'}
          `}>
            <CardHeader>
              <CardTitle className="text-2xl font-robot font-semibold text-foreground">
                Send me a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-robot">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="bg-input/50 border-accent/30 focus:border-accent text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-robot">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className="bg-input/50 border-accent/30 focus:border-accent text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground font-robot">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or just say hi!"
                    rows={5}
                    required
                    className="bg-input/50 border-accent/30 focus:border-accent text-foreground resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-robot font-semibold shadow-neon hover:shadow-glow transition-all duration-300"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Social Links Wheel */}
          <div className={`
            flex justify-center
            transition-all duration-700 delay-300
            ${isVisible ? 'opacity-100 animate-scale-in' : 'opacity-0'}
          `}>
            <div className="relative w-80 h-80">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-accent/30 animate-rotate-slow">
                <div className="absolute inset-4 rounded-full border-2 border-accent/50">
                  <div className="absolute inset-8 rounded-full border border-accent/70 bg-gradient-neon/10">
                    {/* Center */}
                    <div className="absolute inset-12 rounded-full bg-card/80 backdrop-blur-lg border-2 border-accent flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-8xl mb-2 animate-glow-pulse"></div>
                        <p className="text-sm font-robot font-semibold text-accent">
                          Connect
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                const angle = (index * 90) * (Math.PI / 180); // 90 degrees apart
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={social.name}
                    className={`
                      absolute w-16 h-16 rounded-full bg-accent/20 backdrop-blur-lg 
                      border-2 border-accent flex items-center justify-center
                      transition-all duration-300 hover:scale-110 hover:bg-accent/30 cursor-pointer
                      animate-float
                    `}
                    style={{
                      left: `calc(50% + ${x}px - 2rem)`,
                      top: `calc(50% + ${y}px - 2rem)`,
                      animationDelay: `${index * 0.5}s`
                    }}
                    onClick={() => window.open(social.url, '_blank')}
                  >
                    <Icon className={`w-6 h-6 text-accent transition-colors ${social.color}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};