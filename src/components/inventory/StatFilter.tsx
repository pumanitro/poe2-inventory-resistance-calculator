'use client';

import { useState } from 'react';
import { stats } from '@/stats';

interface StatValue {
  stat: string;
  value: string;
}

export default function StatFilter() {
  const [selectedStats, setSelectedStats] = useState<StatValue[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStats = stats.filter(stat => 
    stat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addStat = (stat: string) => {
    if (!selectedStats.find(s => s.stat === stat)) {
      setSelectedStats([...selectedStats, { stat, value: '' }]);
    }
  };

  const removeStat = (stat: string) => {
    setSelectedStats(selectedStats.filter(s => s.stat !== stat));
  };

  const updateValue = (stat: string, value: string) => {
    setSelectedStats(selectedStats.map(s => 
      s.stat === stat ? { ...s, value } : s
    ));
  };

  return (
    <div className="absolute right-0 top-[-20px] w-80 bg-gray-900/95 border border-gray-700 rounded-lg">
      <div className="p-2 border-b border-gray-700 flex items-center">
        <span className="text-white font-semibold">Stat Filters</span>
        <button className="ml-auto text-gray-400 hover:text-white">
          <span className="sr-only">Clear all</span>
          ×
        </button>
      </div>

      {selectedStats.map(({ stat, value }) => (
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
          placeholder="Add stat filter..."
          className="w-full bg-gray-800 text-white px-3 py-1.5 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
        />

        {searchTerm && (
          <div className="mt-2 max-h-60 overflow-y-auto">
            {filteredStats.map(stat => (
              <button
                key={stat}
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