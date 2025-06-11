import { useState } from 'react';
// Sample images (replace with your actual image paths)
import design1Image from './images/notification.png';
import design2Image from './images/notification.png';
import design3Image from './images/notification.png';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    onlytext: true,
    design1: false,
    design2: false,
    design3: false,
  });

  const handleChange = (e) => {
    const { name } = e.target;
    setSettings({
        onlytext: false,
        design1: false,
        design2: false,
        design3: false,
        [name]: true,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the settings to your backend
    console.log('Settings saved:', settings);
    alert('Notification settings saved successfully!');
  };

  const notificationGroups = [
    [
      {
        name: 'onlytext',
        title: 'Only Text',
        description: 'Order Code: 20220912-10085522 has been Delivered',
        image: null,
      },
      {
        name: 'design1',
        title: 'Design 1',
        description: 'Order Code: 20220912-10085522 has been Delivered',
        image: design1Image,
      }
    ],
    [
      {
        name: 'design2',
        title: 'Design 2',
        description: 'Order Code: 20220912-10085522 has been Delivered',
        image: design2Image,
      },
      {
        name: 'design3',
        title: 'Design 3',
        description: 'Order Code: 20220912-10085522 has been Delivered',
        image: design3Image,
      },
    ]
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Notification Settings</h1>
          <p className="text-sm text-gray-600 mt-1">You can add new types & upload image for every type. If you do not upload image or edit images from default types then default image will be shown.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notificationGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-4">
                {group.map((item) => (
                  <div 
                    key={item.name}
                    className="flex items-start justify-between p-4 border border-gray-200 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start">
                      {item.image && (
                        <div className="mr-4 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-10 h-10 object-contain border border-gray-200 rounded"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-gray-800">{item.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center h-5">
                      <input
                        id={item.name}
                        name={item.name}
                        type="checkbox"
                        checked={settings[item.name]}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationSettings;