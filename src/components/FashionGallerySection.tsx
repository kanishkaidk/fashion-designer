import React, { useState } from 'react';
import { Heart, Download, Eye, Sparkles } from 'lucide-react';

interface FashionGalleryProps {
  darkMode: boolean;
}

export const FashionGallerySection: React.FC<FashionGalleryProps> = ({ darkMode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Sample fashion designs with Pexels images
  const sampleDesigns = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Ethereal Evening Gown",
      style: "Evening Wear",
      mood: "Romantic",
      fabric: "Silk, Chiffon",
      color: "#e91e63",
      description: "A flowing masterpiece that captures moonlight and dreams",
      caption: "For when you want to be poetry in motion 💕"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Urban Street Chic",
      style: "Streetwear",
      mood: "Edgy",
      fabric: "Denim, Cotton",
      color: "#424242",
      description: "Bold street style with attitude and flair",
      caption: "When you need to serve looks and attitude 🔥"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Minimalist Elegance",
      style: "Minimalist",
      mood: "Classic",
      fabric: "Wool, Cashmere",
      color: "#f5f5f5",
      description: "Clean lines and timeless sophistication",
      caption: "Less is more, but make it iconic ✨"
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Bohemian Rhapsody",
      style: "Bohemian",
      mood: "Free Spirit",
      fabric: "Cotton, Lace",
      color: "#8d6e63",
      description: "Flowing fabrics and earthy tones for the wandering soul",
      caption: "Free spirit with expensive taste 🌙"
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Power Suit Perfection",
      style: "Business",
      mood: "Professional",
      fabric: "Wool, Polyester",
      color: "#1a237e",
      description: "Commanding presence with impeccable tailoring",
      caption: "Boss energy with a touch of magic ✨"
    },
    {
      id: 6,
      image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Vintage Glamour",
      style: "Vintage",
      mood: "Glamorous",
      fabric: "Velvet, Satin",
      color: "#c2185b",
      description: "Old Hollywood meets modern sophistication",
      caption: "Bringing back the golden age of fashion 💫"
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const downloadImage = async (imageUrl: string, title: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Sparkles className={`w-8 h-8 ${darkMode ? 'text-pink-400' : 'text-pink-600'} animate-pulse`} />
          </div>
          <h2 className={`font-space-grotesk font-bold text-3xl md:text-4xl mb-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Fashion Inspiration Gallery
          </h2>
          <p className={`font-main text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover stunning AI-generated designs and get inspired for your next creation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleDesigns.map((design) => (
            <div
              key={design.id}
              className={`group relative ${
                darkMode ? 'glassmorphism-dark' : 'glassmorphism'
              } rounded-3xl p-6 hover-scale transition-all duration-300 cursor-pointer`}
              onMouseEnter={() => setHoveredCard(design.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className="relative mb-4 overflow-hidden rounded-2xl">
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ 
                    borderColor: design.color, 
                    borderWidth: '3px', 
                    borderStyle: 'solid',
                    borderRadius: '1rem'
                  }}
                />
                
                {/* Overlay Actions */}
                <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-2xl flex items-center justify-center ${
                  hoveredCard === design.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleFavorite(design.id)}
                      className={`p-3 rounded-full shadow-lg hover:scale-110 transition-all ${
                        favorites.includes(design.id)
                          ? 'bg-pink-500 text-white'
                          : 'bg-white/90 text-gray-700 hover:bg-pink-50'
                      }`}
                      title={favorites.includes(design.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-5 h-5 ${
                        favorites.includes(design.id) ? 'fill-current' : ''
                      }`} />
                    </button>
                    
                    <button
                      onClick={() => downloadImage(design.image, design.title)}
                      className="p-3 bg-white/90 rounded-full shadow-lg hover:scale-110 transition-all hover:bg-blue-50"
                      title="Download"
                    >
                      <Download className="w-5 h-5 text-gray-700" />
                    </button>
                    
                    <button
                      className="p-3 bg-white/90 rounded-full shadow-lg hover:scale-110 transition-all hover:bg-purple-50"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Favorite Badge */}
                {favorites.includes(design.id) && (
                  <div className="absolute top-3 right-3 bg-pink-500 text-white p-2 rounded-full animate-pulse">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                )}
              </div>

              {/* Design Info */}
              <div className="space-y-3">
                <h3 className={`font-main font-bold text-xl ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {design.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="tag-pill bg-pink-100 text-pink-800 text-xs">
                    {design.style}
                  </span>
                  <span className="tag-pill bg-purple-100 text-purple-800 text-xs">
                    {design.mood}
                  </span>
                  <span className="tag-pill bg-blue-100 text-blue-800 text-xs">
                    {design.fabric}
                  </span>
                </div>

                {/* Color */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: design.color }}
                  ></div>
                  <span className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Primary Color
                  </span>
                </div>

                {/* Description */}
                <p className={`font-main text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {design.description}
                </p>

                {/* Quirky Caption */}
                <p className={`font-main text-xs italic font-medium ${
                  darkMode ? 'text-pink-300' : 'text-pink-600'
                }`}>
                  "{design.caption}"
                </p>

                {/* Action Button */}
                <button
                  className={`font-main w-full py-3 rounded-2xl font-semibold transition-all duration-300 hover-scale ${
                    darkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                      : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white'
                  }`}
                >
                  ✨ Get Inspired
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className={`${
            darkMode ? 'glassmorphism-dark' : 'glassmorphism'
          } rounded-3xl p-8 max-w-2xl mx-auto`}>
            <h3 className={`font-main font-bold text-2xl mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Ready to Create Your Own? ✨
            </h3>
            <p className={`font-main text-lg mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Let AI bring your fashion dreams to life with personalized designs
            </p>
            <button
              onClick={() => document.getElementById('create')?.scrollIntoView({ behavior: 'smooth' })}
              className="neon-button px-8 py-4 rounded-full text-lg font-semibold ripple hover-scale font-main"
            >
              ✨ Start Creating Magic
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};