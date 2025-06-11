import React from 'react';
import ImageUpload from './ImageUpload';
import ImageUploadGroup from "./useImageUploadGroup";

function NewestPreorderProducts() {
  const {
    imageGroups,
    handleImageUpload,
    removeImage,

  } = ImageUpload([{ images: [] }]);

  const handleSave = () => {
    console.log('Saved data:', imageGroups);
    alert('Data saved successfully!');
  };

  return (
    <>
    <div className="p-4 max-w-2xl mx-auto bg-gray-50 rounded-lg shadow-sm border border-gray-100">
    <h4 className="text-base font-medium text-gray-700 mb-1">Banner</h4>
    
    {imageGroups.map((group, groupIndex) => (
      <ImageUploadGroup
        key={groupIndex}
        group={group}
        groupIndex={groupIndex}
        onImageUpload={handleImageUpload}
        onRemoveImage={removeImage}
      />
    ))}

    <div className="flex justify-center mt-4 space-x-3">
      <button
        onClick={handleSave}
        className="text-white bg-green-500 hover:bg-green-600 rounded-md py-1.5 px-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Save
      </button>
    </div>
  </div>
</>  );
}

export default NewestPreorderProducts;