import { useState, useEffect } from 'react';
import { FashionDesign } from '../App';

export const useDesignHistory = () => {
  const [designHistory, setDesignHistory] = useState<FashionDesign[]>(() => {
    const saved = localStorage.getItem('designHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('designHistory', JSON.stringify(designHistory));
  }, [designHistory]);

  const addDesign = (design: FashionDesign) => {
    setDesignHistory(prev => [design, ...prev].slice(0, 50)); // Keep only last 50 designs
  };

  const clearHistory = () => {
    setDesignHistory([]);
  };

  return { designHistory, addDesign, clearHistory };
};