import React from "react";
import BannerUpload from "./BannerUpload";


const TodaysDeals = () => {
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
      <div className="mt-4">
        <label className="block mb-2 font-medium">
          Products background color
        </label>
        <input
          type="text"
          placeholder="#FFBA00"
          className="border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2 font-medium">
          Today's Deal Banner Text Color
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="textColor"
              value="light"
              className="mr-2"
            />{" "}
            Light
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="textColor"
              value="dark"
              className="mr-2"
            />{" "}
            Dark
          </label>
        </div>
      </div>
    </div>
   </>
  );
};

export default TodaysDeals;
