import React from 'react'
import ImagePreview from './ImagePreview'

const useImageUploadGroup = ({ group, groupIndex, onImageUpload, onRemoveImage, onRemoveGroup }) => (
  <div className="mb-6 relative">
    {groupIndex > 0 && (
      <button
        onClick={() => onRemoveGroup(groupIndex)}
        className="absolute top-0 right-0 text-white bg-red-500 hover:bg-red-600 rounded-full p-1.5 transition-colors"
      >
        ✕
      </button>
    )}
    <label className="block w-full">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => onImageUpload(e, groupIndex)}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer transition-all"
      />
    </label>

    <div className="mt-3 space-y-3">
      {group.images.length > 0 ? (
        group.images.map((image, imageIndex) => (
          <ImagePreview
            key={imageIndex}
            image={image}
            onRemove={() => onRemoveImage(groupIndex, imageIndex)}
          />
        ))
      ) : (
        <div className="text-center text-gray-400 text-sm py-3 bg-white rounded-lg border border-gray-150">
          No images uploaded yet.
        </div>
      )}
    </div>
  </div>
);

export default useImageUploadGroup