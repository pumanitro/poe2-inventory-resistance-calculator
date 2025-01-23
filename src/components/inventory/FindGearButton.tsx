'use client';

export default function FindGearButton() {
  return (
    <button 
      className="mt-4 px-6 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 font-semibold rounded-lg border border-yellow-400/30 hover:border-yellow-400/50 transition-colors"
      onClick={() => {
        // TODO: Implement find gear functionality
        console.log('Find gear clicked');
      }}
    >
      Find Gear
    </button>
  );
} 