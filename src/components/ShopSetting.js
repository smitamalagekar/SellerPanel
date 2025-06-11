
import React, { useState } from 'react';
import axios from 'axios';
import BannerSettings from './BannerSetting';


function ShopSettingsForm() {
  const [shopName, setShopName] = useState('Filon Asset Store');
  const [shopLogo, setShopLogo] = useState(null);
  const [shopPhone, setShopPhone] = useState('610-626-1915');
  const [shopAddress, setShopAddress] = useState('3475 Jody Road Philadelphia, PA 19108');
  const [metaTitle, setMetaTitle] = useState('Filon Asset Store');
  const [metaDescription, setMetaDescription] = useState(
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...'
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'shopName': setShopName(value); break;
      case 'shopPhone': setShopPhone(value); break;
      case 'shopAddress': setShopAddress(value); break;
      case 'metaTitle': setMetaTitle(value); break;
      case 'metaDescription': setMetaDescription(value); break;
      default: break;
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setShopLogo(file);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('shopName', shopName);
    formData.append('shopPhone', shopPhone);
    formData.append('shopAddress', shopAddress);
    formData.append('metaTitle', metaTitle);
    formData.append('metaDescription', metaDescription);
    if (shopLogo) formData.append('shopLogo', shopLogo);

    try {
      const response = await axios.post('https://e-commerce-backend-1-0.onrender.com/api/basicinfo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Settings saved:', response.data);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-md shadow-lg max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-semibold text-[#2d254c] border-b pb-4 mb-8">🛒 Shop Settings</h1>

      {/* Basic Info Section */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-xl font-semibold text-[#2d254c] mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Shop Name*" name="shopName" value={shopName} onChange={handleInputChange} />
          <Input label="Shop Phone*" name="shopPhone" value={shopPhone} onChange={handleInputChange} />
          <Input label="Shop Address*" name="shopAddress" value={shopAddress} onChange={handleInputChange} />
          <Input label="Meta Title*" name="metaTitle" value={metaTitle} onChange={handleInputChange} />

          {/* Logo Upload */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Shop Logo</label>
            <input 
              type="file" 
              onChange={handleLogoChange} 
              className="w-full border p-3 rounded-md bg-white shadow-sm"
            />
            {shopLogo && (
              <div className="mt-4 flex flex-col items-center">
                <p className="text-sm text-gray-600">{shopLogo.name}</p>
                <img
                  src={URL.createObjectURL(shopLogo)}
                  alt="Preview"
                  className="w-24 h-24 object-cover mt-2 rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Meta Description */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Meta Description</label>
            <textarea
              name="metaDescription"
              value={metaDescription}
              onChange={handleInputChange}
              rows="4"
              className="w-full border p-3 rounded-md shadow-sm"
              placeholder="Enter meta description..."
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            className="bg-[#2d254c] text-white py-2 px-8 rounded-md shadow-lg hover:bg-[#1a1a35] transition ease-in-out"
          >
            Save Settings
          </button>
        </div>
      </div>

      {/* Banner Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <BannerSettings />
      </div>

      {/* Social Media Links */}
      
    </div>
  );
}

// Reusable Input component
function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border p-3 rounded-md shadow-sm"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}

export default ShopSettingsForm;