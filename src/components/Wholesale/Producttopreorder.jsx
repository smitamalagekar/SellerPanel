import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MoreProductsToPreorder = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data (though this component might not fetch initial data)
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted');
        handleCloseModal();
    };

    return (
        <div className="w-full max-w-xl mx-auto border border-gray-300 rounded-md p-4 mt-4">
            <h2 className="text-lg font-semibold mb-3">
                {loading ? <Skeleton width={250} /> : 'More Products to Preorder'}
            </h2>
            <div className="border-b border-gray-200 my-3"></div>
            <div className="text-sm text-gray-700 mb-4">
                {loading ? (
                    <>
                        <Skeleton width={300} />
                        <Skeleton width={250} />
                    </>
                ) : (
                    'This is a customised section in product description page where you can select end category or selected products as More Products to Preorder.'
                )}
            </div>
            <h3 className="text-md font-semibold mb-2">
                {loading ? <Skeleton width={200} /> : 'Select Pre Order Products'}
            </h3>
            <button
                className={`w-full border-2 border-dashed border-gray-300 rounded-md py-4 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 flex justify-center items-center ${loading ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={handleOpenModal}
                disabled={loading}
            >
                {loading ? <Skeleton width={80} /> : <><span className="mr-2">+</span> Add More</>}
            </button>

            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-md shadow-lg p-6 relative w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Add Pre Order Products</h3>
                            <div className="border-b border-gray-600 my-3"></div>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="border-b border-gray-300 my-3"></div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-9 mb-6">
                                <div>
                                    <label htmlFor="category" className="block text-gray-700 text-sm md:text-md font-bold mb-3">
                                        Choose Category
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="category"
                                            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 rounded shadow leading-tight focus:outline-none focus:shadow-outline py-3 px-4 pr-8 text-sm md:text-md"
                                        >
                                            <option className="py-1">Choose Category</option>
                                            <option className="py-1">Category 1</option>
                                            <option className="py-1">Category 2</option>
                                            {/* Add more options as needed */}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                            <svg className="fill-current h-4 w-4 md:h-5 md:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="productName" className="block text-gray-700 text-sm md:text-md font-bold mb-3">
                                        Search by Product Name
                                    </label>
                                    <input
                                        type="text"
                                        id="productName"
                                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm md:text-md"
                                        placeholder="Search by Product Name"
                                    />
                                </div>
                            </div>
                            <div className="border-b border-gray-300 my-3"></div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-sm md:text-md"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MoreProductsToPreorder;