// import { Delete } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { MdCancel } from 'react-icons/md';
import apiInstance from '../utils/axios';

function BannerSettings() {
  const [topBannerImage, setTopBannerImage] = useState(null);
  const [topBannerLink, setTopBannerLink] = useState('');
  const [sliderBanners, setSliderBanners] = useState([{ image: null, link: '' }]);
  const [bannerFullWidth1, setBannerFullWidth1] = useState(null);
  const [bannerFullWidth1Link, setBannerFullWidth1Link] = useState('');
  const [bannerFullWidth2, setBannerFullWidth2] = useState(null);
  const [bannerFullWidth2Link, setBannerFullWidth2Link] = useState('');
  const [bannerFullWidth3, setBannerFullWidth3] = useState(null);
  const [bannerFullWidth3Link, setBannerFullWidth3Link] = useState('');


const [showFullWidth1Input, setShowFullWidth1Input] = useState(true);
const [showFullWidth2Input, setShowFullWidth2Input] = useState(true);
const [showFullWidth3Input, setShowFullWidth3Input] = useState(true);


  const fullWidthBannerStates = {
  1: {
    banner: bannerFullWidth1,
    show: showFullWidth1Input,
    link: bannerFullWidth1Link,
    setBanner: setBannerFullWidth1,
    setShow: setShowFullWidth1Input,
    setLink: setBannerFullWidth1Link,
  },
  2: {
    banner: bannerFullWidth2,
    show: showFullWidth2Input,
    link: bannerFullWidth2Link,
    setBanner: setBannerFullWidth2,
    setShow: setShowFullWidth2Input,
    setLink: setBannerFullWidth2Link,
  },
  3: {
    banner: bannerFullWidth3,
    show: showFullWidth3Input,
    link: bannerFullWidth3Link,
    setBanner: setBannerFullWidth3,
    setShow: setShowFullWidth3Input,
    setLink: setBannerFullWidth3Link,
  },
};




  const handleTopBannerChange = (event) => {
    const file = event.target.files[0];
    setTopBannerImage(file);
  };

  const handleSliderBannerChange = (index, event) => {
    const file = event.target.files[0];
    const newSliderBanners = [...sliderBanners];
    newSliderBanners[index] = { ...newSliderBanners[index], image: file };
    setSliderBanners(newSliderBanners);
  };

  const handleSliderLinkChange = (index, event) => {
    const { value } = event.target;
    const newSliderBanners = [...sliderBanners];
    newSliderBanners[index] = { ...newSliderBanners[index], link: value };
    setSliderBanners(newSliderBanners);
  };

  const handleAddSliderBanner = () => {
    setSliderBanners([...sliderBanners, { image: null, link: '' }]);
  };

  const handleRemoveSliderBanner = (index) => {
    const newSliderBanners = sliderBanners.filter((_, i) => i !== index);
    setSliderBanners(newSliderBanners);
  };

  const handleFullWidthBannerChange = (setter) => (event) => {
    const file = event.target.files[0];
    setter(file);
  };

  const handleCancelFullWidth = (setter, setShowInput, setLink) => () => {
    setter(null);
    setShowInput(false);
    setLink('');
  };

  const handleOpenFullWidthInput = (setShowInput) => () => {
    setShowInput(true);
  };

  const handleFullWidthLinkChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const [socialMediaPlatforms, setSocialMediaPlatforms] = useState([]);
  // const [bannerData, setBannerData] = useState({});

  useEffect(() => {
    const fetchBannerSettings = async () => {
      try {
        const response = await apiInstance.get('/banner-setting');
        const data = response.data?.data?.[0]; // assuming the backend returns an array

        if (data) {
          const linksObj = data.socialLinks || {}; // Ensure socialLinks is an object
          const linksArray = Object.entries(linksObj).map(([key, value]) => ({
            name: key,
            content: value,
          }));
          setSocialMediaPlatforms(linksArray);
          // setBannerData(data); // optional
        } else {
          setSocialMediaPlatforms([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching banner settings:", error);
        setSocialMediaPlatforms([]); // Fallback to an empty array in case of error
      }
    };

    fetchBannerSettings();
  }, []);

  const handleSocialMediaChange = (index, value) => {
    const updatedPlatforms = [...socialMediaPlatforms];
    updatedPlatforms[index].content = value;
    setSocialMediaPlatforms(updatedPlatforms);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      // Add top banner
      if (topBannerImage) {
        formData.append('topBanner', topBannerImage);
      }
      formData.append('topBanner.link', topBannerLink);

      // Add slider banners
      sliderBanners.forEach((banner, index) => {
        if (banner.image) {
          formData.append('sliderBanners[]', banner.image);
        }
        formData.append(`sliderBanners[${index}].link`, banner.link);
      });

      // Add full width banners
      if (bannerFullWidth1) {
        formData.append('fullWidth1', bannerFullWidth1);
      }
      formData.append('fullWidth1.link', bannerFullWidth1Link);

      if (bannerFullWidth2) {
        formData.append('fullWidth2', bannerFullWidth2);
      }
      formData.append('fullWidth2.link', bannerFullWidth2Link);

      if (bannerFullWidth3) {
        formData.append('fullWidth3', bannerFullWidth3);
      }
      formData.append('fullWidth3.link', bannerFullWidth3Link);

      // Add social links
      socialMediaPlatforms.forEach((platform) => {
        formData.append(`socialLinks.${platform.name}`, platform.content);
      });

      const response = await apiInstance.post('/banner-setting/create', formData);

      if (response.status === 200) {
        alert(response.data.message);
        // Optionally refresh or update state with the returned data
      } else {
        throw new Error(response.data.message || 'Failed to save banner settings');
      }
    } catch (error) {
      console.error('Error saving banner settings:', error);
      alert(error.message);
    }
  };

  return (
    <div className="p-8 bg-gray-50 rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold text-[#2d254c] mb-6">Banner Settings</h1>

      {/* Top Banner */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-4">
        <label className="text-lg font-medium text-gray-700 md:col-span-2 self-center">Top Banner (1920x300)</label>
        <div className="md:col-span-10 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-start mb-4">
            <div className="flex items-center mb-2 md:mb-0 md:mr-4">
              <label className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-300">
                Browse
                <input type="file" className="hidden" onChange={handleTopBannerChange} />
              </label>
              <span className="ml-2 text-gray-600">{topBannerImage ? 'File selected' : 'No file selected'}</span>
            </div>
            {topBannerImage && (
              <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(topBannerImage)}
                    alt="Banner Preview"
                    className="max-w-[100px] max-h-[100px] rounded-lg"
                  />
                  <button
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => setTopBannerImage(null)}
                  >
                    x
                  </button>
                </div>
                <span className="ml-2 text-gray-600">{topBannerImage.name}</span>
              </div>
            )}
            <input
              type="text"
              placeholder="https://localhost/ecommerce_demo/search?sort_bynewest"
              className="border border-gray-300 rounded p-2 flex-grow mt-2 md:mt-0"
              value={topBannerLink}
              onChange={(e) => setTopBannerLink(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Width and height dimensions should match the banner's original dimensions.
          </p>
        </div>
      </div>

      {/* Slider Banners */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-[#2d254c] mb-4">Slider Banners (1500x450)</h3>
        {sliderBanners.map((banner, index) => (
          <div key={index} className="mb-4 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-10 bg-white p-4 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row items-start mb-4">
                <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                  <label className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-300">
                    Browse
                    <input type="file" className="hidden" onChange={(e) => handleSliderBannerChange(index, e)} />
                  </label>
                  <span className="ml-2 text-gray-600">{banner.image ? 'File selected' : 'No file selected'}</span>
                </div>
                {banner.image && (
                  <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(banner.image)}
                        alt="Banner Preview"
                        className="max-w-[100px] max-h-[100px] rounded-lg"
                      />
                      <button
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        onClick={() => handleRemoveSliderBanner(index)}
                      >
                        x
                      </button>
                    </div>
                    <span className="ml-2 text-gray-600">{banner.image.name}</span>
                  </div>
                )}
                <input
                  type="text"
                  placeholder="https://localhost/ecommerce_demo/search?sort_bynewest"
                  className="border border-gray-300 rounded p-2 flex-grow mt-2 md:mt-0"
                  value={banner.link}
                  onChange={(e) => handleSliderLinkChange(index, e)}
                />
                {sliderBanners.length > 1 && (
                  <button className="ml-2 text-red-500 p-2 mt-2 rounded" onClick={() => handleRemoveSliderBanner(index)}>
                    <MdCancel />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <button
          className="flex items-center text-blue-500 bg-white border border-dashed border-gray-400 rounded py-2 px-4 hover:bg-blue-100"
          onClick={handleAddSliderBanner}
        >
          <span className="mr-1">+</span> Add New
        </button>
      </div>

      {/* Social Media Links Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-[#2d254c] mb-4">Social Media Links</h3>
        {socialMediaPlatforms.map((platform, index) => (
          <div key={platform.name} className="mb-4 grid grid-cols-1 md:grid-cols-12 gap-4">
            <label className="text-lg font-medium text-gray-700 md:col-span-2 self-center">{platform.name}</label>
            <div className="md:col-span-10 bg-white p-4 rounded-lg shadow-md">
              <input
                type="text"
                placeholder={platform.placeholder}
                className="border border-gray-300 rounded p-2 w-full"
                value={platform.content}
                onChange={(e) => handleSocialMediaChange(index, e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Social media URLs should start with "https://".
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Full Width Banners */}
      {[1, 2, 3].map((num) => {
        // const banner = eval(`bannerFullWidth${num}`);
        // const show = eval(`showFullWidth${num}Input`);
        // const link = eval(`bannerFullWidth${num}Link`);
        // const setBanner = eval(`setBannerFullWidth${num}`);
        // const setShow = eval(`setShowFullWidth${num}Input`);
        // const setLink = eval(`setBannerFullWidth${num}Link`);
        const { banner, link, show, setBanner, setLink, setShow } = fullWidthBannerStates[num];
        return (
          <div key={num} className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-4">
            <label className="text-lg font-medium text-gray-700 md:col-span-2 self-center">
              Full Width Banner {num} (1920x300)
            </label>
            <div className="md:col-span-10 bg-white p-4 rounded-lg shadow-md">
              {banner && !show && (
                <div className="flex flex-col md:flex-row items-start mb-4">
                  <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(banner)}
                        alt={`Full Width Banner ${num}`}
                        className="max-w-[100px] max-h-[100px] rounded-lg"
                      />
                    </div>
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      onClick={handleCancelFullWidth(setBanner, setShow, setLink)}
                    >
                      x
                    </button>
                    <span className="ml-2 text-gray-600">{banner.name}</span>
                  </div>
                  <input
                    type="text"
                    placeholder="https://localhost/ecommerce_demo/search?sort_bynewest"
                    className="border border-gray-300 rounded p-2 flex-grow mt-2 md:mt-0"
                    value={link}
                    onChange={handleFullWidthLinkChange(setLink)}
                  />
                </div>
              )}
              {!banner && (
                <div className="flex flex-col md:flex-row items-start">
                  <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                    <label
                      className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-300"
                      onClick={handleOpenFullWidthInput(setShow)}
                    >
                      Browse
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFullWidthBannerChange(setBanner)}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div className="mt-6 text-end">
        <button
          onClick={handleSave}
          className="text-white bg-[#2d254c]  hover:bg-blue-600 py-2 px-6 rounded-lg transition duration-300"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default BannerSettings;