// // import React from 'react';

// // const SocialMediaLinks = () => {
// //   const socialMediaPlatforms = [
// //     { name: 'Facebook', placeholder: 'Facebook', content: 'Insert link with https' },
// //     { name: 'Instagram', placeholder: 'Instagram', content: 'Insert link with https' },
// //     { name: 'Twitter', placeholder: 'Twitter', content: 'Insert link with https' },
// //     { name: 'Google', placeholder: 'Google', content: 'Insert link with https' },
// //     { name: 'Youtube', placeholder: 'Youtube', content: 'Insert link with https' },
// //   ];

// //   return (
// //     <div className="bg-white shadow-md rounded-md p-6">
// //       <h2 className="text-lg font-semibold mb-4">Social Media Link</h2>
// //       <div>
// //         {socialMediaPlatforms.map((platform) => (
// //           <div key={platform.name} className="mb-4">
// //             {/* Label on top */}
// //             <label htmlFor={platform.name} className="block text-gray-700 text-sm font-bold mb-1">
// //               {platform.name}
// //             </label>
// //             {/* Input field */}
// //             <input
// //               type="text"
// //               id={platform.name}
// //               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// //               placeholder={platform.placeholder}
// //             />
// //             {/* Content below the input */}
// //             <p className="text-gray-500 text-xs mt-1">{platform.content}</p>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="flex justify-end mt-6">
// //         <button
// //           className="bg-[#2d254c] bg-[#2d254c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
// //           type="button"
// //         >
// //           Save
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SocialMediaLinks;






// import React from 'react';

// const SocialMediaLinks = () => {
//   const socialMediaPlatforms = [
//     { name: 'Facebook', placeholder: 'Facebook URL', content: 'Use a valid URL starting with https://' },
//     { name: 'Instagram', placeholder: 'Instagram URL', content: 'Use a valid URL starting with https://' },
//     { name: 'Twitter', placeholder: 'Twitter URL', content: 'Use a valid URL starting with https://' },
//     { name: 'Google', placeholder: 'Google URL', content: 'Use a valid URL starting with https://' },
//     { name: 'Youtube', placeholder: 'Youtube URL', content: 'Use a valid URL starting with https://' },
//   ];

//   return (
//     <div className="bg-white shadow-xl rounded-2xl p-8">
//       <h2 className="text-2xl font-bold text-[#2d254c] mb-6 border-b pb-2 flex items-center gap-2">
//         🔗 Social Media Links
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {socialMediaPlatforms.map((platform) => (
//           <div key={platform.name} className="space-y-1">
//             <label htmlFor={platform.name} className="text-sm font-medium text-gray-700">
//               {platform.name}
//             </label>
//             <input
//               type="url"
//               id={platform.name}
//               placeholder={platform.placeholder}
//               className="w-full border border-gray-300 focus:border-[#2d254c] focus:ring-2 focus:ring-[#2d254c] rounded-md px-4 py-2 text-sm placeholder-gray-400 outline-none transition duration-200"
//             />
//             <p className="text-xs text-gray-500">{platform.content}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-end mt-8">
//         <button
//           type="button"
//           className="bg-[#2d254c] text-white font-semibold py-2 px-6 rounded-md shadow hover:bg-[#201c38] transition-all duration-300"
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SocialMediaLinks;
