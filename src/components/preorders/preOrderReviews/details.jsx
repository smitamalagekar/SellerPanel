import React, { useState, useEffect } from "react";

const ReviewDetails = () => {
  const [activeTab, setActiveTab] = useState("reviews");

  // eslint-disable-next-line no-unused-vars
  const [isPublished, setIsPublished] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-2xl shadow-lg mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl md:text-2xl text-gray-800">Detailed Reviews</h2>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          {["reviews", "customReviews"].map((tab, idx) => (
            <button
              key={tab}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ease-in-out ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab === "reviews" ? "Reviews (1)" : "Custom Reviews (0)"}
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      {isLoading ? (
        <div className="flex items-center gap-5 mb-6 bg-gray-50 p-4 rounded-lg animate-pulse">
          <div className="w-24 h-24 rounded-lg bg-gray-300"></div>
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-5 mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt_2CbogDKB0QPLB2m-rRnMC_e3U9mxkCA-A&s"
            alt="Acer Nitro 50"
            className="w-24 h-24 object-cover rounded-lg border"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Acer Nitro 50 N50-620-UA91 Gaming Desktop
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-medium text-sm text-gray-600">Rating:</span>
              <span className="text-yellow-500 font-bold text-lg">5</span>
              <div className="text-yellow-400">★★★★★</div>
            </div>
          </div>
        </div>
      )}

      {/* Review Table */}
      {activeTab === "reviews" && (
        <>
          {isLoading ? (
            <div className="space-y-4">
              {[1].map((_, i) => (
                <div key={i} className="bg-gray-100 p-4 rounded-lg animate-pulse space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Desktop Header */}
              <div className="hidden md:grid grid-cols-5 gap-4 font-semibold text-gray-600 border-b pb-2">
                <span>#</span>
                <span>Customer</span>
                <span>Rating</span>
                <span className="col-span-1">Comment</span>
                <span className="text-right">Status</span>
              </div>

              {/* Review Row */}
              <div className="border-b py-4">
                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-5 gap-4 items-start text-gray-800">
                  <span className="font-medium">1</span>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHETb8j9F4mCB9OVZFCMMfyqUpRwRRZJ8wyw&s"
                      alt="Reviewer"
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <span className="font-medium">Paul K. Jensen</span>
                  </div>
                  <span className="ml-4 font-semibold text-yellow-500">5</span>
                  <div className="col-span-1 text-sm text-gray-700 leading-relaxed">
                    This laptop has been a lifesaver! The performance is quick,
                    especially with multitasking, and the display quality is stunning.
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>10 November, 2024</span>
                    <div
                      className={`flex items-center justify-center rounded-md ${
                        isPublished ? "bg-green-500" : "bg-red-500"
                      } min-w-[90px] h-6`}
                    >
                      <span className="text-white font-semibold px-2">
                        {isPublished ? "Published" : "Unpublished"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden flex flex-col gap-3 mt-3 bg-gray-50 p-4 rounded-lg shadow">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHETb8j9F4mCB9OVZFCMMfyqUpRwRRZJ8wyw&s"
                      alt="Reviewer"
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <div className="font-medium text-gray-800">Paul K. Jensen</div>
                      <div className="text-yellow-500 font-semibold">Rating: 5</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    This laptop has been a lifesaver! The performance is quick, especially
                    with multitasking, and the display quality is stunning.
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 items-center">
                    <span>10 November, 2024</span>
                    <div
                      className={`flex items-center justify-center rounded-md ${
                        isPublished ? "bg-green-500" : "bg-red-500"
                      } min-w-[90px] h-6`}
                    >
                      <span className="text-white font-semibold px-2">
                        {isPublished ? "Published" : "Unpublished"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Custom Reviews Tab */}
      {activeTab === "customReviews" && !isLoading && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-sm italic">Nothing found</p>
        </div>
      )}
    </div>
  );
};

export default ReviewDetails;
