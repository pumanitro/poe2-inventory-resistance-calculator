'use client';

import { useState } from 'react';
import { InventorySection, InventorySectionType, EquipmentSlotType, StatValue } from '@/lib/types/inventory';
import { useInventoryStore } from '@/lib/store/inventoryStore';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { handleFindGear } from './FindGearButton';

const defaultSections: InventorySection[] = [
  {
    id: EquipmentSlotType.LEFT_WEAPON,
    name: 'Left Weapon',
    type: InventorySectionType.EQUIPMENT,
    width: 134,
    height: 265,
    position: { x: 80, y: 60 }
  },
  {
    id: EquipmentSlotType.RIGHT_WEAPON,
    name: 'Right Weapon',
    type: InventorySectionType.EQUIPMENT,
    width: 134,
    height: 265,
    position: { x: 585, y: 60 }
  },
  {
    id: EquipmentSlotType.HEAD,
    name: 'Head',
    type: InventorySectionType.EQUIPMENT,
    width: 134,
    height: 134,
    position: { x: 331, y: 46 }
  },
  {
    id: EquipmentSlotType.BODY,
    name: 'Body',
    type: InventorySectionType.EQUIPMENT,
    width: 134,
    height: 200,
    position: { x: 331, y: 190 }
  },
  {
    id: EquipmentSlotType.HANDS,
    name: 'Hands',
    type: InventorySectionType.EQUIPMENT,
    width: 134,
    height: 134,
    position: { x: 175, y: 334 }
  },
  {
    id: EquipmentSlotType.FEET,
    name: 'Feet',
    type: InventorySectionType.EQUIPMENT,
    width: 134,
    height: 134,
    position: { x: 490, y: 334 }
  },
  {
    id: EquipmentSlotType.LEFT_RING,
    name: 'Left Ring',
    type: InventorySectionType.EQUIPMENT,
    width: 67,
    height: 67,
    position: { x: 238, y: 256 }
  },
  {
    id: EquipmentSlotType.RIGHT_RING,
    name: 'Right Ring',
    type: InventorySectionType.EQUIPMENT,
    width: 67,
    height: 67,
    position: { x: 490, y: 256 }
  },
  {
    id: EquipmentSlotType.AMULET,
    name: 'Amulet',
    type: InventorySectionType.EQUIPMENT,
    width: 67,
    height: 67,
    position: { x: 490, y: 178 }
  },
  {
    id: EquipmentSlotType.BELT,
    name: 'Belt',
    type: InventorySectionType.EQUIPMENT,
    width: 134,
    height: 67,
    position: { x: 331, y: 405 }
  },
  {
    id: EquipmentSlotType.HEALTH_FLASK,
    name: 'Health Flask',
    type: InventorySectionType.EQUIPMENT,
    width: 67,
    height: 134,
    position: { x: 200, y: 480 }
  },
  {
    id: EquipmentSlotType.MANA_FLASK,
    name: 'Mana Flask',
    type: InventorySectionType.EQUIPMENT,
    width: 67,
    height: 134,
    position: { x: 500, y: 480 }
  },
  {
    id: 'charms',
    name: 'Charms',
    type: InventorySectionType.EQUIPMENT,
    width: 200,
    height: 67,
    position: { x: 285, y: 520 }
  }
];

const ItemPreview = ({ name, stats, slotId, mode }: { name?: string; stats: StatValue[]; slotId: string; mode: 'own' | 'want' }) => {
  const editItem = useInventoryStore(state => state.editItem);

  const getBgColor = () => {
    return mode === 'own' 
      ? 'bg-green-500/40'
      : 'bg-blue-500/40';
  };

  return (
    <div 
      className={`absolute inset-0 p-3 flex flex-col group ${getBgColor()}`}
      onClick={(e) => {
        e.stopPropagation();
        editItem(slotId);
      }}
    >
      <div className="flex justify-between items-start">
        <div className="text-yellow-400 text-sm font-semibold border-b border-gray-700 pb-2">
          {name || '[ANY]'}
        </div>
        <div className="flex gap-1">
          {mode === 'want' && (
            <button 
              className="text-yellow-400/70 hover:text-yellow-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleFindGear(slotId);
              }}
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
            </button>
          )}
          <button 
            className="text-white/70 hover:text-white text-lg font-bold"
            onClick={(e) => {
              e.stopPropagation();
              useInventoryStore.getState().clearPreview(slotId);
            }}
          >
            ×
          </button>
        </div>
      </div>
      <div className="mt-2 space-y-1 overflow-y-auto">
        {stats.map((stat, i) => (
          <div key={i} className="text-blue-300 text-xs flex items-baseline gap-1">
            <span className="text-white">{stat.value || '[ANY]'}</span>
            <span>{stat.stat.replace('#', '')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function InventoryGrid() {
  const { selectedSlot, setSelectedSlot, previewItems, searchResults, clearSearchResult } = useInventoryStore();

  const renderSlot = (slot: string) => {
    const item = previewItems[slot];
    
    return (
      <div key={slot} className="relative p-2 bg-gray-800/50 rounded border border-gray-700/50 min-h-24">
        <div className="text-sm text-gray-400 mb-1">{slot}</div>
        {item && (
          <div className="relative">
            {item.name && <div className="text-sm text-yellow-400">{item.name}</div>}
            <div className="text-xs text-gray-300 space-y-1">
              {item.stats.map((stat, i) => (
                <div key={i}>{stat.stat.replace('#', stat.value)}</div>
              ))}
            </div>
            {item.mode === 'want' && (
              <div className="relative">
                <button 
                  className="text-yellow-400/70 hover:text-yellow-400 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFindGear(slot);
                  }}
                >
                  <MagnifyingGlassIcon className="w-4 h-4" />
                </button>
                {searchResults[slot] && (
                  <div className="absolute top-full left-0 mt-2 bg-gray-800 rounded shadow-lg z-50 w-32 group/result">
                    <div className="relative">
                      <button 
                        className="absolute -top-1 -right-1 p-1 text-gray-400 hover:text-white z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearSearchResult(slot);
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      
                      <img 
                        src={searchResults[slot].icon} 
                        alt={searchResults[slot].name} 
                        className="w-full h-32 object-contain" 
                      />

                      {/* Details popup on hover */}
                      <div className="absolute left-full top-0 ml-2 hidden group-hover/result:block w-64 bg-gray-800 p-2 rounded shadow-lg">
                        <div className="text-yellow-400 font-semibold">{searchResults[slot].name}</div>
                        <div className="text-gray-400 text-sm">{searchResults[slot].typeLine}</div>
                        {searchResults[slot].explicitMods?.map((mod, i) => (
                          <div key={i} className="text-blue-300 text-xs mt-1">{mod}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="absolute inset-0">
      {defaultSections.map((section) => (
        <div
          key={section.id}
          className={`absolute border cursor-pointer group ${
            selectedSlot === section.id
              ? 'border-yellow-400/70 z-50'
              : 'border-gray-400/30 hover:border-yellow-400/50'
          }`}
          style={{
            left: `${section.position.x}px`,
            top: `${section.position.y}px`,
            width: `${section.width}px`,
            height: `${section.height}px`,
          }}
          onClick={() => setSelectedSlot(section.id)}
        >
          <div
            className={`absolute -top-6 left-0 text-xs font-semibold ${
              selectedSlot === section.id
                ? 'text-yellow-400/70'
                : 'text-white/50'
            }`}
          >
            {section.name}
          </div>
          
          {previewItems[section.id] ? (
            <ItemPreview 
              name={previewItems[section.id].name} 
              stats={previewItems[section.id].stats}
              slotId={section.id}
              mode={previewItems[section.id].mode}
            />
          ) : (
            <div className="relative">
              <button 
                className="absolute top-2 right-2 p-1 text-yellow-400/0 group-hover:text-yellow-400/70 hover:!text-yellow-400 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFindGear(section.id);
                }}
              >
                <MagnifyingGlassIcon className="w-4 h-4" />
              </button>
              {searchResults[section.id] && (
                <div className="absolute top-full left-0 mt-2 bg-gray-800 rounded shadow-lg z-50 w-32 group/result">
                  <div className="relative">
                    <button 
                      className="absolute -top-1 -right-1 p-1 text-gray-400 hover:text-white z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearSearchResult(section.id);
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    <img 
                      src={searchResults[section.id].icon} 
                      alt={searchResults[section.id].name} 
                      className="w-full h-32 object-contain" 
                    />

                    {/* Details popup on hover */}
                    <div className="absolute left-full top-0 ml-2 hidden group-hover/result:block w-64 bg-gray-800 p-2 rounded shadow-lg">
                      <div className="text-yellow-400 font-semibold">{searchResults[section.id].name}</div>
                      <div className="text-gray-400 text-sm">{searchResults[section.id].typeLine}</div>
                      {searchResults[section.id].explicitMods?.map((mod, i) => (
                        <div key={i} className="text-blue-300 text-xs mt-1">{mod}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 