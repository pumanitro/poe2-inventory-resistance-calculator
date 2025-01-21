'use client';

import { useState } from 'react';
import { InventorySection, InventorySectionType, EquipmentSlotType, StatValue } from '@/lib/types/inventory';
import { useInventoryStore } from '@/lib/store/inventoryStore';

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

const ItemPreview = ({ name, stats, slotId }: { name: string; stats: StatValue[]; slotId: string }) => {
  const editItem = useInventoryStore(state => state.editItem);

  return (
    <div 
      className="absolute inset-0 bg-gray-900/95 p-3 flex flex-col group"
      onClick={(e) => {
        e.stopPropagation();
        editItem(slotId);
      }}
    >
      <button 
        className="absolute top-1 right-1 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          useInventoryStore.getState().clearPreview(slotId);
        }}
      >
        ×
      </button>
      <div className="text-yellow-400 text-sm font-semibold border-b border-gray-700 pb-2">
        {name}
      </div>
      <div className="mt-2 space-y-1 overflow-y-auto">
        {stats.map((stat, i) => (
          <div key={i} className="text-blue-300 text-xs flex items-baseline gap-1">
            <span className="text-white">{stat.value}</span>
            <span>{stat.stat.replace('#', '')}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100">
        Click to edit
      </div>
    </div>
  );
};

export default function InventoryGrid() {
  const { selectedSlot, setSelectedSlot, previewItems } = useInventoryStore();

  return (
    <div className="absolute inset-0">
      {defaultSections.map((section) => (
        <div
          key={section.id}
          className={`absolute border cursor-pointer transition-all duration-200 ${
            selectedSlot === section.id
              ? 'border-yellow-400/70 z-50 scale-110 shadow-xl'
              : 'border-gray-400/30 hover:border-yellow-400/50'
          }`}
          style={{
            left: `${section.position.x}px`,
            top: `${section.position.y}px`,
            width: `${section.width}px`,
            height: `${section.height}px`,
            transformOrigin: selectedSlot === section.id ? 'center center' : undefined,
          }}
          onClick={() => setSelectedSlot(section.id)}
        >
          <div className={`absolute -top-6 left-0 text-white/50 text-xs font-semibold transition-opacity ${
            selectedSlot === section.id ? 'opacity-0' : ''
          }`}>
            {section.name}
          </div>
          
          {previewItems[section.id] && (
            <ItemPreview 
              name={previewItems[section.id].name} 
              stats={previewItems[section.id].stats}
              slotId={section.id}
            />
          )}
        </div>
      ))}
    </div>
  );
} 