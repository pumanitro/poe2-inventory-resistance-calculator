import Image from "next/image";
import InventoryGrid from "@/components/inventory/InventoryGrid";
import ItemSearch from "@/components/inventory/ItemSearch";
import StatFilter from "@/components/inventory/StatFilter";
import SubmitButton from "@/components/inventory/SubmitButton";
import LevelInput from "@/components/inventory/LevelInput";
import ResistanceSliders from "@/components/inventory/ResistanceSliders";
import SearchSection from "@/components/inventory/SearchSection";
import ColorLegend from "@/components/inventory/ColorLegend";
import FindGearButton from "@/components/inventory/FindGearButton";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24 bg-gray-900">
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <LevelInput />
          <ResistanceSliders />
          <SearchSection />
          <SubmitButton />
        </div>
        <div className="flex flex-col">
          <ColorLegend />
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
          <div className="flex justify-end">
            <FindGearButton />
          </div>
        </div>
      </div>
    </main>
  );
}
