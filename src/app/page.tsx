import Image from "next/image";
import InventoryGrid from "@/components/inventory/InventoryGrid";
import ItemSearch from "@/components/inventory/ItemSearch";
import StatFilter from "@/components/inventory/StatFilter";
import SubmitButton from "@/components/inventory/SubmitButton";
import LevelInput from "@/components/inventory/LevelInput";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24 bg-gray-900">
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <LevelInput />
          <ItemSearch />
          <StatFilter />
          <SubmitButton />
        </div>
        <div className="relative">
          <Image
            src="/images/inventoryBackground.webp"
            alt="Inventory Background"
            width={800}
            height={600}
            priority
            className="rounded-lg shadow-lg"
          />
          <InventoryGrid />
        </div>
      </div>
    </main>
  );
}
