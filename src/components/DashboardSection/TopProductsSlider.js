// import React from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// const products = [
//   {
//     name: "Acer Nitro 50 N50-620-UA91 Gaming Desktop",
//     price: "$559.990",
//     image: "https://m.media-amazon.com/images/I/61nGyXI56mL.jpg",
//     rating: 5,
//   },
//   {
//     name: "Acer Chromebook Spin 314 Convertible Laptop",
//     price: "$309.990",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3vTMJkkr1xDfTnOnUyn4MvBD6BdmF6QiyZA&s",
//     rating: 5,
//   },
//   {
//     name: "Lenovo V30a Business All-in-One Desktop",
//     price: "$579.000",
//     image: "https://m.media-amazon.com/images/I/51m0+eaoviL._AC_UF1000,1000_QL80_.jpg",
//     rating: 5,
//   },
//   {
//     name: "Razer Naga Pro Wireless Gaming Mouse",
//     price: "$83.740",
//     image: "https://m.media-amazon.com/images/I/51GVpmNdTYL.jpg",
//     rating: 1,
//   },
//   {
//     name: "Microsoft 365 Personal 12-Month Subscription",
//     price: "$109.000",
//     image:" https://m.media-amazon.com/images/I/51GVpmNdTYL.jpg",
//     rating: 1,
//   },
//   {
//     name: "ASUS ROG Harpe Gaming Wireless Mouse",
//     price: "$149.990",
//     image: "https://m.media-amazon.com/images/I/51GVpmNdTYL.jpg",
//     rating: 1,
//   },
// ];

// const ProductCard = ({ product }) => (
//     <div className="border rounded-lg p-4 text-center w-full h-72 bg-white shadow-sm p-5">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="mx-auto h-32 object-contain"
//       />
//       <p className="font-bold text-indigo-900 mt-2">{product.price}</p>
//       <div className="text-yellow-500 text-sm">
//         {"★".repeat(product.rating)}
//         {"☆".repeat(5 - product.rating)}
//       </div>
//       <p className="text-sm mt-1 text-gray-800 font-medium">{product.name}</p>
//     </div>
//   );
  

// export default function TopProductsSlider() {
//   return (
//     <div className="p-6  ">
//       <h2 className="text-lg font-semibold mb-4 ">Top 12 Products</h2>

//       <div className="relative w-full">
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={10}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             768: { slidesPerView: 3 },
//             1024: { slidesPerView: 4 },
//             1280: { slidesPerView: 5 },
//           }}
//           navigation={{
//             nextEl: ".custom-next",
//             prevEl: ".custom-prev",
//           }}
//           modules={[Navigation]}
//         >
//           {products.map((product, index) => (
//             <SwiperSlide key={index}>
//               <ProductCard product={product} />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Arrows inside bounds */}
//         <button className="custom-prev absolute top-1/2 left-2 z-10 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white from-yellow-300 to-yellow-500 border border-black-500 shadow flex items-center justify-center">
//           <ChevronLeft size={20} className="text-black" />
//         </button>
//         <button className="custom-next absolute top-1/2 right-2 z-10 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white from-yellow-300 to-yellow-500 border border-black-500 shadow flex items-center justify-center">
//           <ChevronRight size={20} className="text-black" />
//         </button>
//       </div>
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const products = [
  {
    name: "Acer Nitro 50 N50-620-UA91 Gaming Desktop",
    price: "$559.990",
    image: "https://m.media-amazon.com/images/I/61nGyXI56mL.jpg",
    rating: 5,
  },
  {
    name: "Acer Chromebook Spin 314 Convertible Laptop",
    price: "$309.990",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3vTMJkkr1xDfTnOnUyn4MvBD6BdmF6QiyZA&s",
    rating: 5,
  },
  {
    name: "Lenovo V30a Business All-in-One Desktop",
    price: "$579.000",
    image: "https://m.media-amazon.com/images/I/51m0+eaoviL._AC_UF1000,1000_QL80_.jpg",
    rating: 5,
  },
  {
    name: "Razer Naga Pro Wireless Gaming Mouse",
    price: "$83.740",
    image: "https://m.media-amazon.com/images/I/51GVpmNdTYL.jpg",
    rating: 1,
  },
  {
    name: "Microsoft 365 Personal 12-Month Subscription",
    price: "$109.000",
    image:" https://m.media-amazon.com/images/I/51GVpmNdTYL.jpg",
    rating: 1,
  },
  {
    name: "ASUS ROG Harpe Gaming Wireless Mouse",
    price: "$149.990",
    image: "https://m.media-amazon.com/images/I/51GVpmNdTYL.jpg",
    rating: 1,
  },
];

const ProductCard = ({ product }) => (
  <div className="border rounded-lg p-4 text-center w-full h-72 bg-white shadow-sm p-5">
    <img
      src={product.image}
      alt={product.name}
      className="mx-auto h-32 object-contain"
    />
    <p className="font-bold text-indigo-900 mt-2">{product.price}</p>
    <div className="text-yellow-500 text-sm">
      {"★".repeat(product.rating)}
      {"☆".repeat(5 - product.rating)}
    </div>
    <p className="text-[12px] mt-1 text-[#1B1B28] font-medium">{product.name}</p>
  </div>
);

export default function TopProductsSlider() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Skeleton for 1 second
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-[#1B1B28] font-[400] mb-4 text-[16px] ">Top 12 Products</h2>

      <div className="relative w-full">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="w-full h-72 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
          </div>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            modules={[Navigation]}
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Arrows inside bounds */}
        <button className="custom-prev absolute top-1/2 left-2 z-10 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white from-yellow-300 to-yellow-500 border border-black-500 shadow flex items-center justify-center">
          <ChevronLeft size={20} className="text-black" />
        </button>
        <button className="custom-next absolute top-1/2 right-2 z-10 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white from-yellow-300 to-yellow-500 border border-black-500 shadow flex items-center justify-center">
          <ChevronRight size={20} className="text-black" />
        </button>
      </div>
    </div>
  );
}
