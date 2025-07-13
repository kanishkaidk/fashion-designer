import React from 'react';
import { Users, Zap, Palette, Code } from 'lucide-react';

interface AboutSectionProps {
  darkMode: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ darkMode }) => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Generation",
      description: "Advanced algorithms understand your style preferences and create unique designs just for you."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Endless Customization",
      description: "Mix and match fabrics, colors, styles, and moods to create your perfect fashion moment."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Export & Download",
      description: "Save your creations and export them to design tools like Figma for further customization."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Built by fashion enthusiasts for fashion enthusiasts, with love and attention to detail."
    }
  ];

  const techStack = [
    "React & TypeScript",
    "Tailwind CSS",
    "DALL·E Integration",
    "Advanced AI Models",
    "Figma API",
    "Modern Web APIs"
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`font-space-grotesk font-bold text-3xl md:text-4xl mb-6 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            About FashNova AI
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We're reimagining fashion design through the power of artificial intelligence. 
            Create, customize, and export stunning fashion designs in seconds, not hours.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${
                darkMode ? 'glassmorphism-dark' : 'glassmorphism'
              } rounded-2xl p-6 text-center hover-scale group`}
            >
              <div className={`${
                darkMode ? 'text-pink-400' : 'text-pink-600'
              } mb-4 flex justify-center group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className={`font-bold text-lg mb-3 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team & Project Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className={`${
            darkMode ? 'glassmorphism-dark' : 'glassmorphism'
          } rounded-3xl p-8`}>
            <h3 className={`font-bold text-2xl mb-6 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Meet the Team 👋
            </h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-2xl ${
                darkMode ? 'bg-purple-900/30' : 'bg-pink-50'
              }`}>
                <h4 className={`font-semibold mb-2 ${
                  darkMode ? 'text-pink-300' : 'text-pink-600'
                }`}>
                  Group-101 Creative Team
                </h4>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <strong>Kanishka, Bhumika & Aviral</strong> - Three passionate developers 
                  and fashion enthusiasts bringing AI-powered creativity to life.
                </p>
              </div>
              <div className={`p-4 rounded-2xl ${
                darkMode ? 'bg-purple-900/30' : 'bg-pink-50'
              }`}>
                <h4 className={`font-semibold mb-2 ${
                  darkMode ? 'text-pink-300' : 'text-pink-600'
                }`}>
                  IGDTUW Internship Program
                </h4>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Domain: <strong>Generative AI</strong> - Exploring the intersection 
                  of artificial intelligence and creative design.
                </p>
              </div>
            </div>
          </div>

          <div className={`${
            darkMode ? 'glassmorphism-dark' : 'glassmorphism'
          } rounded-3xl p-8`}>
            <h3 className={`font-bold text-2xl mb-6 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Tech Stack ⚡
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className={`tag-pill text-center ${
                    darkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  }`}
                >
                  {tech}
                </div>
              ))}
            </div>
            <div className={`mt-6 p-4 rounded-2xl ${
              darkMode ? 'bg-purple-900/30' : 'bg-pink-50'
            }`}>
              <p className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Built with modern web technologies and powered by cutting-edge AI models 
                to deliver the best fashion design experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};