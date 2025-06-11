import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Bell, X, Image as ImageIcon } from 'lucide-react';
import CustomAlertService from '../../../services/customAlertService';

const EditCustomAlert = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    alertSize: 'large',
    image: '',
    link: '',
    text: '',
    backgroundColor: '#000000',
    textColor: 'Light',
    buttonText: '',
    buttonColor: '#FFFFFF'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlert(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image dimensions based on alert size
      const img = new Image();
      img.onload = () => {
        // const requiredWidth = alert.alertSize === 'large' ? 300 : 120;
        // const requiredHeight = alert.alertSize === 'large' ? 160 : 140;
        
        // if (img.width !== requiredWidth || img.height !== requiredHeight) {
        //   setError(`Image must be exactly ${requiredWidth}px × ${requiredHeight}px`);
        //   return;
        // }
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setAlert(prev => ({
            ...prev,
            image: file,
            imagePreview: reader.result,
          }));
          setError('');
        };
        reader.readAsDataURL(file);
      };
      img.src = URL.createObjectURL(file);
    }
  };
  
  const removeImage = () => {
    setAlert(prev => ({
      ...prev,
      image: '',
      imagePreview: ''
    }));
  };
  
// Replace your useEffect with this:
useEffect(() => {
  const fetchAlert = async () => {
    try {
      setIsLoading(true);
      const data = await CustomAlertService.getAlertById(id);
      setAlert({
        ...data,
        imagePreview: data.image // Set the existing image URL as preview
      });
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  fetchAlert();
}, [id]);

// Replace your handleSubmit with this:
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    const formData = {
      alertSize: alert.alertSize,
      link: alert.link,
      text: alert.text,
      backgroundColor: alert.backgroundColor,
      textColor: alert.textColor,
      buttonText: alert.buttonText,
      buttonColor: alert.buttonColor,
      image: alert.image instanceof File ? alert.image : undefined
    };

    await CustomAlertService.updateAlert(id, formData);
    setIsSaved(true);
    setTimeout(() => {
      navigate('/marketing/custom-alert-popup');
    }, 1500);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

  if (isLoading && !alert.image) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/marketing/custom-alert-popup" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Edit Custom Alert #{id}</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Custom Alert Information</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="alertSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Alert Size *
                  </label>
                  <select
                    name="alertSize"
                    id="alertSize"
                    value={alert.alertSize}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="small">Small</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                    Image * ({alert.alertSize === 'large' ? '300px × 160px' : '120px × 140px'})
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex flex-col items-center justify-center px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-600 cursor-pointer hover:bg-blue-50">
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <span className="flex items-center gap-2">
                        <ImageIcon size={16} />
                        Browse
                      </span>
                    </label>
                    {(alert.image || alert.imagePreview) && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>1 File selected</span>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  {(alert.imagePreview || alert.image) && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <img 
                          src={alert.imagePreview || alert.image} 
                          alt="Preview" 
                          className="h-10 w-auto object-cover rounded"
                        />
                        <span>custom_alert_{id}.webp</span>
                        <span className="text-gray-400">12 KB</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                  Link *
                </label>
                <input
                  type="url"
                  name="link"
                  id="link"
                  value={alert.link}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                  Text * (Best within 200 characters)
                </label>
                <textarea
                  name="text"
                  id="text"
                  rows={2}
                  value={alert.text}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  maxLength={200}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  {alert.text.length}/200 characters
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text * (Max 30 characters)
                </label>
                <input
                  type="text"
                  name="buttonText"
                  id="buttonText"
                  value={alert.buttonText}
                  onChange={handleChange}
                  maxLength={30}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="buttonColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Button Color *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="buttonColor"
                    id="buttonColor"
                    value={alert.buttonColor}
                    onChange={handleChange}
                    className="h-10 w-10 cursor-pointer rounded border border-gray-300"
                  />
                  <span className="text-sm text-gray-600">{alert.buttonColor}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Background Color *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="backgroundColor"
                    id="backgroundColor"
                    value={alert.backgroundColor}
                    onChange={handleChange}
                    className="h-10 w-10 cursor-pointer rounded border border-gray-300"
                  />
                  <span className="text-sm text-gray-600">{alert.backgroundColor}</span>
                </div>
              </div>

              <div>
                <label htmlFor="textColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Text Color *
                </label>
                <select
                  name="textColor"
                  id="textColor"
                  value={alert.textColor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Light">Light</option>
                  <option value="Dark">Dark</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
              <Link
                to="/marketing/custom-alert-popup"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              {isSaved && (
                <span className="text-green-600 text-sm flex items-center gap-1">
                  <Bell size={16} />
                  Changes saved successfully!
                </span>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isLoading ? (
                  'Saving...'
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomAlert;