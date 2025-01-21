'use client';

import { useInventoryStore } from '@/lib/store/inventoryStore';

export default function SubmitButton() {
  const { selectedSlot, selectedItem, submitItemRequest } = useInventoryStore();

  if (!selectedSlot || !selectedItem) return null;

  return (
    <div className="w-80 mt-4">
      <button
        onClick={submitItemRequest}
        className="w-full py-3 bg-yellow-600 text-white rounded hover:bg-yellow-500 transition-colors font-semibold"
      >
        Preview Item
      </button>
    </div>
  );
} 