import React from 'react';
import InfoBox from './InfoBox'; // Reusable InfoBox component
import Button from './Button'; // Reusable Button component
import ImageUpload from './ImageUpload'; // Reusable hook for image upload logic
import ImageUploadGroup from './useImageUploadGroup';

// Main BannerLevel2 Component
function BannerLevel2() {
  // Use the ImageUpload hook with a maximum of 3 groups
  const {
    imageGroups,
    handleImageUpload,
    removeImage,
    addNewGroup,
    removeGroup,
  } = ImageUpload([{ images: [] }], 3);

  const handleSave = () => {
    console.log('Saved data:', imageGroups);
    alert('Data saved successfully!');
  };

  return (
    <>
      {/* Reusable InfoBox component */}
      <InfoBox
        title="Banner & Links (Max 3)"
        description="Minimum dimensions required: 137px width X 420px height."
      />

      <div className="p-4 max-w-2xl mx-auto bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        {/* Map through imageGroups and render ImageUploadGroup for each group */}
        {imageGroups.map((group, groupIndex) => (
          <ImageUploadGroup
            key={groupIndex}
            group={group}
            groupIndex={groupIndex}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
            onRemoveGroup={removeGroup} // Pass the removeGroup function
          />
        ))}

        {/* Buttons for adding a new group and saving */}
        <div className="flex justify-center mt-4 space-x-3">
          {/* Reusable Button component for adding a new group */}
          <Button
            onClick={addNewGroup}
            className="bg-blue-500 hover:bg-blue-600 focus:ring-blue-400"
          >
            Add New Group
          </Button>

          {/* Reusable Button component for saving */}
          <Button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 focus:ring-green-400"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}

export default BannerLevel2;