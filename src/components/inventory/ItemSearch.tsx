'use client';

import { useState, useEffect } from 'react';
import { items } from '@/items';
import { Item } from '@/lib/types/items';
import { useInventoryStore } from '@/lib/store/inventoryStore';

export default function ItemSearch({ mode }: { mode: 'own' | 'want' }) {
  const { selectedItem, setSelectedItem, ownedItems, wantedItems, toggleItemInMode } = useInventoryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setSearchTerm(selectedItem);
    }
  }, [selectedItem]);

  const searchResults = isFocused
    ? items.result.flatMap(category => 
        category.entries.filter(item => {
          const itemName = item.text || item.type;
          return !searchTerm || 
            item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.text?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        })
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

  const toggleItemStatus = (item: Item, e: React.MouseEvent) => {
    e.stopPropagation();
    const itemName = item.text || item.type;
    toggleItemInMode(itemName);
  };

  return (
    <div className="w-full relative">
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
          } rounded-lg focus:outline-none focus:border-yellow-400`}
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
        <div 
          className="absolute w-full bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-lg p-2 max-h-60 overflow-y-auto z-50 shadow-lg"
          style={{
            top: '100%',
            left: '0',
            marginTop: '0.5rem'
          }}
        >
          <ul className="space-y-1">
            {searchResults.map((item, index) => {
              const itemName = item.text || item.type;
              return (
                <li 
                  key={`${itemName}-${index}`}
                  onClick={() => handleSelectItem(item)}
                  className="text-white hover:bg-gray-700/80 p-2 rounded cursor-pointer flex items-center gap-2"
                >
                  <span className="flex-1">{itemName}</span>
                  {item.flags?.unique && (
                    <span className="text-yellow-400 text-sm px-2 py-0.5 bg-yellow-400/10 rounded">
                      Unique
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
} 