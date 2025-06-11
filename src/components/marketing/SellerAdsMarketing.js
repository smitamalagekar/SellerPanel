import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, CreditCard, DollarSign, Filter, 
  Search, X, AlertCircle, 
  Menu, Clock, BarChart2 
} from 'lucide-react';

const SellerAdsMarketing = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateAdModal, setShowCreateAdModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(50);
  const [credits, setCredits] = useState(150);
  const [ads, setAds] = useState([]);
  const [formData, setFormData] = useState({
    product: '',
    budget: '',
    duration: 7,
    target_location: '',
    target_audience: 'all',
    payment_method: 'credit'
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const mockAds = [
      {
        id: 1,
        product: 'Wireless Headphones',
        image: 'https://via.placeholder.com/80',
        status: 'active',
        clicks: 245,
        impressions: 1200,
        cost: 75,
        start_date: '2023-05-15',
        end_date: '2023-06-15'
      },
      {
        id: 2,
        product: 'Smart Watch Pro',
        image: 'https://via.placeholder.com/80',
        status: 'pending',
        clicks: 0,
        impressions: 0,
        cost: 50,
        start_date: '2023-06-01',
        end_date: '2023-06-08'
      },
      {
        id: 3,
        product: 'Bluetooth Speaker',
        image: 'https://via.placeholder.com/80',
        status: 'completed',
        clicks: 520,
        impressions: 3000,
        cost: 120,
        start_date: '2023-04-10',
        end_date: '2023-05-10'
      }
    ];
    setAds(mockAds);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateAd = (e) => {
    e.preventDefault();
    if (!formData.product || !formData.budget) {
      alert('Please fill all required fields');
      return;
    }

    if (formData.payment_method === 'new' && credits < formData.budget) {
      alert('Not enough credits. Please purchase more.');
      return;
    }

    const newAd = {
      id: ads.length + 1,
      product: formData.product,
      image: 'https://via.placeholder.com/80',
      status: 'pending',
      clicks: 0,
      impressions: 0,
      cost: formData.budget,
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + formData.duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setAds([...ads, newAd]);
    
    if (formData.payment_method === 'credit') {
      setCredits(credits - formData.budget);
    }

    setShowCreateAdModal(false);
    setFormData({
      product: '',
      budget: '',
      duration: 7,
      target_location: '',
      target_audience: 'all',
      payment_method: 'credit'
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setCredits(credits + parseInt(paymentAmount));
    setShowPaymentModal(false);
    setPaymentAmount(50);
  };

  const filteredAds = ads.filter(ad => 
    activeTab === 'all' ? true : ad.status === activeTab
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const isMobile = windowWidth < 768;
  const isDesktop = windowWidth >= 1024;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-lg font-bold text-gray-800">Ads Marketing</h1>
            <div className="w-8"></div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="w-full flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          {(isMobileMenuOpen || !isMobile) && (
            <div className={`${isMobile ? 'w-full mb-4' : 'w-72 flex-shrink-0'}`}>
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
                <div className="space-y-4">
                  {isMobile && (
                    <div className="flex justify-between items-center pb-4 border-b">
                      <h2 className="text-lg font-semibold">Menu</h2>
                      <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-1 hover:bg-gray-100 rounded-md"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => {
                      setShowPaymentModal(true);
                      if (isMobile) setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    <CreditCard size={18} className="mr-2" />
                    Buy Credits
                  </button>
                  
                  <button 
                    onClick={() => {
                      setShowCreateAdModal(true);
                      if (isMobile) setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <Plus size={18} className="mr-2" />
                    Create New Ad
                  </button>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-500">Your Credits</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        ${credits} USD
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-3xl font-bold text-gray-900">{credits}</p>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Spent: $175</span>
                        <span>Active: 2 ads</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Credits Info - Mobile Only */}
            {isMobile && !isMobileMenuOpen && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-medium text-blue-800">Available Credits</p>
                    <p className="text-lg font-bold text-blue-600">{credits}</p>
                  </div>
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Credits
                  </button>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="flex overflow-x-auto">
                {['all', 'active', 'pending', 'completed'].map((tab) => (
                  <button
                    key={tab}
                    className={`flex-shrink-0 px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                      activeTab === tab 
                        ? 'text-blue-600 border-blue-600' 
                        : 'text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab} ({ads.filter(ad => tab === 'all' ? true : ad.status === tab).length})
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                 
                  <input
                    type="text"
                    placeholder="Search ads..."
                    className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  
                  <select className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                    <option>Sort</option>
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Highest Budget</option>
                    <option>Lowest Budget</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ads List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {filteredAds.length > 0 ? (
                <>
                  {/* Desktop Table */}
                  {!isMobile && (
                    <div className="hidden sm:block">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAds.map((ad) => (
                              <tr key={ad.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <img className="h-10 w-10 rounded" src={ad.image} alt={ad.product} />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{ad.product}</div>
                                      <div className="text-xs text-gray-500">ID: {ad.id}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ad.status)}`}>
                                    {ad.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm">
                                    <div className="flex items-center">
                                      <BarChart2 size={14} className="mr-2 text-gray-400" />
                                      <span className="font-medium">{ad.clicks}</span> clicks
                                    </div>
                                    <div className="flex items-center mt-1">
                                      <Clock size={14} className="mr-2 text-gray-400" />
                                      <span className="font-medium">{ad.impressions}</span> views
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  ${ad.cost}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm">
                                    <div>{ad.start_date}</div>
                                    <div className="text-xs text-gray-400">to</div>
                                    <div>{ad.end_date}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <Link 
                                    to={`/marketing/ads/${ad.id}`} 
                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                  >
                                    View
                                  </Link>
                                  {ad.status === 'pending' && (
                                    <button className="text-red-600 hover:text-red-900">
                                      Cancel
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Mobile Cards */}
                  {isMobile && (
                    <div className="sm:hidden divide-y divide-gray-200">
                      {filteredAds.map((ad) => (
                        <div key={ad.id} className="p-4 hover:bg-gray-50">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <img className="h-12 w-12 rounded" src={ad.image} alt={ad.product} />
                              <div>
                                <h3 className="text-sm font-medium text-gray-900">{ad.product}</h3>
                                <span className={`mt-1 inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(ad.status)}`}>
                                  {ad.status}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">${ad.cost}</p>
                              <p className="text-xs text-gray-500">{ad.duration} days</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-3 text-center">
                            <div className="bg-gray-50 p-2 rounded">
                              <p className="text-xs text-gray-500">Clicks</p>
                              <p className="text-sm font-medium">{ad.clicks}</p>
                            </div>
                            <div className="bg-gray-50 p-2 rounded">
                              <p className="text-xs text-gray-500">Views</p>
                              <p className="text-sm font-medium">{ad.impressions}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex justify-between">
                            <Link 
                              to={`/marketing/ads/${ad.id}`} 
                              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                              View Details
                            </Link>
                            {ad.status === 'pending' && (
                              <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                    <AlertCircle size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No ads found</h3>
                  <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                    {activeTab === 'all' 
                      ? "You haven't created any ads yet." 
                      : `You don't have any ${activeTab} ads.`}
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => setShowCreateAdModal(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <Plus size={16} className="mr-2" />
                      Create New Ad
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Ad Modal */}
      {showCreateAdModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Ad</h3>
              <button 
                onClick={() => setShowCreateAdModal(false)} 
                className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateAd} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product *</label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    required
                  >
                    <option value="">Select Product</option>
                    <option value="Wireless Headphones">Wireless Headphones</option>
                    <option value="Smart Watch Pro">Smart Watch Pro</option>
                    <option value="Bluetooth Speaker">Bluetooth Speaker</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget *</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      </div>
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        min="10"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 py-2 sm:text-sm border border-gray-300 rounded-md"
                        placeholder="50"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="30">30 days</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Location</label>
                  <input
                    type="text"
                    name="target_location"
                    value={formData.target_location}
                    onChange={handleInputChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md py-2 px-3"
                    placeholder="All locations"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                  <select
                    name="target_audience"
                    value={formData.target_audience}
                    onChange={handleInputChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Customers</option>
                    <option value="new">New Customers</option>
                    <option value="returning">Returning Customers</option>
                  </select>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Payment Method</h4>
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="radio"
                        name="payment_method"
                        value="credit"
                        checked={formData.payment_method === 'credit'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 mt-0.5"
                      />
                      <div>
                        <span className="block text-sm text-gray-700">
                          Use Advertising Credits
                        </span>
                        <span className="block text-xs text-gray-500 mt-1">
                          Current balance: {credits} credits
                        </span>
                      </div>
                    </label>
                    <label className="flex items-start space-x-3">
                      <input
                        type="radio"
                        name="payment_method"
                        value="new"
                        checked={formData.payment_method === 'new'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 mt-0.5"
                      />
                      <div>
                        <span className="block text-sm text-gray-700">
                          Pay with new payment
                        </span>
                        <span className="block text-xs text-gray-500 mt-1">
                          Credit card or PayPal
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateAdModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formData.payment_method === 'credit' && parseInt(formData.budget) > credits}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    formData.payment_method === 'credit' && parseInt(formData.budget) > credits 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Create Ad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">Buy Credits</h3>
              <button 
                onClick={() => setShowPaymentModal(false)} 
                className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handlePayment} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[10, 25, 50, 100].map((amount) => (
                      <button
                        type="button"
                        key={amount}
                        onClick={() => setPaymentAmount(amount)}
                        className={`py-2 text-sm font-medium rounded-md border transition-colors ${
                          paymentAmount === amount 
                            ? 'bg-blue-50 border-blue-500 text-blue-700' 
                            : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      </div>
                      <input
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        min="5"
                        step="5"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 py-2 sm:text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>Credit/Debit Card</option>
                    <option>PayPal</option>
                    <option>Bank Transfer</option>
                  </select>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">${paymentAmount}</span>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-600">Credits:</span>
                    <span className="font-medium">{paymentAmount}</span>
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between text-sm font-medium">
                    <span>Total:</span>
                    <span>${paymentAmount}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
                >
                  <DollarSign size={16} className="mr-2" />
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerAdsMarketing;