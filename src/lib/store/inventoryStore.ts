import { create } from 'zustand';
import { StatValue } from '@/lib/types/inventory';

interface InventoryState {
  selectedSlot: string | null;
  selectedItem: string | null;
  statFilters: StatValue[];
  previewItem: {
    slot: string;
    name: string;
    stats: StatValue[];
  } | null;
  // Actions
  setSelectedSlot: (slot: string | null) => void;
  setSelectedItem: (item: string | null) => void;
  setStatFilters: (filters: StatValue[]) => void;
  submitItemRequest: () => void;
  clearPreview: () => void;
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  selectedSlot: null,
  selectedItem: null,
  statFilters: [],
  previewItem: null,

  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  setStatFilters: (filters) => set({ statFilters: filters }),
  
  submitItemRequest: () => {
    const { selectedSlot, selectedItem, statFilters } = get();
    if (!selectedSlot || !selectedItem) return;

    // Here you would normally make an API call
    // For now, we'll just create a preview
    set({
      previewItem: {
        slot: selectedSlot,
        name: selectedItem,
        stats: statFilters,
      }
    });
  },

  clearPreview: () => set({ previewItem: null }),
})); 