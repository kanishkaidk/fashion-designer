import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SingleSelectDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  icon?: string;
  darkMode: boolean;
  allowCustom?: boolean;
  required?: boolean;
}

export const SingleSelectDropdown: React.FC<SingleSelectDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  label,
  icon,
  darkMode,
  allowCustom = true,
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (allowCustom && searchTerm.trim()) {
        handleSelect(searchTerm.trim());
      } else if (filteredOptions.length > 0) {
        handleSelect(filteredOptions[0]);
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className={`font-main block text-sm font-semibold mb-2 ${
        darkMode ? 'text-gray-200' : 'text-gray-700'
      }`}>
        {icon && <span className="mr-1">{icon}</span>}
        {label}
        {required && <span className="text-pink-500 ml-1">*</span>}
      </label>

      <div
        className={`magic-input w-full p-3 rounded-xl border-0 cursor-pointer min-h-[48px] flex items-center justify-between ${
          darkMode ? 'text-white bg-gray-800/50' : 'text-gray-800 bg-white/80'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`font-main ${
          !value ? (darkMode ? 'text-gray-400' : 'text-gray-500') : ''
        }`}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${
          isOpen ? 'rotate-180' : ''
        } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      </div>

      {isOpen && (
        <div className={`absolute z-50 w-full mt-1 rounded-xl shadow-2xl border max-h-64 overflow-hidden ${
          darkMode 
            ? 'bg-gray-800 border-gray-600' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="p-3 border-b border-gray-200 dark:border-gray-600">
            <input
              type="text"
              className={`w-full p-2 rounded-lg border-0 outline-none font-main ${
                darkMode 
                  ? 'bg-gray-700 text-white placeholder-gray-400' 
                  : 'bg-gray-50 text-gray-800 placeholder-gray-500'
              }`}
              placeholder="Search or type custom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />
          </div>

          <div className="max-h-40 overflow-y-auto">
            {allowCustom && searchTerm && !options.includes(searchTerm) && (
              <button
                type="button"
                className={`w-full text-left p-3 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 hover:from-pink-100 hover:to-purple-100 dark:hover:from-pink-900/30 dark:hover:to-purple-900/30 transition-colors font-main ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
                onClick={() => handleSelect(searchTerm)}
              >
                Add "{searchTerm}"
              </button>
            )}
            
            {filteredOptions.length === 0 && !searchTerm ? (
              <div className={`p-3 text-center ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              } font-main`}>
                No options available
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-main ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  } ${value === option ? 'bg-pink-50 dark:bg-pink-900/20' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};