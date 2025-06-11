import React from "react";

function Button({ children, onClick, className, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white rounded-md py-1.5 px-4 text-sm transition-colors focus:outline-none focus:ring-2 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;