import React, { useState } from 'react';
import { Palette, Shirt, Wand2 } from 'lucide-react';

interface PromptInputSectionProps {
  onGenerate: (formData: any) => void;
  loading: boolean;
  darkMode: boolean;
}

export const PromptInputSection: React.FC<PromptInputSectionProps> = ({ 
  onGenerate, 
  loading, 
  darkMode 
}) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [fabric, setFabric] = useState('');
  const [colorTheme, setColorTheme] = useState('');
  const [mainColor, setMainColor] = useState('#ec4899');
  const [modelSize, setModelSize] = useState('');
  const [length, setLength] = useState('');
  const [mood, setMood] = useState('');
  const [season, setSeason] = useState('');
  const [accessory, setAccessory] = useState('');

  const styleOptions = ['Dress', 'Suit', 'Streetwear', 'Evening Gown', 'Activewear', 'Kurti', 'Saree', 'Jacket', 'Blazer', 'Skirt', 'Tunic'];
  const fabricOptions = ['Silk', 'Cotton', 'Denim', 'Linen', 'Wool', 'Chiffon', 'Georgette', 'Velvet', 'Rayon', 'Polyester'];
  const colorThemes = ['Pastel', 'Neon', 'Earthy', 'Monochrome', 'Metallic', 'Classic', 'Bold'];
  const modelSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const lengths = ['Mini', 'Knee-length', 'Midi', 'Ankle-length', 'Floor-length'];
  const moods = ['Romantic', 'Edgy', 'Minimalist', 'Bohemian', 'Classic', 'Sporty', 'Futuristic', 'Vintage'];
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter', 'All Season'];
  const accessories = ['Belt', 'Scarf', 'Hat', 'Jewelry', 'Bag', 'Shoes', 'Sunglasses'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    onGenerate({
      prompt,
      style,
      fabric,
      colorTheme,
      mainColor,
      modelSize,
      length,
      mood,
      season,
      accessory
    });
  };

  return (
    <section id="create" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Palette className={`w-8 h-8 ${darkMode ? 'text-pink-400' : 'text-pink-600'} animate-pulse`} />
          </div>
          <h2 className={`font-title font-bold text-3xl md:text-4xl mb-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          } tracking-wide`}>
            Describe Your Dream Design
          </h2>
          <p className={`font-main text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Cast your fashion spell and watch AI bring your vision to life
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`${darkMode ? 'glassmorphism-dark' : 'glassmorphism'} 
                     rounded-3xl p-8 backdrop-blur-lg shadow-2xl border-2 
                     ${darkMode ? 'border-pink-500/20' : 'border-pink-200/50'}`}
        >
          <div className="mb-6">
            <label className={`font-main block text-sm font-semibold mb-3 ${
              darkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Describe your magical fashion idea
            </label>
            <textarea
              placeholder="A flowy summer dress with ethereal floral patterns that dance in the moonlight..."
              className="magic-input w-full p-4 rounded-2xl border-0 text-gray-800 placeholder-gray-500 resize-none h-24"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div>
              <label className={`font-main block text-sm font-semibold mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                <Shirt className="inline w-4 h-4 mr-1" />
                Style
              </label>
              <select 
                className="magic-input w-full p-3 rounded-xl border-0 text-gray-800"
                value={style} 
                onChange={(e) => setStyle(e.target.value)} 
                required
              >
                <option value="">Choose your vibe...</option>
                {styleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className={`font-main block text-sm font-semibold mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                🧵 Fabric
              </label>
              <select 
                className="magic-input w-full p-3 rounded-xl border-0 text-gray-800"
                value={fabric} 
                onChange={(e) => setFabric(e.target.value)} 
                required
              >
                <option value="">Select material...</option>
                {fabricOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className={`font-main block text-sm font-semibold mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                🎨 Color Theme
              </label>
              <select 
                className="magic-input w-full p-3 rounded-xl border-0 text-gray-800"
                value={colorTheme} 
                onChange={(e) => setColorTheme(e.target.value)} 
                required
              >
                <option value="">Pick your palette...</option>
                {colorThemes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className={`font-main block text-sm font-semibold mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Main Color
              </label>
              <div className="flex items-center space-x-3">
                <input 
                  type="color" 
                  value={mainColor} 
                  onChange={(e) => setMainColor(e.target.value)} 
                  className="w-12 h-12 rounded-full border-4 border-white shadow-lg cursor-pointer"
                />
                <span className={`font-main text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {mainColor}
                </span>
              </div>
            </div>

            <div>
              <label className={`font-main block text-sm font-semibold mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                📏 Size
              </label>
              <select 
                className="magic-input w-full p-3 rounded-xl border-0 text-gray-800"
                value={modelSize} 
                onChange={(e) => setModelSize(e.target.value)} 
                required
              >
                <option value="">Choose size...</option>
                {modelSizes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className={`font-main block text-sm font-semibold mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                📐 Length
              </label>
              <select 
                className="magic-input w-full p-3 rounded-xl border-0 text-gray-800"
                value={length} 
                onChange={(e) => setLength(e.target.value)} 
                required
              >
                <option value="">Select length...</option>
                {lengths.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className={`font-main block text-sm font-semibold mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                💫 Mood
              </label>
              <select 
                className="magic-input w-full p-3 rounded-xl border-0 text-gray-800"
                value={mood} 
                onChange={(e) => setMood(e.target.value)} 
                required
              >
                <option value="">What's the vibe?</option>
                {moods.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className={`font-main block text-sm font-semibold mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                🌸 Season
              </label>
              <select 
                className="magic-input w-full p-3 rounded-xl border-0 text-gray-800"
                value={season} 
                onChange={(e) => setSeason(e.target.value)} 
                required
              >
                <option value="">When to wear?</option>
                {seasons.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className={`font-main block text-sm font-semibold mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                💎 Accessory
              </label>
              <select 
                className="magic-input w-full p-3 rounded-xl border-0 text-gray-800"
                value={accessory} 
                onChange={(e) => setAccessory(e.target.value)}
              >
                <option value="">Add some sparkle...</option>
                {accessories.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="neon-button px-12 py-4 rounded-full text-lg font-bold ripple hover-scale group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                  Weaving magic...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 group-hover:animate-spin" />
                  Generate My Design
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};