import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ColorEdit() {
  const { id } = useParams();
  const [color, setColor] = useState("#FFE4E1");
 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Color Information</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            value="MistyRose"
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Color Code</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
          />
        </div>
        <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition">
          Save
        </button>
      </div>
    </div>
  );
}
