import { useState } from "react";
import Dropdown from "./Dropdown";
import { FaSearch } from "react-icons/fa";

const FilterComponent = ({
  title = "All Items",
  filterConfig = {},
  onFilterChange,
  onSearch,
  onBulkAction,
  currentFilters = {},
  selectedItems = [],
  totalItems = 0,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Default filter configuration
  const defaultFilterConfig = {
    bulk: {
      label: "Bulk Action",
      options: ["Delete Selected"],
      disabled: selectedItems.length === 0,
    },
    ...filterConfig,
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterSelect = (filterType, value) => {
    if (filterType === "bulk") {
      onBulkAction(value);
    } else {
      onFilterChange(filterType, value);
    }
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          {selectedItems.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {selectedItems.length} of {totalItems} selected
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          {Object.entries(defaultFilterConfig).map(
            ([key, { label, options, disabled }]) => (
            <Dropdown
              key={key}
              label={label}
              options={options}
              currentValue={currentFilters[key] || label}
              isOpen={openDropdown === key}
              onToggle={() => toggleDropdown(key)}
              onSelect={(value) => handleFilterSelect(key, value)}
              disabled={disabled}
            />
          ))}

          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;