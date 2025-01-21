'use client';

import { useState, useEffect } from 'react';
import { items } from '@/items';
import { Item } from '@/lib/types/items';
import { useInventoryStore } from '@/lib/store/inventoryStore';

export default function ItemSearch() {
  const { selectedItem, setSelectedItem } = useInventoryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setSearchTerm(selectedItem);
    }
  }, [selectedItem]);

  const searchResults = isFocused
    ? items.result.flatMap(category => 
        category.entries.filter(item => 
          !searchTerm || 
          item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.text?.toLowerCase() || '').includes(searchTerm.toLowerCase())
        )
      )
    : [];

  const handleSelectItem = (item: Item) => {
    setSelectedItem(item.text || item.type);
    setSearchTerm(item.text || item.type);
    setIsFocused(false);
  };

  const clearSelection = () => {
    setSelectedItem(null);
    setSearchTerm('');
    setIsFocused(false);
  };

  return (
    <div className="w-96">
      <div className="relative flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Type to search items... (e.g. 'Ring', 'Amulet')"
          className={`w-full px-4 py-2 bg-gray-800/90 text-white border ${
            !selectedItem ? 'border-gray-600' : 'border-yellow-400'
          } rounded-t-lg focus:outline-none focus:border-yellow-400`}
        />
        {selectedItem && (
          <button
            onClick={clearSelection}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white px-2"
          >
            ×
          </button>
        )}
      </div>

      {isFocused && (
        <div className="bg-gray-800/95 backdrop-blur-sm border-x border-b border-gray-600 rounded-b-lg p-2 max-h-60 overflow-y-auto">
          <ul className="space-y-1">
            {searchResults.map((item, index) => (
              <li 
                key={index}
                onClick={() => handleSelectItem(item)}
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