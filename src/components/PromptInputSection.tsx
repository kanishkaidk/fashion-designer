import React, { useState } from 'react';
import { Palette, Wand2 } from 'lucide-react';
import { MultiSelectDropdown } from './MultiSelectDropdown';
import { SingleSelectDropdown } from './SingleSelectDropdown';

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
  const [fabrics, setFabrics] = useState<string[]>([]);
  const [colorTheme, setColorTheme] = useState('');
  const [mainColor, setMainColor] = useState('#ec4899');
  const [modelSize, setModelSize] = useState('');
  const [length, setLength] = useState('');
  const [mood, setMood] = useState('');
  const [season, setSeason] = useState('');
  const [accessories, setAccessories] = useState<string[]>([]);
  const [targetAudience, setTargetAudience] = useState('');
  const [occasion, setOccasion] = useState('');
  const [graphicPrint, setGraphicPrint] = useState('');
  const [pattern, setPattern] = useState('');
  
  // New fields
  const [upperWear, setUpperWear] = useState<string[]>([]);
  const [lowerWear, setLowerWear] = useState<string[]>([]);
  const [shoes, setShoes] = useState<string[]>([]);
  const [headAccessories, setHeadAccessories] = useState<string[]>([]);
  const [hairstyle, setHairstyle] = useState('');

  // Enhanced dropdown options with more variety
  const styleOptions = [
    'Dress', 'Suit', 'Streetwear', 'Evening Gown', 'Activewear', 'Kurti', 'Saree', 'Jacket', 
    'Blazer', 'Skirt', 'Tunic', 'Jumpsuit', 'Romper', 'Palazzo', 'Lehenga', 'Sharara',
    'Crop Top', 'Maxi Dress', 'Midi Dress', 'A-Line Dress', 'Bodycon', 'Wrap Dress',
    'Shirt Dress', 'Cocktail Dress', 'Ball Gown', 'Peplum Top', 'Off-Shoulder',
    'Halter Neck', 'Strapless', 'Long Sleeve', 'Sleeveless', 'Cape Style'
  ];

  const fabricOptions = [
    'Silk', 'Cotton', 'Denim', 'Linen', 'Wool', 'Chiffon', 'Georgette', 'Velvet', 
    'Rayon', 'Polyester', 'Satin', 'Crepe', 'Organza', 'Tulle', 'Lace', 'Net',
    'Brocade', 'Jacquard', 'Tweed', 'Corduroy', 'Leather', 'Suede', 'Mesh',
    'Jersey', 'Spandex', 'Lycra', 'Bamboo', 'Modal', 'Tencel', 'Cashmere'
  ];

  const colorThemes = [
    'Pastel', 'Neon', 'Earthy', 'Monochrome', 'Metallic', 'Classic', 'Bold',
    'Jewel Tones', 'Neutral', 'Vintage', 'Rainbow', 'Ombre', 'Gradient',
    'Black & White', 'Rose Gold', 'Copper', 'Navy & Gold', 'Burgundy',
    'Forest Green', 'Dusty Rose', 'Sage Green', 'Terracotta', 'Lavender'
  ];

  const modelSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

  const lengths = [
    'Mini', 'Knee-length', 'Midi', 'Ankle-length', 'Floor-length', 'Maxi',
    'Tea-length', 'Asymmetrical', 'High-Low', 'Cropped', 'Regular', 'Long'
  ];

  const moods = [
    'Romantic', 'Edgy', 'Minimalist', 'Bohemian', 'Classic', 'Sporty', 
    'Futuristic', 'Vintage', 'Glamorous', 'Casual', 'Professional', 'Playful',
    'Sophisticated', 'Artistic', 'Gothic', 'Preppy', 'Grunge', 'Chic'
  ];

  const seasons = [
    'Spring', 'Summer', 'Autumn', 'Winter', 'All Season', 'Transitional',
    'Resort', 'Holiday', 'Monsoon', 'Pre-Fall', 'Cruise'
  ];

  const targetAudienceOptions = ['Men', 'Women', 'Unisex', 'Kids', 'Teens', 'Plus Size', 'Maternity'];

  const occasionOptions = [
    'Casual', 'Formal', 'Party', 'Wedding', 'Business', 'Date Night', 'Brunch',
    'Cocktail', 'Red Carpet', 'Beach', 'Travel', 'Festival', 'Concert',
    'Graduation', 'Baby Shower', 'Anniversary', 'Holiday', 'Vacation'
  ];

  const graphicPrintOptions = [
    'Floral', 'Geometric', 'Abstract', 'Animal Print', 'Polka Dots', 'Stripes',
    'Paisley', 'Tribal', 'Mandala', 'Typography', 'Logo', 'Cartoon', 'Nature',
    'Galaxy', 'Marble', 'Tie-Dye', 'Camouflage', 'Plaid', 'Checkered', 'Houndstooth'
  ];

  const patternOptions = [
    'Solid', 'Printed', 'Embroidered', 'Beaded', 'Sequined', 'Applique',
    'Patchwork', 'Quilted', 'Pleated', 'Ruffled', 'Smocked', 'Pintucked',
    'Laser Cut', 'Perforated', 'Textured', 'Woven', 'Knitted', 'Crocheted'
  ];

  const upperWearOptions = [
    'T-Shirt', 'Blouse', 'Shirt', 'Tank Top', 'Crop Top', 'Sweater', 'Hoodie', 
    'Blazer', 'Jacket', 'Cardigan', 'Vest', 'Tunic', 'Bodysuit', 'Camisole',
    'Off-Shoulder Top', 'Halter Top', 'Peplum Top', 'Wrap Top', 'Button-Down'
  ];

  const lowerWearOptions = [
    'Jeans', 'Trousers', 'Shorts', 'Skirt', 'Leggings', 'Palazzo', 'Culottes',
    'Pencil Skirt', 'A-Line Skirt', 'Maxi Skirt', 'Mini Skirt', 'Cargo Pants',
    'Wide-Leg Pants', 'Skinny Jeans', 'Bootcut Jeans', 'High-Waisted Pants'
  ];

  const shoesOptions = [
    'Sneakers', 'Heels', 'Flats', 'Boots', 'Sandals', 'Loafers', 'Pumps',
    'Ankle Boots', 'Knee-High Boots', 'Platform Shoes', 'Wedges', 'Oxfords',
    'Ballet Flats', 'Stilettos', 'Block Heels', 'Combat Boots', 'Chelsea Boots'
  ];

  const headAccessoriesOptions = [
    'Hat', 'Cap', 'Beanie', 'Headband', 'Hair Clip', 'Scarf', 'Bandana',
    'Beret', 'Fedora', 'Sun Hat', 'Baseball Cap', 'Bucket Hat', 'Turban',
    'Hair Bow', 'Tiara', 'Hair Pins', 'Headwrap'
  ];

  const accessoryOptions = [
    'Necklace', 'Earrings', 'Bracelet', 'Ring', 'Watch', 'Belt', 'Bag',
    'Purse', 'Backpack', 'Sunglasses', 'Scarf', 'Gloves', 'Brooch',
    'Anklet', 'Hair Accessories', 'Phone Case', 'Wallet'
  ];

  const hairstyleOptions = [
    'Long & Straight', 'Wavy', 'Curly', 'Bob Cut', 'Pixie Cut', 'Updo',
    'Ponytail', 'Braids', 'Bun', 'Beach Waves', 'Sleek & Straight',
    'Messy Bun', 'Side Braid', 'Top Knot', 'Half-Up Half-Down', 'Bangs',
    'Layered', 'Shag', 'Lob (Long Bob)', 'Afro', 'Dreadlocks', 'Cornrows'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    onGenerate({
      prompt,
      style,
      fabric: fabrics.join(', ') || 'Mixed fabrics',
      colorTheme,
      mainColor,
      modelSize,
      length,
      mood,
      season,
      accessories,
      targetAudience,
      occasion,
      graphicPrint,
      pattern,
      upperWear,
      lowerWear,
      shoes,
      headAccessories,
      hairstyle
    });
  };

  return (
    <section id="create" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Palette className={`w-8 h-8 ${darkMode ? 'text-pink-400' : 'text-pink-600'} animate-pulse`} />
          </div>
          <h2 className={`font-title font-bold text-3xl md:text-4xl mb-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          } tracking-wide`}>
            ✨ Describe Your Dream Design
          </h2>
          <p className={`font-main text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Cast your fashion spell and watch AI weave magic ✨
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`${darkMode ? 'glassmorphism-dark' : 'glassmorphism'} 
                     rounded-3xl p-8 backdrop-blur-lg shadow-2xl border-2 
                     ${darkMode ? 'border-pink-500/20' : 'border-pink-200/50'}`}
        >
          {/* Main Prompt - Required */}
          <div className="mb-8">
            <label className={`font-main block text-sm font-semibold mb-3 ${
              darkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              ✨ Describe your magical fashion vision <span className="text-pink-500">*</span>
            </label>
            <textarea
              placeholder="A dreamy evening gown that sparkles like stardust, with flowing fabric that catches moonlight and makes me feel like a goddess walking through an enchanted garden..."
              className={`magic-input w-full p-4 rounded-2xl border-0 resize-none h-24 font-main ${
                darkMode ? 'text-white bg-gray-800/50 placeholder-gray-400' : 'text-gray-800 bg-white/80 placeholder-gray-500'
              }`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
          </div>

          {/* Essential Details - Required Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <SingleSelectDropdown
              value={style}
              onChange={setStyle}
              options={styleOptions}
              placeholder="What's your style vibe?"
              label="✨ Style"
              icon="✨"
              darkMode={darkMode}
              required={true}
            />

            <SingleSelectDropdown
              value={mood}
              onChange={setMood}
              options={moods}
              placeholder="What energy are you channeling?"
              label="💫 Mood"
              icon="💫"
              darkMode={darkMode}
              required={true}
            />

            <SingleSelectDropdown
              value={season}
              onChange={setSeason}
              options={seasons}
              placeholder="When will you slay?"
              label="🌸 Season"
              icon="🌸"
              darkMode={darkMode}
            />
          </div>

          {/* Fabric & Materials */}
          <div className="mb-8">
            <MultiSelectDropdown
              value={fabrics}
              onChange={setFabrics}
              options={fabricOptions}
              placeholder="Choose your dream fabrics..."
              label="🧵 Fabrics & Materials"
              icon="🪡"
              darkMode={darkMode}
            />
          </div>

          {/* Color & Theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <SingleSelectDropdown
              value={colorTheme}
              onChange={setColorTheme}
              options={colorThemes}
              placeholder="What's your color story?"
              label="🎨 Color Theme"
              icon="🌈"
              darkMode={darkMode}
            />

            <div>
              <label className={`font-main block text-sm font-semibold mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                💎 Main Color
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
          </div>

          {/* Size & Fit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <SingleSelectDropdown
              value={modelSize}
              onChange={setModelSize}
              options={modelSizes}
              placeholder="What size fits perfectly?"
              label="📏 Size"
              icon="📐"
              darkMode={darkMode}
            />

            <SingleSelectDropdown
              value={length}
              onChange={setLength}
              options={lengths}
              placeholder="How long should it be?"
              label="📐 Length"
              icon="📏"
              darkMode={darkMode}
            />
          </div>

          {/* Occasion & Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <SingleSelectDropdown
              value={targetAudience}
              onChange={setTargetAudience}
              options={targetAudienceOptions}
              placeholder="Who's going to slay in this?"
              label="👥 Target Audience"
              icon="🎯"
              darkMode={darkMode}
            />

            <SingleSelectDropdown
              value={occasion}
              onChange={setOccasion}
              options={occasionOptions}
              placeholder="Where will you wear this?"
              label="🎉 Occasion"
              icon="🎊"
              darkMode={darkMode}
            />

            <SingleSelectDropdown
              value={graphicPrint}
              onChange={setGraphicPrint}
              options={graphicPrintOptions}
              placeholder="Any cool prints?"
              label="🖼️ Graphics & Prints"
              icon="🎨"
              darkMode={darkMode}
            />

            <SingleSelectDropdown
              value={pattern}
              onChange={setPattern}
              options={patternOptions}
              placeholder="What pattern speaks to you?"
              label="✨ Pattern Details"
              icon="🔮"
              darkMode={darkMode}
            />
          </div>

          {/* Outfit Components */}
          <div className="space-y-6 mb-8">
            <h3 className={`font-main font-bold text-lg ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              👔 Outfit Components (Optional but fun!)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MultiSelectDropdown
                value={upperWear}
                onChange={setUpperWear}
                options={upperWearOptions}
                placeholder="What's on top?"
                label="👕 Upper Wear"
                darkMode={darkMode}
              />

              <MultiSelectDropdown
                value={lowerWear}
                onChange={setLowerWear}
                options={lowerWearOptions}
                placeholder="What's on the bottom?"
                label="👖 Lower Wear"
                darkMode={darkMode}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MultiSelectDropdown
                value={shoes}
                onChange={setShoes}
                options={shoesOptions}
                placeholder="Step into style..."
                label="👠 Shoes"
                darkMode={darkMode}
              />

              <MultiSelectDropdown
                value={headAccessories}
                onChange={setHeadAccessories}
                options={headAccessoriesOptions}
                placeholder="Crown your look..."
                label="👑 Head Accessories"
                darkMode={darkMode}
              />
            </div>
          </div>

          {/* Accessories & Styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <MultiSelectDropdown
              value={accessories}
              onChange={setAccessories}
              options={accessoryOptions}
              placeholder="Add some sparkle..."
              label="💎 Accessories & Jewelry"
              darkMode={darkMode}
            />

            <SingleSelectDropdown
              value={hairstyle}
              onChange={setHairstyle}
              options={hairstyleOptions}
              placeholder="How should the hair flow?"
              label="💇‍♀️ Hairstyle Suggestion"
              darkMode={darkMode}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="neon-button px-12 py-4 rounded-full text-lg font-bold ripple hover-scale group disabled:opacity-50 disabled:cursor-not-allowed font-main"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                  ✨ Weaving your fashion magic...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 group-hover:animate-spin" />
                  ✨ Generate My Dream Design
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};