'use client';

import { useState } from 'react';
import { items } from '@/items';
import { Item } from '@/lib/types/items';

interface ItemEntry {
  type: string;
}

export default function ItemSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  // Update search logic to only search by type
  const searchResults = searchTerm.length > 0 
    ? items.result.flatMap(category => 
        category.entries.filter(item => 
          item?.text?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  return (
    <div className="absolute top-[-20px] left-0 z-10 w-96">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type to search items... (e.g. 'Ring', 'Amulet')"
        className="w-full px-4 py-2 bg-gray-800/90 text-white border border-gray-600 rounded-t-lg focus:outline-none focus:border-yellow-400"
      />

      {searchResults.length > 0 && (
        <div className="bg-gray-800/95 backdrop-blur-sm border-x border-b border-gray-600 rounded-b-lg p-2 max-h-60 overflow-y-auto">
          <ul className="space-y-1">
            {searchResults.map((item, index) => (
              <li 
                key={index}
                className="text-white hover:bg-gray-700/80 p-2 rounded cursor-pointer flex items-center justify-between"
              >
                <span>{item.text || item.type}</span>
                {item.flags?.unique && (
                  <span className="text-yellow-400 text-sm px-2 py-0.5 bg-yellow-400/10 rounded">
                    Unique
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 