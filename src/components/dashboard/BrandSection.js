import { Tag } from "lucide-react";

function BrandSection() {
  const brands = [
    { name: "Samsung", value: "$2,008.000", color: "red" },
    { name: "Lenovo", value: "$1,158.000", color: "blue" },
    { name: "Not Found", value: "$1,039.560", color: "purple" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      {/* Section Header */}
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold mr-2.5">112</h2>
        <p className="text-[#6c7293]">Total Brands</p>
        <div className="ml-auto">
          <Tag size={24} color="#ccc" />
        </div>
      </div>

      {/* Section Subheader */}
      <h3 className="text-lg font-semibold mb-4">Top Brands</h3>

      {/* Brand List */}
      <div>
        {brands.map((brand, index) => (
          <div key={index} className="flex items-center mb-3">
            <div className={`w-2.5 h-2.5 bg-${brand.color}-500 rounded-full mr-2.5`}></div>
            <span className="flex-1 text-[#6c7293]">{brand.name}</span>
            <span className="font-bold">{brand.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandSection;