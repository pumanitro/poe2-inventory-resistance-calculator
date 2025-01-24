'use client';

import { useInventoryStore } from '@/lib/store/inventoryStore';

export default function SubmitButton() {
  const { selectedSlot, selectedItem, statFilters } = useInventoryStore();
  const submitItemRequest = useInventoryStore(state => state.submitItemRequest);

  const canSubmit = selectedSlot && (selectedItem || statFilters.length > 0);

  if (!canSubmit) return null;

  return (
    <button
      onClick={submitItemRequest}
      className="w-full py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 font-semibold rounded-lg border border-yellow-400/30 hover:border-yellow-400/50 transition-colors"
    >
      Add Item
    </button>
  );
} 