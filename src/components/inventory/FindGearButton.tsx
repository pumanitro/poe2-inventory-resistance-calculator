'use client';

import { useInventoryStore } from '@/lib/store/inventoryStore';
import { findItem } from '@/lib/api/tradeApi';

interface Resistances {
  fire: number;
  cold: number;
  lightning: number;
  chaos: number;
}

export default function FindGearButton() {
  const { currentLevel, desiredResistances, previewItems } = useInventoryStore();

  const calculateCurrentResistances = (): Resistances => {
    const current: Resistances = { fire: 0, cold: 0, lightning: 0, chaos: 0 };
    
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
  };

  const calculateMissingResistances = () => {
    const current = calculateCurrentResistances();
    const desired = {
      fire: desiredResistances.elemental,
      cold: desiredResistances.elemental,
      lightning: desiredResistances.elemental,
      chaos: desiredResistances.chaos
    };

    return {
      fire: Math.max(0, desired.fire - current.fire),
      cold: Math.max(0, desired.cold - current.cold),
      lightning: Math.max(0, desired.lightning - current.lightning),
      chaos: Math.max(0, desired.chaos - current.chaos)
    };
  };

  const handleFindGear = async () => {
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

    console.log('Search Results:', searchResult);

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

  return (
    <button 
      className="mt-4 px-6 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 font-semibold rounded-lg border border-yellow-400/30 hover:border-yellow-400/50 transition-colors"
      onClick={handleFindGear}
    >
      Find Gear
    </button>
  );
} 