'use client';

import { useInventoryStore } from '@/lib/store/inventoryStore';

export default function FindGearButton() {
  const { currentLevel, resistances, previewItems } = useInventoryStore();

  const handleFindGear = () => {
    console.log('Character Summary:', {
      level: currentLevel || 'Not set',
      resistances: {
        elemental: `${resistances.elemental}%`,
        chaos: `${resistances.chaos}%`
      },
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