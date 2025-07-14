import React from 'react';
import { Download, ExternalLink, History, Crown, Gallery as GalleryIcon } from 'lucide-react';
import { FashionDesign } from '../App';

interface OutputSectionProps {
  designs: FashionDesign[];
  darkMode: boolean;
  onShowHistory: () => void;
}

export const OutputSection: React.FC<OutputSectionProps> = ({ 
  designs, 
  darkMode, 
  onShowHistory 
}) => {
  const downloadImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fashion-design-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const exportToFigma = () => {
    // Create a simple Figma-compatible JSON structure
    const figmaData = {
      name: "Fashion Design Export",
      type: "FRAME",
      children: designs.map((design, index) => ({
        name: `Design ${index + 1} - ${design.specs.style}`,
        type: "RECTANGLE",
        fills: [{
          type: "IMAGE",
          imageRef: design.imageUrl
        }],
        constraints: {
          horizontal: "LEFT",
          vertical: "TOP"
        },
        absoluteBoundingBox: {
          x: index * 300,
          y: 0,
          width: 280,
          height: 360
        }
      }))
    };

    // Create downloadable JSON file
    const dataStr = JSON.stringify(figmaData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fashion-designs-figma.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('🎨 Figma-compatible file downloaded! Import this JSON into Figma using a plugin like "JSON to Figma"');
  };

  const copyDescription = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Description copied to clipboard!');
  };

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`font-title font-bold text-3xl md:text-4xl mb-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Your AI-Generated Designs
          </h2>
          <p className={`font-main text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Fresh from the digital runway, crafted just for you
          </p>
          
          <button
            onClick={onShowHistory}
            className={`font-main inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover-scale ${
              darkMode 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-pink-500 hover:bg-pink-600 text-white'
            }`}
          >
            <GalleryIcon className="w-4 h-4" />
            ✨ Open Gallery
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designs.map((design, idx) => (
            <div
              key={design.id}
              className={`design-card relative ${
                darkMode ? 'glassmorphism-dark' : 'glassmorphism'
              } rounded-3xl p-6 shadow-2xl hover-scale`}
            >
              {design.isBestPick && (
                <div className="best-pick-badge flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Best Pick
                </div>
              )}
              
              <div className="relative group mb-4">
                <img
                  src={design.imageUrl}
                  alt="AI Fashion Design"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  style={{ borderColor: design.specs.mainColor, borderWidth: '3px', borderStyle: 'solid' }}
                />
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-3">
                    <button
                      onClick={() => downloadImage(design.imageUrl)}
                      className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                      title="Download"
                    >
                      <Download className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={exportToFigma}
                      className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                      title="Export to Figma"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className={`font-main font-bold text-xl ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {design.specs.style}
                </h3>

                <div className="flex flex-wrap gap-2">
                  <span className="tag-pill bg-pink-100 text-pink-800">{design.specs.fabric}</span>
                  <span className="tag-pill bg-purple-100 text-purple-800">{design.specs.colorTheme}</span>
                  <span className="tag-pill bg-blue-100 text-blue-800">{design.specs.length}</span>
                  <span className="tag-pill bg-green-100 text-green-800">{design.specs.season}</span>
                  <span className="tag-pill bg-yellow-100 text-yellow-800">{design.specs.modelSize}</span>
                  {design.specs.accessories && design.specs.accessories.length > 0 && (
                    <span className="tag-pill bg-gray-100 text-gray-800">
                      {Array.isArray(design.specs.accessories) 
                        ? design.specs.accessories.slice(0, 2).join(', ') + (design.specs.accessories.length > 2 ? '...' : '')
                        : design.specs.accessories
                      }
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: design.specs.mainColor }}
                  ></div>
                  <span className={`font-main text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Main Color
                  </span>
                </div>

                <div className={`p-4 rounded-2xl ${
                  darkMode ? 'bg-purple-900/30' : 'bg-pink-50'
                }`}>
                  <div className="space-y-2 mb-3">
                    {design.specs.upperWear && design.specs.upperWear.length > 0 && (
                      <p className={`font-main text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <strong className={darkMode ? 'text-pink-300' : 'text-pink-600'}>Upper:</strong> {design.specs.upperWear.join(', ')}
                      </p>
                    )}
                    {design.specs.lowerWear && design.specs.lowerWear.length > 0 && (
                      <p className={`font-main text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <strong className={darkMode ? 'text-pink-300' : 'text-pink-600'}>Lower:</strong> {design.specs.lowerWear.join(', ')}
                      </p>
                    )}
                    {design.specs.shoes && design.specs.shoes.length > 0 && (
                      <p className={`font-main text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <strong className={darkMode ? 'text-pink-300' : 'text-pink-600'}>Shoes:</strong> {design.specs.shoes.join(', ')}
                      </p>
                    )}
                    {design.specs.hairstyle && (
                      <p className={`font-main text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <strong className={darkMode ? 'text-pink-300' : 'text-pink-600'}>Hair:</strong> {design.specs.hairstyle}
                      </p>
                    )}
                  </div>
                  <p className={`font-main text-sm font-semibold mb-2 ${
                    darkMode ? 'text-pink-300' : 'text-pink-600'
                  }`}>
                    {design.specs.stylingTip}
                  </p>
                  <p className={`font-main text-sm italic ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    "{design.specs.quirkyCaption}"
                  </p>
                </div>

                <button
                  onClick={() => copyDescription(design.specs.description)}
                  className={`font-main w-full py-3 rounded-2xl font-semibold transition-all duration-300 hover-scale ${
                    darkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                      : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white'
                  }`}
                >
                  ✨ Copy Description
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};