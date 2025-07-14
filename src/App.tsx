import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PromptInputSection } from './components/PromptInputSection';
import { OutputSection } from './components/OutputSection';
import { FashionTipCarousel } from './components/FashionTipCarousel';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { FloatingChatbot } from './components/FloatingChatbot';
import { ParticleBackground } from './components/ParticleBackground';
import { CursorTrail } from './components/CursorTrail';
import { Gallery } from './components/Gallery';
import { useDarkMode } from './hooks/useDarkMode';
import { useDesignHistory } from './hooks/useDesignHistory';
import './App.css';

export interface FashionDesign {
  id: string;
  imageUrl: string;
  specs: {
    style: string;
    fabric: string;
    colorTheme: string;
    mainColor: string;
    modelSize: string;
    length: string;
    mood: string;
    season: string;
    accessories?: string[] | string;
    upperWear?: string[];
    lowerWear?: string[];
    shoes?: string[];
    headAccessories?: string[];
    hairstyle?: string;
    description: string;
    story: string;
    stylingTip: string;
    quirkyCaption: string;
  };
  isBestPick: boolean;
  timestamp: Date;
}

function App() {
  const [suggestions, setSuggestions] = useState<FashionDesign[]>([]);
  const [loading, setLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { designHistory, addDesign } = useDesignHistory();

  const generateQuirkyCaption = (mood: string, style: string) => {
    const captions = {
      'Romantic': [
        "For when you want to be poetry in motion 💕",
        "Main character in a rom-com energy ✨",
        "Soft girl aesthetic but make it fashion 🌸"
      ],
      'Edgy': [
        "For days when you're the villain in someone else's story 🖤",
        "Dark academia meets street style queen 💀",
        "When you need to serve looks and attitude 🔥"
      ],
      'Minimalist': [
        "Less is more, but make it iconic ✨",
        "Clean girl aesthetic with main character energy 🤍",
        "Effortlessly chic because you're that girl 💫"
      ],
      'Bohemian': [
        "Free spirit with expensive taste 🌙",
        "Coachella vibes but make it everyday ✨",
        "Wanderlust meets wardrobe goals 🦋"
      ],
      'Classic': [
        "Timeless elegance never goes out of style 👑",
        "Old money aesthetic on any budget 💎",
        "Grace Kelly would approve ✨"
      ],
      'Sporty': [
        "Athleisure but make it fashion week 💪",
        "Gym to brunch to world domination 🏃‍♀️",
        "Active lifestyle, iconic style ⚡"
      ],
      'Futuristic': [
        "Y2K princess meets space age queen 🚀",
        "Living in 3023 while everyone's in 2024 ✨",
        "Cyberpunk chic with a touch of magic 🌟"
      ],
      'Vintage': [
        "Old soul with impeccable taste 📸",
        "Thrifted treasures and vintage dreams ✨",
        "Bringing back the golden age of fashion 💫"
      ]
    };
    
    const moodCaptions = captions[mood] || ["Serving looks and living dreams ✨"];
    return moodCaptions[Math.floor(Math.random() * moodCaptions.length)];
  };

  const generateStylingTip = (style: string, fabric: string, season: string) => {
    const tips = [
      `Perfect for ${season.toLowerCase()} - layer with a denim jacket for casual vibes`,
      `The ${fabric.toLowerCase()} fabric makes this perfect for both day and night looks`,
      `Pair with minimalist jewelry to let the ${style.toLowerCase()} speak for itself`,
      `Add a belt to accentuate your silhouette and elevate the look`,
      `Mix textures by adding a structured blazer for office-to-dinner versatility`,
      `Complete the look with statement accessories in complementary colors`,
      `Layer with a turtleneck underneath for a chic transitional season look`,
      `The perfect canvas for experimenting with bold makeup looks`
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3001'
    : 'https://fashion-designer.onrender.com';


  const handleGenerateDesign = async (formData: any) => {
    setLoading(true);
    try {
      // Generate 3 designs by calling the API 3 times
      const designPromises = Array(3).fill(null).map(async (_, index) => {
        const res = await fetch(`${BASE_URL}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: formData.prompt,
            style: formData.style,
            fabric: formData.fabric,
            colorTheme: formData.colorTheme,
            mainColor: formData.mainColor,
            modelSize: formData.modelSize,
            length: formData.length,
            mood: formData.mood,
            season: formData.season,
            accessories: formData.accessories,
            targetAudience: formData.targetAudience,
            occasion: formData.occasion,
            graphicPrint: formData.graphicPrint,
            pattern: formData.pattern,
            outfitComponents: formData.outfitComponents
          }),
        });
        
        if (!res.ok) {
          throw new Error('Failed to generate design');
        }
        
        const data = await res.json();
        
        if (data.suggestions && data.suggestions.length > 0) {
          const suggestion = data.suggestions[0];
          return {
            id: `design-${Date.now()}-${index}`,
            imageUrl: suggestion.imageUrl,
            specs: {
              ...suggestion.specs,
              accessories: formData.accessories,
              upperWear: formData.upperWear,
              lowerWear: formData.lowerWear,
              shoes: formData.shoes,
              headAccessories: formData.headAccessories,
              hairstyle: formData.hairstyle,
              stylingTip: generateStylingTip(formData.style, formData.fabric, formData.season),
              quirkyCaption: generateQuirkyCaption(formData.mood, formData.style)
            },
            isBestPick: index === 0, // First design is the best pick
            timestamp: new Date()
          };
        }
        return null;
      });

      const designs = await Promise.all(designPromises);
      const validDesigns = designs.filter(design => design !== null) as FashionDesign[];
      
      setSuggestions(validDesigns);
      validDesigns.forEach(design => addDesign(design));
    } catch (error) {
      console.error('Error generating designs:', error);
      alert('Failed to generate designs. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900' 
        : 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50'
    }`}>
      <ParticleBackground darkMode={darkMode} />
      <CursorTrail darkMode={darkMode} />
      
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="relative z-10">
        <HeroSection darkMode={darkMode} />
        <PromptInputSection 
          onGenerate={handleGenerateDesign} 
          loading={loading} 
          darkMode={darkMode} 
        />
        {suggestions.length > 0 && (
          <OutputSection 
            designs={suggestions} 
            darkMode={darkMode}
            onShowHistory={() => setShowGallery(true)}
          />
        )}
        <FashionTipCarousel darkMode={darkMode} />
        <AboutSection darkMode={darkMode} />
      </main>
      
      <Footer darkMode={darkMode} />
      <FloatingChatbot darkMode={darkMode} />
      
      {showGallery && (
        <Gallery
          designs={designHistory}
          onClose={() => setShowGallery(false)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default App;