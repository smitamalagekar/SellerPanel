import React from "react";
import BannerUpload from "./BannerUpload"; // Extracted BannerUpload component

const Classified = () => {
  return (
    <>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BannerUpload
            title="Large Banner (Will be shown on large devices)"
            dimension="Minimum dimensions required: 1370px width X 242px height."
          />
          <BannerUpload
            title="Small Banner (Will be shown on small devices)"
            dimension="Minimum dimensions required: 400px width X 200px height."
          />
        </div>
      </div>
    </>
  );
};

export default Classified;