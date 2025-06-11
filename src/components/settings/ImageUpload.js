import { useState } from "react";

function ImageUpload(initialGroups = [{ images: [] }], maxGroups = 3) {
  const [imageGroups, setImageGroups] = useState(initialGroups);

  const handleImageUpload = (event, groupIndex) => { 
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file, 
      url: URL.createObjectURL(file),
    }));
    setImageGroups((prev) => {
      const newGroups = [...prev];
      newGroups[groupIndex] = {
        ...newGroups[groupIndex],
        images: [...newGroups[groupIndex].images, ...newImages],
      };
      return newGroups;
    });
  };

  const removeImage = (groupIndex, imageIndex) => {
    setImageGroups((prev) => {
      const newGroups = [...prev];
      newGroups[groupIndex] = {
        ...newGroups[groupIndex],
        images: newGroups[groupIndex].images.filter((_, i) => i !== imageIndex),
      };
      return newGroups;
    });
  };

  const addNewGroup = () => {
    if (imageGroups.length < maxGroups) {
      setImageGroups((prev) => [...prev, { images: [] }]);
    } else {
      alert(`Maximum of ${maxGroups} groups allowed.`);
    }
  };

  const removeGroup = (groupIndex) => {
    setImageGroups((prev) => prev.filter((_, i) => i !== groupIndex));
  };

  return {
    imageGroups,
    handleImageUpload,
    removeImage,
    addNewGroup,
    removeGroup,
  };
}

export default ImageUpload;