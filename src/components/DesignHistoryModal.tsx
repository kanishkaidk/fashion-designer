import React from 'react';
import { X, Download, Clock } from 'lucide-react';
import { FashionDesign } from '../App';

interface DesignHistoryModalProps {
  designs: FashionDesign[];
  onClose: () => void;
  darkMode: boolean;
}

export const DesignHistoryModal: React.FC<DesignHistoryModalProps> = ({
  designs,
  onClose,
  darkMode
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
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`${
        darkMode ? 'glassmorphism-dark' : 'glassmorphism'
      } rounded-3xl w-full max-w-4xl max-h-[80vh] overflow-hidden`}>
        {/* Header */}
        <div className={`p-6 border-b ${
          darkMode ? 'border-gray-600' : 'border-gray-200'
        } flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <Clock className={`w-6 h-6 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`} />
            <h2 className={`font-space-grotesk font-bold text-2xl ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Design History
            </h2>
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {designs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎨</div>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                No designs yet. Start creating to build your fashion history!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((design) => (
                <div
                  key={design.id}
                  className={`${
                    darkMode ? 'bg-gray-800/50' : 'bg-white/50'
                  } rounded-2xl p-4 hover-scale group backdrop-blur-sm`}
                >
                  <div className="relative mb-3">
                    <img
                      src={design.imageUrl}
                      alt="Fashion Design"
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => downloadImage(design.imageUrl)}
                      className="absolute top-2 right-2 p-2 bg-white/80 rounded-full shadow hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {design.specs.style}
                      </h3>
                      {design.isBestPick && (
                        <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full">
                          👑 Best
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      <span className="tag-pill bg-pink-100 text-pink-800 text-xs">
                        {design.specs.fabric}
                      </span>
                      <span className="tag-pill bg-purple-100 text-purple-800 text-xs">
                        {design.specs.mood}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: design.specs.mainColor }}
                      ></div>
                      <span className={`text-xs ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {formatDate(design.timestamp)}
                      </span>
                    </div>

                    <p className={`text-xs italic ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      "{design.specs.quirkyCaption}"
                    </p>
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