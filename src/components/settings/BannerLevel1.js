import React from "react";
import InfoBox from "./InfoBox";
import Button from "./Button";
import ImageUpload from "./ImageUpload";
import ImageUploadGroup from "./useImageUploadGroup";

function BannerLevel1() {
  const {
    imageGroups,
    handleImageUpload,
    removeImage,
    addNewGroup,
    removeGroup,
  } = ImageUpload([{ images: [] }], 3); // Max 3 groups

  const handleSave = () => {
    console.log("Saved data:", imageGroups);
    alert("Data saved successfully!");
  };

  return (
    <>
      <InfoBox
        title="Banner & Links (Max 3)"
        description="Minimum dimensions required: 436px width X 436px height."
      />
      <div className="p-4 max-w-2xl mx-auto bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        {imageGroups.map((group, groupIndex) => (
          <ImageUploadGroup
            key={groupIndex}
            group={group}
            groupIndex={groupIndex}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
            onRemoveGroup={removeGroup}
          />
        ))}

        <div className="flex justify-center mt-4 space-x-3">
          <Button
            onClick={addNewGroup}
            className="bg-blue-500 hover:bg-blue-600 focus:ring-blue-400"
          >
            Add New Group
          </Button>
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

export default BannerLevel1;