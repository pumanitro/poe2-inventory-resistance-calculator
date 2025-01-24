import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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

interface SearchResult {
  icon?: string;
  name?: string;
  typeLine?: string;
  explicitMods?: string[];
  properties?: Array<{
    name: string;
    values: Array<[string, number]>;
  }>;
}

interface InventoryState {
  selectedSlot: string | null;
  selectedItem: string | null;
  statFilters: StatValue[];
  previewItems: Record<string, PreviewItem>;  // Map of slot -> preview
  currentLevel: number | null;
  desiredResistances: Resistances;
  mode: 'own' | 'want';
  ownedItems: Set<string>;  // Just track item names for each mode
  wantedItems: Set<string>;
  searchResults: Record<string, SearchResult>;
  // Actions
  setSelectedSlot: (slot: string | null) => void;
  setSelectedItem: (item: string | null) => void;
  setStatFilters: (filters: StatValue[]) => void;
  submitItemRequest: () => void;
  clearPreview: (slot: string) => void;
  clearAllPreviews: () => void;
  editItem: (slot: string) => void;
  setCurrentLevel: (level: number | null) => void;
  setDesiredResistances: (res: Resistances) => void;
  toggleItemInMode: (itemName: string) => void;
  setSearchResult: (slotId: string, result: SearchResult) => void;
  clearSearchResult: (slotId: string) => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      selectedSlot: null,
      selectedItem: null,
      statFilters: [],
      previewItems: {},
      currentLevel: null,
      desiredResistances: { elemental: 75, chaos: 20 },
      mode: 'want',
      ownedItems: new Set(),
      wantedItems: new Set(),
      searchResults: {},

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

      setDesiredResistances: (res) => set({ desiredResistances: res }),

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

      setSearchResult: (slotId, result) => 
        set((state) => {
          const newState = {
            searchResults: {
              ...state.searchResults,
              [slotId]: result
            }
          };
          console.log('Store state after search:', {
            searchResults: newState.searchResults,
            previewItems: state.previewItems,
            currentLevel: state.currentLevel,
            desiredResistances: state.desiredResistances,
            mode: state.mode
          });
          return newState;
        }),

      clearSearchResult: (slotId) =>
        set((state) => {
          const { [slotId]: _, ...rest } = state.searchResults;
          return { searchResults: rest };
        }),
    }),
    {
      name: 'poe2-inventory-storage',
      partialize: (state) => ({
        currentLevel: state.currentLevel,
        desiredResistances: state.desiredResistances,
        previewItems: state.previewItems,
        ownedItems: [...state.ownedItems],
        wantedItems: [...state.wantedItems],
        searchResults: state.searchResults,
      }),
      onRehydrateStorage: (state) => {
        if (state) {
          state.ownedItems = new Set(state.ownedItems);
          state.wantedItems = new Set(state.wantedItems);
        }
      },
    }
  )
); 