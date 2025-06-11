import React from "react";
import { Info } from "lucide-react";

function InfoBox({ title, description }) {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Info />
      <h4 className="text-sm font-medium text-gray-700 mb-1">{title}</h4>
      <p className="text-xs text-gray-500 mb-2">{description}</p>
    </div>
  );
}

export default InfoBox;