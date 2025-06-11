export const SearchBar = ({ value, onChange, placeholder }) => {
    return (
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        className="px-4 py-2 border rounded-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };