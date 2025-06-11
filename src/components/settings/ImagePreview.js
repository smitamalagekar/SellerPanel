import React from 'react'

const ImagePreview = ({ image, onRemove }) => (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-xs border border-gray-150 hover:border-blue-200 transition-all">
      <div className="flex items-center gap-3 flex-1">
        <img
          src={image.url}
          alt="Uploaded"
          className="h-12 w-12 rounded-md object-cover border border-gray-150"
        />
      </div>
      <button
        onClick={onRemove}
        className="text-white bg-red-500 hover:bg-red-600 rounded-full p-1.5 ml-2 transition-colors"
      >
        ✕
      </button>
    </div>
  );

export default ImagePreview