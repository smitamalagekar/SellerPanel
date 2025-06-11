import { Package } from "lucide-react";
import StatCard from "./StatCard";

// Reusable ProductItem component
function ProductItem({ color, label, value }) {
  return (
    <div className="flex items-center my-3">
      <div className={`w-2.5 h-2.5 bg-${color}-500 rounded-full mr-2.5`}></div>
      <span className="flex-1 text-[#6c7293]">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function ProductSection() {
  return (
    <div className="bg-white rounded-lg shadow-sm px-5 py-6">
      {/* StatCard for Total Products */}
      <StatCard
        title="Total Products"
        value="178"
        icon={<Package size={24} color="#ccc" aria-label="Total Products" />}
      />

      {/* In-house Products */}
      <ProductItem color="red" label="In-house Products" value="60" />

      {/* Sellers Products */}
      <ProductItem color="blue" label="Sellers Products" value="118" />
    </div>
  );
}

export default ProductSection;