import { create } from 'zustand';
import { StatValue } from '@/lib/types/inventory';

interface PreviewItem {
  slot: string;
  name?: string;  // Make name optional
  stats: StatValue[];
  mode: 'own' | 'want';
}

interface Resistances {
  elemental: number;
  chaos: number;
}

interface InventoryState {
  selectedSlot: string | null;
  selectedItem: string | null;
  statFilters: StatValue[];
  previewItems: Record<string, PreviewItem>;  // Map of slot -> preview
  currentLevel: number | null;
  resistances: Resistances;
  mode: 'own' | 'want';
  ownedItems: Set<string>;  // Just track item names for each mode
  wantedItems: Set<string>;
  // Actions
  setSelectedSlot: (slot: string | null) => void;
  setSelectedItem: (item: string | null) => void;
  setStatFilters: (filters: StatValue[]) => void;
  submitItemRequest: () => void;
  clearPreview: (slot: string) => void;
  clearAllPreviews: () => void;
  editItem: (slot: string) => void;
  setCurrentLevel: (level: number | null) => void;
  setResistances: (res: Resistances) => void;
  toggleItemInMode: (itemName: string) => void;
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  selectedSlot: null,
  selectedItem: null,
  statFilters: [],
  previewItems: {},
  currentLevel: null,
  resistances: { elemental: 75, chaos: 20 },
  mode: 'want',
  ownedItems: new Set(),
  wantedItems: new Set(),

  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  setStatFilters: (filters) => set({ statFilters: filters }),
  
  submitItemRequest: () => {
    const { selectedSlot, selectedItem, statFilters, previewItems, mode } = get();
    if (!selectedSlot || !statFilters.length) return;  // Only check for slot and stats

    set({
      previewItems: {
        ...previewItems,
        [selectedSlot]: {
          slot: selectedSlot,
          name: selectedItem || undefined,  // Make name optional
          stats: statFilters,
          mode: mode
        }
      },
      selectedSlot: null,
      selectedItem: null,
      statFilters: [],
    });
  },

  clearPreview: (slot) => set((state) => {
    const newPreviews = { ...state.previewItems };
    delete newPreviews[slot];
    return { previewItems: newPreviews };
  }),

  clearAllPreviews: () => set({ previewItems: {} }),

  editItem: (slot: string) => {
    const { previewItems } = get();
    const item = previewItems[slot];
    if (!item) return;

    set({
      selectedSlot: slot,
      selectedItem: item.name,
      statFilters: item.stats,
    });
  },

  setCurrentLevel: (level) => set({ currentLevel: level }),

  setResistances: (res) => set({ resistances: res }),

  toggleItemInMode: (itemName) => set((state) => {
    const { mode, ownedItems, wantedItems } = state;
    const targetSet = mode === 'own' ? ownedItems : wantedItems;
    const newSet = new Set(targetSet);
    
    if (newSet.has(itemName)) {
      newSet.delete(itemName);
    } else {
      newSet.add(itemName);
    }

    return mode === 'own' 
      ? { ownedItems: newSet }
      : { wantedItems: newSet };
  }),
})); 