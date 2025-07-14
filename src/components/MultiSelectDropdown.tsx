import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Plus } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectDropdownProps {
  options: string[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  label: string;
  icon?: string;
  darkMode: boolean;
  allowCustom?: boolean;
  maxHeight?: string;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  label,
  icon,
  darkMode,
  allowCustom = true,
  maxHeight = "200px"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customInput, setCustomInput] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !value.includes(option)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setCustomInput('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    if (!value.includes(option)) {
      onChange([...value, option]);
    }
    setSearchTerm('');
  };

  const handleRemove = (option: string) => {
    onChange(value.filter(v => v !== option));
  };

  const handleAddCustom = () => {
    const trimmed = customInput.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setCustomInput('');
      setSearchTerm('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (customInput.trim()) {
        handleAddCustom();
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
      </label>

      <div
        className={`magic-input w-full p-3 rounded-xl border-0 cursor-pointer min-h-[48px] ${
          darkMode ? 'text-white bg-gray-800/50' : 'text-gray-800 bg-white/80'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-main"
            >
              {item}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item);
                }}
                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className={`${
            value.length === 0 
              ? (darkMode ? 'text-gray-400' : 'text-gray-500') 
              : 'text-transparent'
          } font-main`}>
            {value.length === 0 ? placeholder : ''}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
      </div>

      {isOpen && (
        <div className={`absolute z-50 w-full mt-1 rounded-xl shadow-2xl border ${
          darkMode 
            ? 'bg-gray-800 border-gray-600' 
            : 'bg-white border-gray-200'
        } max-h-80 overflow-hidden`}>
          <div className="p-3 border-b border-gray-200 dark:border-gray-600">
            <input
              type="text"
              className={`w-full p-2 rounded-lg border-0 outline-none font-main ${
                darkMode 
                  ? 'bg-gray-700 text-white placeholder-gray-400' 
                  : 'bg-gray-50 text-gray-800 placeholder-gray-500'
              }`}
              placeholder="Search or add custom..."
              value={searchTerm || customInput}
              onChange={(e) => {
                const val = e.target.value;
                setSearchTerm(val);
                setCustomInput(val);
              }}
              onKeyPress={handleKeyPress}
              autoFocus
            />
            {allowCustom && customInput && !options.includes(customInput) && (
              <button
                type="button"
                onClick={handleAddCustom}
                className="mt-2 w-full flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-colors font-main"
              >
                <Plus className="w-4 h-4" />
                Add "{customInput}"
              </button>
            )}
          </div>

          <div className="max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-gray-100">
            {filteredOptions.length === 0 && !customInput ? (
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
                  } hover:border-l-4 hover:border-pink-400 transition-all`}
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