import Image from "next/image";
import InventoryGrid from "@/components/inventory/InventoryGrid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900">
      <div className="relative">
        <Image
          src="/images/inventoryBackground.webp"
          alt="Inventory Background"
          width={800}  // Adjust these dimensions based on your actual image
          height={600} // Adjust these dimensions based on your actual image
          priority
          className="rounded-lg shadow-lg"
        />
        <InventoryGrid />
      </div>
    </main>
  );
}
