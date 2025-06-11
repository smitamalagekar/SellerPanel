import { FaChevronDown } from 'react-icons/fa';

const Dropdown = ({ label, options, isOpen, onToggle, onSelect =()=>{}}) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="px-4 py-2 bg-white border rounded-md text-gray-700 flex items-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {label}
      <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg border">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
          >
            {option}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default Dropdown;