'use client';

import { useState } from 'react';
import { useInventoryStore } from '@/lib/store/inventoryStore';

export default function ResistanceSliders() {
  const [elementalRes, setElementalRes] = useState(75); // Default max ele res
  const [chaosRes, setChaosRes] = useState(20); // Default chaos res is 20%
  const { setDesiredResistances } = useInventoryStore();

  const handleElementalChange = (value: number) => {
    setElementalRes(value);
    setDesiredResistances({ elemental: value, chaos: chaosRes });
  };

  const handleChaosChange = (value: number) => {
    setChaosRes(value);
    setDesiredResistances({ elemental: elementalRes, chaos: value });
  };

  return (
    <div className="w-96 bg-gray-900/95 border border-gray-700 rounded-lg p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-white font-semibold">Elemental Resistances:</span>
          <span className="text-white text-sm">{elementalRes}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={elementalRes}
          onChange={(e) => handleElementalChange(parseInt(e.target.value))}
          className="w-full accent-yellow-400 bg-gray-700 h-2 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-white font-semibold">Chaos Resistance:</span>
          <span className="text-white text-sm">{chaosRes}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={chaosRes}
          onChange={(e) => handleChaosChange(parseInt(e.target.value))}
          className="w-full accent-purple-400 bg-gray-700 h-2 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
} 