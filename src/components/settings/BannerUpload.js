import React, { useState } from "react";
import Button from "./Button"; // Reusable Button component

const BannerUpload = ({ title, dimension }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage({ file, url: URL.createObjectURL(file) });
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-2">{dimension}</p>
      <label className="block w-full max-w-xs">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
      </label>
      {image && (
        <div className="flex items-center justify-between mt-3 bg-gray-50 p-2 rounded-lg">
          <img
            src={image.url}
            alt="Uploaded"
            className="h-20 w-20 rounded-md object-cover"
          />
          {/* Reusable Button component for removing the image */}
          <Button
            onClick={removeImage}
            className="bg-red-500 hover:bg-red-600 rounded-full p-2"
          >
            ✕
          </Button>
        </div>
      )}
    </div>
  );
};

export default BannerUpload;