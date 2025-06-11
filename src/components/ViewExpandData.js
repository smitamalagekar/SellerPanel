import React from 'react';
// import { EyeIcon, Minus, Plus } from "lucide-react";
import { EyeIcon } from "lucide-react";

const ViewExpandData = ({ isExpanded, toggleExpanded }) => {
  return (
    <div className="px-2 py-2 md:hidden mt-3 mr-3">
      <button onClick={toggleExpanded}>
        {isExpanded ? <EyeIcon size={18} color="blue" /> : <EyeIcon size={18} color="blue" />}
      </button>
    </div>
  );
};

export default ViewExpandData;
