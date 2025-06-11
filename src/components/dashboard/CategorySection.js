import { Grid } from "lucide-react";

// Mapping for category colors
const colorMap = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  blue: "bg-blue-500",
};

function CategorySection() {
  const categories = [
    { name: "Computer & Accessories", value: "$3,026.110", color: "red" },
    { name: "Men Clothing", value: "$1,901.550", color: "orange" },
    { name: "Cellphones & Tabs", value: "$1,494.000", color: "blue" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      {/* Section Header */}
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold mr-2.5">249</h2>
        <p className="text-[#6c7293]">Total Category</p>
        <div className="ml-auto">
          <Grid size={24} color="#ccc" aria-label="Categories Grid" />
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4">Top Categories</h3>


      {/* Category List */}
      <div>
        {categories.map((category, index) => (
          <div key={index} className="flex items-center mb-4">
            {/* Category Indicator */}
            <div
              className={`w-2.5 h-2.5 rounded-full mr-3 ${colorMap[category.color]}`}
            ></div>
            {/* Category Name */}
            <span className="flex-1 text-[#6c7293]">{category.name}</span>
            {/* Category Value */}
            <span className="font-bold">{category.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;