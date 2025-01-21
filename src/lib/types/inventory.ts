export interface Item {
  id: string;
  name: string;
  type: ItemType;
  rarity: ItemRarity;
  imageUrl?: string;
  width: number;
  height: number;
  position?: {
    x: number;
    y: number;
  };
}

export enum ItemType {
  WEAPON = 'WEAPON',
  ARMOR = 'ARMOR',
  ACCESSORY = 'ACCESSORY',
  CONSUMABLE = 'CONSUMABLE',
}

export enum ItemRarity {
  COMMON = 'COMMON',
  MAGIC = 'MAGIC',
  RARE = 'RARE',
  UNIQUE = 'UNIQUE',
}

export interface InventorySection {
  id: string;
  name: string;
  type: InventorySectionType;
  width: number;
  height: number;
  position: {
    x: number;
    y: number;
  };
}

export enum InventorySectionType {
  MAIN = 'MAIN',
  EQUIPMENT = 'EQUIPMENT',
  STASH = 'STASH',
}

export enum EquipmentSlotType {
  LEFT_WEAPON = 'LEFT_WEAPON',    // Left tall slot
  RIGHT_WEAPON = 'RIGHT_WEAPON',  // Right tall slot
  HEAD = 'HEAD',                  // Center top
  BODY = 'BODY',                  // Center middle
  HANDS = 'HANDS',                // Left middle
  FEET = 'FEET',                  // Right middle
  LEFT_RING = 'LEFT_RING',        // Blue socket bottom left
  RIGHT_RING = 'RIGHT_RING',      // Blue socket bottom right
  AMULET = 'AMULET',             // Center small slot
  BELT = 'BELT',                  // Center bottom
  HEALTH_FLASK = 'HEALTH_FLASK',  // Red flask bottom left
  MANA_FLASK = 'MANA_FLASK',      // Blue flask bottom right
  CHARM_1 = 'CHARM_1',            // Bottom center left charm
  CHARM_2 = 'CHARM_2',            // Bottom center middle charm
  CHARM_3 = 'CHARM_3'             // Bottom center right charm
}

export interface StatValue {
  stat: string;
  value: string;
} 