import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductPriceDiscounts = () => {
    const [enablePrepayment, setEnablePrepayment] = useState(true);
    const [useCoupon, setUseCoupon] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, []);

    const handleTogglePrepayment = () => {
        setEnablePrepayment(!enablePrepayment);
    };

    const handleToggleCoupon = () => {
        setUseCoupon(!useCoupon);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 rounded-lg border mt-4 mr-4">
            <h2 className="text-lg font-semibold mb-4">
                {loading ? <Skeleton width={300} /> : 'Product Price & Discounts'}
            </h2>
            <div className="border-b border-gray-200 my-3"></div>

            {/* Price Section */}
            <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">
                    {loading ? <Skeleton width={80} /> : 'Price'}
                </h3>
                <div className="flex items-center gap-4">
                    <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700 w-1/3">
                        {loading ? <Skeleton width={100} /> : <>Unit price <span className="text-red-500">*</span></>}
                    </label>
                    {loading ? (
                        <Skeleton className="mt-1 w-2/3 h-10" />
                    ) : (
                        <input
                            type="number"
                            id="unitPrice"
                            className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-2/3 sm:text-sm border-gray-300 rounded-md"
                            defaultValue="0"
                            placeholder="Enter the price per unit. [e.g., '$49.99']"
                        />
                    )}
                </div>
            </div>

            {/* Prepayment Section */}
            <div className="mb-6 border-t border-gray-200 pt-6">
                <h3 className="text-md font-semibold mb-3">
                    {loading ? <Skeleton width={100} /> : 'Prepayment'}
                </h3>

                <div className="flex items-center justify-between mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                        {loading ? <Skeleton width={150} /> : 'Enable Prepayment'}
                    </label>
                    {loading ? (
                        <div className="w-11 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <Skeleton width={30} height={18} circle />
                        </div>
                    ) : (
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                checked={enablePrepayment}
                                onChange={handleTogglePrepayment}
                                disabled={loading}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
                        </label>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <label htmlFor="prepayAmount" className="block text-sm font-medium text-gray-700 w-1/3">
                        {loading ? <Skeleton width={120} /> : 'Prepay Amount'}
                    </label>
                    {loading ? (
                        <Skeleton className="mt-1 w-2/3 h-10" />
                    ) : (
                        <input
                            type="number"
                            id="prepayAmount"
                            className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-2/3 sm:text-sm border-gray-300 rounded-md"
                            defaultValue="0"
                            placeholder="Specify the required prepayment amount for pre-orders. [e.g., '$10.00']"
                            disabled={!enablePrepayment || loading}
                        />
                    )}
                </div>
            </div>

            {/* Discount Settings Section */}
            <div className="mb-6 border-t border-gray-200 pt-6">
                <h3 className="text-md font-semibold mb-2">
                    {loading ? <Skeleton width={150} /> : 'Discount Settings'}
                </h3>
                <div className="flex items-center gap-4">
                    <label htmlFor="discountDateRange" className="block text-sm font-medium text-gray-700 w-1/3">
                        {loading ? <Skeleton width={140} /> : 'Discount Date Range'}
                    </label>
                    {loading ? (
                        <Skeleton className="mt-1 w-2/3 h-10" />
                    ) : (
                        <input
                            type="text"
                            className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-2/3 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Select Date"
                            disabled={loading}
                        />
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-4">
                        <label htmlFor="discountAmount" className="block text-sm font-medium text-gray-700 w-1/3">
                            {loading ? <Skeleton width={80} /> : 'Discount'}
                        </label>
                        {loading ? (
                            <Skeleton className="w-2/3 h-10" />
                        ) : (
                            <input
                                type="number"
                                id="discountAmount"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-2/3 sm:text-sm border-gray-300 rounded-md"
                                defaultValue="0"
                                placeholder="Specify the discount percentage or amount. [e.g., '10%' or '$5.00']"
                                disabled={loading}
                            />
                        )}
                    </div>
                    <div>
                        <label htmlFor="discountType" className="block text-sm font-medium text-gray-700 w-1/3 md:hidden">
                            {loading ? <Skeleton width={80} /> : 'Type'}
                        </label>
                        <div className="relative">
                            {loading ? (
                                <Skeleton className="w-full h-10" />
                            ) : (
                                <select
                                    id="discountType"
                                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 rounded shadow leading-tight focus:outline-none focus:shadow-outline py-2 px-3 pr-8"
                                    disabled={loading}
                                >
                                    <option>Flat</option>
                                    <option>Percentage</option>
                                </select>
                            )}
                            {!loading && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Coupons Section */}
            <div className="mb-6 border-t border-gray-200 pt-6">
                <h3 className="text-md font-semibold mb-2">
                    {loading ? <Skeleton width={100} /> : 'Coupons'}
                </h3>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                        {loading ? <Skeleton width={200} /> : 'Use Coupon For This Product'}
                    </label>
                    {loading ? (
                        <div className="w-11 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <Skeleton width={30} height={18} circle />
                        </div>
                    ) : (
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                checked={useCoupon}
                                onChange={handleToggleCoupon}
                                disabled={loading}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
                        </label>
                    )}
                </div>
                <div className="flex items-center gap-4 mb-2">
                    <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 w-1/3">
                        {loading ? <Skeleton width={100} /> : 'Coupon code'}
                    </label>
                    {loading ? (
                        <Skeleton className="mt-1 w-2/3 h-10 mr-2" />
                    ) : (
                        <input
                            type="text"
                            id="couponCode"
                            className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-2/3 sm:text-sm border-gray-300 rounded-md mr-2"
                            placeholder="Coupon code"
                            disabled={!useCoupon || loading}
                        />
                    )}
                    {loading ? (
                        <Skeleton width={100} height={36} />
                    ) : (
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={!useCoupon || loading}
                        >
                            Generate
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <label htmlFor="couponDateRange" className="block text-sm font-medium text-gray-700 w-1/3">
                        {loading ? <Skeleton width={140} /> : 'Coupon Date Range'}
                    </label>
                    {loading ? (
                        <Skeleton className="mt-1 w-2/3 h-10" />
                    ) : (
                        <input
                            type="text"
                            className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-2/3 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Select Date"
                            disabled={!useCoupon || loading}
                        />
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-4">
                        <label htmlFor="couponDiscountAmount" className="block text-sm font-medium text-gray-700 w-1/3">
                            {loading ? <Skeleton width={80} /> : 'Discount'}
                        </label>
                        {loading ? (
                            <Skeleton className="w-2/3 h-10" />
                        ) : (
                            <input
                                type="number"
                                id="couponDiscountAmount"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-2/3 sm:text-sm border-gray-300 rounded-md"
                                defaultValue="0"
                                placeholder="Specify the coupon amount percentage or amount. [e.g., '10%' or '$5.00']"
                                disabled={!useCoupon || loading}
                            />
                        )}
                    </div>
                    <div>
                        <label htmlFor="couponDiscountType" className="block text-sm font-medium text-gray-700 w-1/3 md:hidden">
                            {loading ? <Skeleton width={80} /> : 'Type'}
                        </label>
                        <div className="relative">
                            {loading ? (
                                <Skeleton className="w-full h-10" />
                            ) : (
                                <select
                                    id="couponDiscountType"
                                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 rounded shadow leading-tight focus:outline-none focus:shadow-outline py-2 px-3 pr-8"
                                    disabled={!useCoupon || loading}
                                >
                                    <option>Flat</option>
                                    <option>Percentage</option>
                                </select>
                            )}
                            {!loading && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPriceDiscounts;