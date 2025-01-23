'use client';

import { useState } from 'react';
import { stats } from '@/stats';
import { useInventoryStore } from '@/lib/store/inventoryStore';
import { StatValue } from '@/lib/types/inventory';

export default function StatFilter() {
  const { statFilters, setStatFilters, selectedSlot, selectedItem } = useInventoryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredStats = isFocused
    ? stats.filter(stat => 
        !searchTerm || 
        stat.toLowerCase().includes(searchTerm.toLowerCase())
      ).filter(stat => !statFilters.find(s => s.stat === stat))
    : [];

  const addStat = (stat: string) => {
    if (!statFilters.find(s => s.stat === stat)) {
      setStatFilters([...statFilters, { stat, value: '' }]);
      setSearchTerm('');
      setIsFocused(false);
    }
  };

  const removeStat = (stat: string) => {
    setStatFilters(statFilters.filter(s => s.stat !== stat));
  };

  const updateValue = (stat: string, value: string) => {
    setStatFilters(statFilters.map(s => 
      s.stat === stat ? { ...s, value } : s
    ));
  };

  const clearAll = () => {
    setStatFilters([]);
  };

  return (
    <div className="w-full bg-gray-900/95 border border-gray-700 rounded-lg">
      <div className="p-2 border-b border-gray-700 flex items-center">
        <span className="text-white font-semibold">Stat Filters</span>
        <button 
          onClick={clearAll}
          className="ml-auto text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>

      {statFilters.map(({ stat, value }) => (
        <div key={stat} className="p-2 border-b border-gray-700 flex items-center gap-2">
          <span className="text-white text-sm flex-1">{stat}</span>
          <input 
            type="text" 
            value={value}
            onChange={(e) => updateValue(stat, e.target.value)}
            placeholder="value" 
            className="w-16 bg-gray-800 text-white px-2 py-1 rounded text-sm"
          />
          <button 
            onClick={() => removeStat(stat)}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
      ))}

      <div className="p-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Add stat filter..."
          className="w-full bg-gray-800 text-white px-3 py-1.5 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
        />

        {isFocused && (
          <div className="mt-2 max-h-60 overflow-y-auto">
            {filteredStats.map((stat, index) => (
              <button
                key={`${stat}-${index}`}
                onClick={() => addStat(stat)}
                className="w-full text-left text-sm text-gray-300 hover:bg-gray-800 p-2 rounded"
              >
                {stat}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 