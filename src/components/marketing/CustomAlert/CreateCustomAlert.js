import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Image as ImageIcon, X } from 'lucide-react';
import CustomAlertService from '../../../services/customAlertService';

const CreateCustomAlert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    alertSize: 'large',
    link: '',
    text: '',
    backgroundColor: '#000000',
    textColor: 'Light',
    image: null,
    imagePreview: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image dimensions based on alert size
      const img = new Image();
      img.onload = () => {
        // const requiredWidth = formData.alertSize === 'large' ? 300 : 120;
        // const requiredHeight = formData.alertSize === 'large' ? 160 : 140;
        
        // if (img.width >= requiredWidth || img.height >= requiredHeight) {
        //   setError(`Image must be exactly ${requiredWidth}px × ${requiredHeight}px`);
        //   return;
        // }

        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
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
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: ''
    }));
  };

// Replace your handleSubmit with this:
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    const alertData = {
      alertSize: formData.alertSize,
      link: formData.link,
      text: formData.text,
      backgroundColor: formData.backgroundColor,
      textColor: formData.textColor,
      image: formData.image
    };

    await CustomAlertService.createAlert(alertData);
    navigate('/marketing/custom-alert');
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/marketing/custom-alert" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Create Custom Alert</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="alertSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Alert Size *
                </label>
                <select
                  name="alertSize"
                  id="alertSize"
                  value={formData.alertSize}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="large">Large</option>
                  <option value="small">Small</option>
                </select>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Image * ({formData.alertSize === 'large' ? '300px × 160px' : '120px × 140px'})
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
                      required
                    />
                    <span className="flex items-center gap-2">
                      <ImageIcon size={16} />
                      Browse
                    </span>
                  </label>
                  {formData.image && (
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
                {formData.imagePreview && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <img 
                        src={formData.imagePreview} 
                        alt="Preview" 
                        className="h-10 w-auto object-cover rounded"
                      />
                      <span>{formData.image.name}</span>
                      <span className="text-gray-400">
                        {(formData.image.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  </div>
                )}
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
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="Type your text here"
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
                  value={formData.text}
                  onChange={handleChange}
                  placeholder="Type your text here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  maxLength={200}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.text.length}/200 characters
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Background Color *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="backgroundColor"
                    id="backgroundColor"
                    value={formData.backgroundColor}
                    onChange={handleChange}
                    className="h-10 w-10 cursor-pointer rounded border border-gray-300"
                  />
                  <span className="text-sm text-gray-600">{formData.backgroundColor}</span>
                </div>
              </div>

              <div>
                <label htmlFor="textColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Text Color *
                </label>
                <select
                  name="textColor"
                  id="textColor"
                  value={formData.textColor}
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
                to="/admin/custom-alerts"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isLoading ? (
                  'Creating...'
                ) : (
                  <>
                    <Save size={18} />
                    Create Alert
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

export default CreateCustomAlert;