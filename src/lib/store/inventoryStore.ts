import { create } from 'zustand';
import { StatValue } from '@/lib/types/inventory';

interface PreviewItem {
  slot: string;
  name: string;
  stats: StatValue[];
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
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  selectedSlot: null,
  selectedItem: null,
  statFilters: [],
  previewItems: {},
  currentLevel: null,
  resistances: { elemental: 75, chaos: 20 },

  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  setStatFilters: (filters) => set({ statFilters: filters }),
  
  submitItemRequest: () => {
    const { selectedSlot, selectedItem, statFilters, previewItems } = get();
    if (!selectedSlot || !selectedItem) return;

    set({
      previewItems: {
        ...previewItems,
        [selectedSlot]: {
          slot: selectedSlot,
          name: selectedItem,
          stats: statFilters,
        }
      },
      // Clear selection after submit
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
})); 