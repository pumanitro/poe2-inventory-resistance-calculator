export default function ColorLegend() {
  return (
    <div className="flex gap-4 mb-2 justify-end">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-green-500/70 border border-gray-600 rounded"></div>
        <span className="text-white/90 text-sm">Items I Own</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-blue-500/70 border border-gray-600 rounded"></div>
        <span className="text-white/90 text-sm">Items I Want</span>
      </div>
    </div>
  );
} 