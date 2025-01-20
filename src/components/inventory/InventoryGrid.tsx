'use client';

import { useState } from 'react';
import { InventorySection, InventorySectionType, EquipmentSlotType } from '@/lib/types/inventory';

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

export default function InventoryGrid() {
  const [sections] = useState<InventorySection[]>(defaultSections);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="absolute inset-0">
      {sections.map((section) => (
        <div
          key={section.id}
          className={`absolute border border-gray-400/30 cursor-pointer transition-colors hover:border-yellow-400/50 ${
            activeSection === section.id
              ? 'border-yellow-400/70'
              : ''
          }`}
          style={{
            left: `${section.position.x}px`,
            top: `${section.position.y}px`,
            width: `${section.width}px`,
            height: `${section.height}px`,
          }}
          onClick={() => setActiveSection(section.id)}
        >
          <div className="absolute -top-6 left-0 text-white/50 text-xs font-semibold">
            {section.name}
          </div>
        </div>
      ))}
    </div>
  );
} 