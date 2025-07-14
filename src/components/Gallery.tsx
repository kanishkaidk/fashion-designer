import React, { useState } from 'react';
import { Download, Heart, Calendar, Palette, X, Filter } from 'lucide-react';
import { FashionDesign } from '../App';

interface GalleryProps {
  designs: FashionDesign[];
  darkMode: boolean;
  onClose: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ designs, darkMode, onClose }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteDesigns');
    return saved ? JSON.parse(saved) : [];
  });
  const [filterBy, setFilterBy] = useState<'all' | 'favorites' | 'recent'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'style'>('newest');

  const toggleFavorite = (designId: string) => {
    const newFavorites = favorites.includes(designId)
      ? favorites.filter(id => id !== designId)
      : [...favorites, designId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteDesigns', JSON.stringify(newFavorites));
  };

  const downloadImage = async (imageUrl: string, designName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${designName}-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const filteredDesigns = designs
    .filter(design => {
      if (filterBy === 'favorites') return favorites.includes(design.id);
      if (filterBy === 'recent') return Date.now() - design.timestamp.getTime() < 24 * 60 * 60 * 1000;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.timestamp.getTime() - a.timestamp.getTime();
      if (sortBy === 'oldest') return a.timestamp.getTime() - b.timestamp.getTime();
      if (sortBy === 'style') return a.specs.style.localeCompare(b.specs.style);
      return 0;
    });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`${
        darkMode ? 'glassmorphism-dark' : 'glassmorphism'
      } rounded-3xl w-full max-w-7xl max-h-[90vh] overflow-hidden`}>
        
        {/* Header */}
        <div className={`p-6 border-b ${
          darkMode ? 'border-gray-600' : 'border-gray-200'
        } flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <Palette className={`w-6 h-6 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`} />
            <h2 className={`font-title font-bold text-2xl ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Design Gallery
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-main ${
              darkMode ? 'bg-purple-600 text-white' : 'bg-pink-100 text-pink-800'
            }`}>
              {filteredDesigns.length} designs
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Filters */}
            <div className="flex items-center gap-2">
              <Filter className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className={`font-main text-sm rounded-lg px-3 py-1 border-0 ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <option value="all">All</option>
                <option value="favorites">Favorites</option>
                <option value="recent">Recent (24h)</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`font-main text-sm rounded-lg px-3 py-1 border-0 ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="style">By Style</option>
              </select>
            </div>
            
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {filteredDesigns.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎨</div>
              <p className={`text-lg font-main ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {filterBy === 'favorites' 
                  ? 'No favorite designs yet. Heart some designs to see them here!'
                  : filterBy === 'recent'
                  ? 'No recent designs. Create some new ones!'
                  : 'No designs yet. Start creating to build your gallery!'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDesigns.map((design) => (
                <div
                  key={design.id}
                  className={`design-card relative ${
                    darkMode ? 'bg-gray-800/50' : 'bg-white/50'
                  } rounded-2xl p-4 hover-scale group backdrop-blur-sm border ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}
                >
                  {/* Image */}
                  <div className="relative mb-3">
                    <img
                      src={design.imageUrl}
                      alt="Fashion Design"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <button
                          onClick={() => downloadImage(design.imageUrl, design.specs.style)}
                          className="p-2 bg-white/90 rounded-full shadow hover:scale-110 transition-transform"
                          title="Download"
                        >
                          <Download className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          onClick={() => toggleFavorite(design.id)}
                          className={`p-2 rounded-full shadow hover:scale-110 transition-transform ${
                            favorites.includes(design.id)
                              ? 'bg-pink-500 text-white'
                              : 'bg-white/90 text-gray-700'
                          }`}
                          title={favorites.includes(design.id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Heart className={`w-4 h-4 ${
                            favorites.includes(design.id) ? 'fill-current' : ''
                          }`} />
                        </button>
                      </div>
                    </div>

                    {/* Best Pick Badge */}
                    {design.isBestPick && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        👑 Best
                      </div>
                    )}

                    {/* Favorite Badge */}
                    {favorites.includes(design.id) && (
                      <div className="absolute top-2 left-2 bg-pink-500 text-white p-1 rounded-full">
                        <Heart className="w-3 h-3 fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Design Info */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-main font-semibold text-lg ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {design.specs.style}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(design.timestamp)}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      <span className="tag-pill bg-pink-100 text-pink-800 text-xs">
                        {design.specs.fabric}
                      </span>
                      <span className="tag-pill bg-purple-100 text-purple-800 text-xs">
                        {design.specs.mood}
                      </span>
                      <span className="tag-pill bg-blue-100 text-blue-800 text-xs">
                        {design.specs.season}
                      </span>
                    </div>

                    {/* Color */}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: design.specs.mainColor }}
                      ></div>
                      <span className={`text-xs font-main ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {design.specs.colorTheme}
                      </span>
                    </div>

                    {/* Quirky Caption */}
                    <p className={`text-xs italic font-main ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      "{design.specs.quirkyCaption}"
                    </p>

                    {/* Full Specs (Expandable) */}
                    <details className="group">
                      <summary className={`cursor-pointer text-xs font-semibold font-main ${
                        darkMode ? 'text-pink-400' : 'text-pink-600'
                      } hover:underline`}>
                        View Full Specs
                      </summary>
                      <div className={`mt-2 p-3 rounded-lg text-xs space-y-1 font-main ${
                        darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                      }`}>
                        <p><strong>Size:</strong> {design.specs.modelSize}</p>
                        <p><strong>Length:</strong> {design.specs.length}</p>
                        {design.specs.accessory && (
                          <p><strong>Accessories:</strong> {design.specs.accessory}</p>
                        )}
                        <p><strong>Styling Tip:</strong> {design.specs.stylingTip}</p>
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};