import React from "react";
import ImageUpload from "./ImageUpload";
import InfoBox from "./InfoBox";
import Button from "./Button";
import ImageUploadGroup from "./useImageUploadGroup";

function AuctionBanner() {
  const { imageGroups, handleImageUpload, removeImage } = ImageUpload([
    { images: [] },
  ]);

  const handleSave = () => {
    console.log("Saved data:", imageGroups);
    alert("Data saved successfully!");
  };

  return (
    <>
      <InfoBox
        title="Auction Banner"
        description="Minimum dimensions required: 435px width X 485px height."
      />
      <div className="p-4 max-w-2xl mx-auto bg-gray-50 rounded-lg shadow-sm border border-gray-200">
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

export default AuctionBanner;
