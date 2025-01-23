'use client';

import { useState } from 'react';
import { useInventoryStore } from '@/lib/store/inventoryStore';

export default function LevelInput() {
  const [level, setLevel] = useState('');
  const { setCurrentLevel } = useInventoryStore();

  const handleLevelChange = (value: string) => {
    // Only allow numbers and limit to 1-100
    const numValue = value.replace(/\D/g, '');
    if (numValue === '' || (parseInt(numValue) > 0 && parseInt(numValue) <= 100)) {
      setLevel(numValue);
      setCurrentLevel(numValue ? parseInt(numValue) : null);
    }
  };

  return (
    <div className="w-96 bg-gray-900/95 border border-gray-700 rounded-lg p-2 flex items-center gap-2">
      <span className="text-white font-semibold">Character Level:</span>
      <input
        type="text"
        value={level}
        onChange={(e) => handleLevelChange(e.target.value)}
        placeholder="1-100"
        className="w-20 bg-gray-800 text-white px-3 py-1.5 rounded border border-gray-700 focus:outline-none focus:border-yellow-400"
      />
    </div>
  );
} 