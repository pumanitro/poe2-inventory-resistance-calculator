'use client';

import { useInventoryStore } from '@/lib/store/inventoryStore';
import { findItem } from '@/lib/api/tradeApi';

interface Resistances {
  fire: number;
  cold: number;
  lightning: number;
  chaos: number;
}

export const handleFindGear = async (slotId?: string) => {
  const { currentLevel, desiredResistances, previewItems, setSearchResult } = useInventoryStore.getState();
  const missingResistances = calculateMissingResistances();
  const level = currentLevel || 100;

  const searchResult = await findItem(
    {
      fire: Math.ceil(missingResistances.fire),
      cold: Math.ceil(missingResistances.cold),
      lightning: Math.ceil(missingResistances.lightning),
      chaos: Math.ceil(missingResistances.chaos)
    },
    level
  );

  if (searchResult?.error?.code === 'AUTH_REQUIRED') {
    alert(`${searchResult.error.message}\n\n${searchResult.error.details}`);
    return;
  }

  if (searchResult?.items?.[0] && slotId) {
    setSearchResult(slotId, {
      icon: searchResult.items[0].icon,
      name: searchResult.items[0].name,
      typeLine: searchResult.items[0].typeLine,
      explicitMods: searchResult.items[0].explicitMods,
      properties: searchResult.items[0].properties
    });
  }

  console.log('Character Summary:', {
    level: currentLevel || 'Not set',
    desiredResistances: {
      elemental: `${desiredResistances.elemental}%`,
      chaos: `${desiredResistances.chaos}%`
    },
    currentResistances: calculateCurrentResistances(),
    missingResistances,
    equipment: Object.entries(previewItems).map(([slot, item]) => ({
      slot,
      name: item.name,
      stats: item.stats,
      mode: item.mode
    }))
  });
};

export default function FindGearButton() {
  return (
    <button 
      className="mt-4 px-6 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 font-semibold rounded-lg border border-yellow-400/30 hover:border-yellow-400/50 transition-colors"
      onClick={() => handleFindGear()}
    >
      Find Gear
    </button>
  );
}

function calculateCurrentResistances(): Resistances {
  const current: Resistances = { fire: 0, cold: 0, lightning: 0, chaos: 0 };
  
  const previewItems = useInventoryStore.getState().previewItems;
  Object.values(previewItems).forEach(item => {
    if (item.mode === 'own') {
      item.stats.forEach(stat => {
        // Handle all elemental resistances
        if (stat.stat === "#% to all Elemental Resistances") {
          const value = Number(stat.value) || 0;
          current.fire += value;
          current.cold += value;
          current.lightning += value;
        }
        // Handle individual resistances
        if (stat.stat === "#% to Fire Resistance") {
          current.fire += Number(stat.value) || 0;
        }
        if (stat.stat === "#% to Cold Resistance") {
          current.cold += Number(stat.value) || 0;
        }
        if (stat.stat === "#% to Lightning Resistance") {
          current.lightning += Number(stat.value) || 0;
        }
        if (stat.stat === "#% to Chaos Resistance") {
          current.chaos += Number(stat.value) || 0;
        }
      });
    }
  });

  return current;
}

function calculateMissingResistances(): { fire: number; cold: number; lightning: number; chaos: number } {
  const current = calculateCurrentResistances();
  const desired = {
    fire: useInventoryStore.getState().desiredResistances.elemental,
    cold: useInventoryStore.getState().desiredResistances.elemental,
    lightning: useInventoryStore.getState().desiredResistances.elemental,
    chaos: useInventoryStore.getState().desiredResistances.chaos
  };

  return {
    fire: Math.max(0, desired.fire - current.fire),
    cold: Math.max(0, desired.cold - current.cold),
    lightning: Math.max(0, desired.lightning - current.lightning),
    chaos: Math.max(0, desired.chaos - current.chaos)
  };
} 