'use client';

import { useState } from 'react';
import { useInventoryStore } from '@/lib/store/inventoryStore';
import ItemSearch from './ItemSearch';
import StatFilter from './StatFilter';

export default function SearchSection() {
  const { mode, selectedItem, toggleItemInMode } = useInventoryStore();

  const handleModeChange = (newMode: 'own' | 'want') => {
    useInventoryStore.setState({ mode: newMode });
    
    if (selectedItem) {
      toggleItemInMode(selectedItem);
    }
  };

  return (
    <div className="w-96 bg-gray-900/95 border border-gray-700 rounded-lg overflow-visible">
      {/* Mode Toggle */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => handleModeChange('own')}
          className={`flex-1 py-2 text-sm font-semibold transition-colors ${
            mode === 'own'
              ? 'bg-green-500/20 text-green-300'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Items I Own
        </button>
        <button
          onClick={() => handleModeChange('want')}
          className={`flex-1 py-2 text-sm font-semibold transition-colors ${
            mode === 'want'
              ? 'bg-blue-500/20 text-blue-300'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Items I Want
        </button>
      </div>

      {/* Search and Filters */}
      <div className="p-4 space-y-4">
        <ItemSearch mode={mode} />
        <div className="border-t border-gray-700 my-4" />
        <StatFilter />
      </div>
    </div>
  );
} 