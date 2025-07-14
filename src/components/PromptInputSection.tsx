import React, { useState } from 'react';
import { Palette, Shirt, Wand2, X, Plus } from 'lucide-react';

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
  const [accessories, setAccessories] = useState<string[]>([]);
  const [accessoryInput, setAccessoryInput] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [occasion, setOccasion] = useState('');
  const [graphicPrint, setGraphicPrint] = useState('');
  const [pattern, setPattern] = useState('');
  const [outfitComponents, setOutfitComponents] = useState<string[]>([]);
  const [componentInput, setComponentInput] = useState('');

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

  const outfitComponentOptions = [
    'Upper/Top', 'Bottom', 'Footwear', 'Jacket/Outerwear', 'Dress', 'Accessories',
    'Undergarments', 'Headwear', 'Gloves', 'Belt', 'Scarf', 'Jewelry'
  ];

  const addAccessory = () => {
    if (accessoryInput.trim() && !accessories.includes(accessoryInput.trim())) {
      setAccessories([...accessories, accessoryInput.trim()]);
      setAccessoryInput('');
    }
  };

  const removeAccessory = (accessory: string) => {
    setAccessories(accessories.filter(a => a !== accessory));
  };

  const addOutfitComponent = () => {
    if (componentInput.trim() && !outfitComponents.includes(componentInput.trim())) {
      setOutfitComponents([...outfitComponents, componentInput.trim()]);
      setComponentInput('');
    }
  };

  const removeOutfitComponent = (component: string) => {
    setOutfitComponents(outfitComponents.filter(c => c !== component));
  };

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
      accessories,
      targetAudience,
      occasion,
      graphicPrint,
      pattern,
      outfitComponents
    });
  };

  const CustomSelect: React.FC<{
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder: string;
    label: string;
    icon?: string;
  }> = ({ value, onChange, options, placeholder, label, icon }) => (
    <div>
      <label className={`font-main block text-sm font-semibold mb-2 ${
        darkMode ? 'text-gray-200' : 'text-gray-700'
      }`}>
        {icon && <span className="mr-1">{icon}</span>}
        {label}
      </label>
      <input
        list={`${label.replace(/\s+/g, '')}-options`}
        className={`magic-input w-full p-3 rounded-xl border-0 font-main ${
          darkMode ? 'text-white bg-gray-800/50' : 'text-gray-800 bg-white/80'
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <datalist id={`${label.replace(/\s+/g, '')}-options`}>
        {options.map(option => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </div>
  );

  const TagInput: React.FC<{
    tags: string[];
    onAdd: () => void;
    onRemove: (tag: string) => void;
    inputValue: string;
    onInputChange: (value: string) => void;
    placeholder: string;
    label: string;
    options?: string[];
  }> = ({ tags, onAdd, onRemove, inputValue, onInputChange, placeholder, label, options = [] }) => (
    <div>
      <label className={`font-main block text-sm font-semibold mb-2 ${
        darkMode ? 'text-gray-200' : 'text-gray-700'
      }`}>
        {label}
      </label>
      <div className={`magic-input rounded-xl p-3 min-h-[48px] ${
        darkMode ? 'bg-gray-800/50' : 'bg-white/80'
      }`}>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-pink-500 text-white rounded-full text-sm font-main"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemove(tag)}
                className="hover:bg-pink-600 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            list={`${label.replace(/\s+/g, '')}-options`}
            className={`flex-1 bg-transparent border-0 outline-none font-main ${
              darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
            }`}
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={placeholder}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAdd())}
          />
          <button
            type="button"
            onClick={onAdd}
            className="p-1 text-pink-500 hover:text-pink-600"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {options.length > 0 && (
          <datalist id={`${label.replace(/\s+/g, '')}-options`}>
            {options.map(option => (
              <option key={option} value={option} />
            ))}
          </datalist>
        )}
      </div>
    </div>
  );

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
          {/* Main Prompt - Required */}
          <div className="mb-8">
            <label className={`font-main block text-sm font-semibold mb-3 ${
              darkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Describe your magical fashion idea <span className="text-pink-500">*</span>
            </label>
            <textarea
              placeholder="A flowy summer dress with ethereal floral patterns that dance in the moonlight..."
              className={`magic-input w-full p-4 rounded-2xl border-0 resize-none h-24 font-main ${
                darkMode ? 'text-white bg-gray-800/50 placeholder-gray-400' : 'text-gray-800 bg-white/80 placeholder-gray-500'
              }`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
          </div>

          {/* Basic Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <CustomSelect
              value={style}
              onChange={setStyle}
              options={styleOptions}
              placeholder="Choose your vibe..."
              label="Style"
              icon="👗"
            />

            <CustomSelect
              value={fabric}
              onChange={setFabric}
              options={fabricOptions}
              placeholder="Select material..."
              label="Fabric"
              icon="🧵"
            />

            <CustomSelect
              value={colorTheme}
              onChange={setColorTheme}
              options={colorThemes}
              placeholder="Pick your palette..."
              label="Color Theme"
              icon="🎨"
            />

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

            <CustomSelect
              value={modelSize}
              onChange={setModelSize}
              options={modelSizes}
              placeholder="Choose size..."
              label="Size"
              icon="📏"
            />

            <CustomSelect
              value={length}
              onChange={setLength}
              options={lengths}
              placeholder="Select length..."
              label="Length"
              icon="📐"
            />
          </div>

          {/* Mood & Context Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <CustomSelect
              value={mood}
              onChange={setMood}
              options={moods}
              placeholder="What's the vibe?"
              label="Mood"
              icon="💫"
            />

            <CustomSelect
              value={season}
              onChange={setSeason}
              options={seasons}
              placeholder="When to wear?"
              label="Season"
              icon="🌸"
            />

            <CustomSelect
              value={targetAudience}
              onChange={setTargetAudience}
              options={targetAudienceOptions}
              placeholder="Who's it for?"
              label="Target Audience"
              icon="👥"
            />

            <CustomSelect
              value={occasion}
              onChange={setOccasion}
              options={occasionOptions}
              placeholder="What's the event?"
              label="Occasion"
              icon="🎉"
            />
          </div>

          {/* Design Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <CustomSelect
              value={graphicPrint}
              onChange={setGraphicPrint}
              options={graphicPrintOptions}
              placeholder="Choose print style..."
              label="Graphic Print"
              icon="🖼️"
            />

            <CustomSelect
              value={pattern}
              onChange={setPattern}
              options={patternOptions}
              placeholder="Select pattern..."
              label="Pattern Details"
              icon="✨"
            />
          </div>

          {/* Tag Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <TagInput
              tags={accessories}
              onAdd={addAccessory}
              onRemove={removeAccessory}
              inputValue={accessoryInput}
              onInputChange={setAccessoryInput}
              placeholder="Add accessories..."
              label="💎 Accessories"
              options={['Belt', 'Scarf', 'Hat', 'Jewelry', 'Bag', 'Shoes', 'Sunglasses', 'Watch', 'Earrings', 'Necklace', 'Bracelet', 'Ring']}
            />

            <TagInput
              tags={outfitComponents}
              onAdd={addOutfitComponent}
              onRemove={removeOutfitComponent}
              inputValue={componentInput}
              onInputChange={setComponentInput}
              placeholder="Add outfit parts..."
              label="👔 Outfit Components"
              options={outfitComponentOptions}
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