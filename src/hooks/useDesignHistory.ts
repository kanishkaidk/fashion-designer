import { useState, useEffect } from 'react';
import { FashionDesign } from '../App';

export const useDesignHistory = () => {
  const [designHistory, setDesignHistory] = useState<FashionDesign[]>(() => {
    const saved = localStorage.getItem('designHistory');
    if (!saved) return [];
    
    try {
      const parsed = JSON.parse(saved);
      // Convert timestamp strings back to Date objects
      return parsed.map((design: any) => ({
        ...design,
        timestamp: design.timestamp ? new Date(design.timestamp) : new Date(),
      }));
    } catch (error) {
      console.error('Error parsing design history:', error);
      return [];
    }
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