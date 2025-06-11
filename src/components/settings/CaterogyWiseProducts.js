import React, { useState } from "react";
import { PlusCircle, X, ChevronDown, ChevronUp } from "lucide-react";

const CategoryItem = ({
  category,
  index,
  isOpen,
  onToggle,
  onUpdate,
  onRemove,
  onAddSubitem,
  onUpdateSubitem,
  onRemoveSubitem,
}) => {
  return (
    <div className="bg-white border border-gray-200 shadow-xs mb-4">
      <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
        <button
          onClick={() => onToggle(index)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <input
          type="text"
          value={category.name}
          onChange={(e) => onUpdate(index, e.target.value)}
          placeholder="Category Name"
          className="flex-1 mx-4 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
        />
        <button
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      {isOpen && (
        <div className="p-4 pt-0 space-y-3">
          {category.subitems.map((subitem, subIndex) => (
            <div key={subIndex} className="flex items-center gap-3">
              <input
                type="text"
                value={subitem}
                onChange={(e) =>
                  onUpdateSubitem(index, subIndex, e.target.value)
                }
                placeholder="Subitem Name"
                className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              />
              <button
                onClick={() => onRemoveSubitem(index, subIndex)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <button
            onClick={() => onAddSubitem(index)}
            className="w-full text-center text-blue-500 hover:text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            + Add Subitem
          </button>
        </div>
      )}
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([
    {
      name: "Women Clothing & Fashion",
      subitems: ["Dresses", "Tops", "Bottoms"],
    },
    {
      name: "Men Clothing & Fashion",
      subitems: ["Shirts", "Trousers", "Accessories"],
    },
    { name: "Kids & Toy", subitems: ["Toys", "Games", "Clothing"] },
    {
      name: "Cellphones & Tabs",
      subitems: ["Smartphones", "Tablets", "Accessories"],
    },
  ]);

  const [openIndex, setOpenIndex] = useState(null); // Track which category is open

  const addCategory = () => {
    setCategories([...categories, { name: "", subitems: [] }]);
  };

  const removeCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
    if (openIndex === index) setOpenIndex(null); // Close dropdown if the removed category was open
  };

  const updateCategory = (index, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index].name = value;
    setCategories(updatedCategories);
  };

  const addSubitem = (index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].subitems.push("");
    setCategories(updatedCategories);
  };

  const updateSubitem = (catIndex, subIndex, value) => {
    const updatedCategories = [...categories];
    updatedCategories[catIndex].subitems[subIndex] = value;
    setCategories(updatedCategories);
  };

  const removeSubitem = (catIndex, subIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[catIndex].subitems.splice(subIndex, 1);
    setCategories(updatedCategories);
  };

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle dropdown
  };

  const handleSave = () => {
    // Perform save action here, e.g., send data to an API
    console.log("Saved categories:", categories);
    alert("Categories saved successfully!");
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
      {categories.map((category, catIndex) => (
        <CategoryItem
          key={catIndex}
          category={category}
          index={catIndex}
          isOpen={openIndex === catIndex}
          onToggle={toggleDropdown}
          onUpdate={updateCategory}
          onRemove={removeCategory}
          onAddSubitem={addSubitem}
          onUpdateSubitem={updateSubitem}
          onRemoveSubitem={removeSubitem}
        />
      ))}
      <div className="flex justify-between mt-6">
        <button
          onClick={addCategory}
          className="flex items-center justify-center gap-2 text-green-600 hover:text-green-800 font-medium py-2 px-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
        >
          <PlusCircle size={20} /> Add New Category
        </button>
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 text-white bg-blue-500 font-medium py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Categories;
