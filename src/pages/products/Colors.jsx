// import { Delete, Edit, Trash } from "lucide-react"
// import "./Colors.css"
// import { MdOutlineSettings } from "react-icons/md"

// export default function PreOrderFaq() {

//     const faqs = [
//         {
//             id: 1,
//             name: "MistyRose",

//         },
//         {
//             id: 2,
//             name: "Ivory",

//         },
//         {
//             id: 3,
//             name: "Silver",

//         },
//         {
//             id: 4,
//             name: "DarkGray",

//         },
//         {
//             id: 5,
//             name: "LightGrey",

//         },
//     ]
//      return (
//         <div className="PreOrderFaq ma10">
//             <div className="preOrderFaqBox">
//                 <div className="preOrderFaqLeft">
//                     <div className="preOrderLeftUpper">
//                         <p className="allFaq">All Colors</p>
//                         <input type="text" placeholder="Type to search...." className="searchFaq" />
//                     </div>
//                     <div className="preOrderLeftLower">
//                         <div className="table-container faqTable">
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>
//                                             #
//                                         </th>


//                                         <th >Name</th>



//                                         <th>Options</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {faqs.map((n) => (
//                                         <tr key={n.id}>
//                                             <td>
//                                                 {n.id}
//                                             </td>

//                                             <td>{n.name}</td>




//                                             <td>
//                                                 <div className="flex flex-row gap-[.3cm]">

//                                                     <div className="action">
//                                                         <Edit color="blue" size={18} />
//                                                     </div>
//                                                     <div className="action">
//                                                         <Trash color="blue" size={18} />
//                                                     </div>

//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="prerow">
//                     <div className="preOrderFaqRight-new">

//                         <div className="preOrderFaqRightHead">
//                             <p className="allFaq">Add new Color</p>
//                         </div>

//                         <div className="faqForm">
//                             <label>Name</label>
//                             <input type="text" placeholder="Enter question" className="faqInp" />

//                             <label>Color Code</label>
//                             <input type="text" placeholder="Enter Code" className="faqInp" />

//                             <div className="inpSubBox">
//                                 <input type="submit" value="Save" className="inpSub" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="preOrderFaqRight-new">

//                         <div className="preOrderFaqRightHead">
//                             <p className="allFaq">Color  filter activation</p>
//                         </div>

//                         <div className="faqForm">
//                             <div className="toggle-item">

//                                 <label className="switch">
//                                     <input
//                                         type="checkbox"
//                                     />
//                                     <span className="slider"></span>
//                                 </label>
//                             </div>

//                         </div>
//                     </div>
//                 </div>




//             </div>
//         </div>
//     )
// }













// import { Delete, Edit, Trash } from "lucide-react";
// import "./Colors.css";
// import { MdOutlineSettings } from "react-icons/md";
// // import { Popover, PopoverButton, PopoverPanel } from "flowbite-react";
// import { Popover, Button } from "flowbite-react";

// import { useState } from "react";

// export default function PreOrderFaq() {
//   const [colorCode, setColorCode] = useState("#ffffff");

//   const faqs = [
//     {
//       id: 1,
//       name: "MistyRose",
//     },
//     {
//       id: 2,
//       name: "Ivory",
//     },
//     {
//       id: 3,
//       name: "Silver",
//     },
//     {
//       id: 4,
//       name: "DarkGray",
//     },
//     {
//       id: 5,
//       name: "LightGrey",
//     },
//   ];
//   return (
//     <div className="PreOrderFaq ma10">
//       <div className="preOrderFaqBox">
//         <div className="preOrderFaqLeft">
//           <div className="preOrderLeftUpper">
//             <p className="allFaq">All Colors</p>
//             <input
//               type="text"
//               placeholder="Type to search...."
//               className="searchFaq"
//             />
//           </div>
//           <div className="preOrderLeftLower">
//             <div className="table-container faqTable">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Name</th>
//                     <th>Options</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {faqs.map((n) => (
//                     <tr key={n.id}>
//                       <td>{n.id}</td>
//                       <td>{n.name}</td>
//                       <td>
//                         <div className="flex flex-row gap-[.3cm]">
//                           <div className="action">
//                             <Edit color="blue" size={18} />
//                           </div>
//                           <div className="action">
//                             <Trash color="blue" size={18} />
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         <div className="prerow">
//           {/* Add New Color Section */}
//           <div className="preOrderFaqRight-new">
//             <div className="preOrderFaqRightHead">
//               <p className="allFaq">Add new Color</p>
//             </div>

//             <div className="faqForm">
//               <label>Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter question"
//                 className="faqInp"
//               />

//               <label>Color Code</label>
//               <input
//                 type="text"
//                 value={colorCode}
//                 readOnly
//                 className="faqInp"
//               />

//               {/* Flowbite Popover for Color Picker */}
//              <Popover className="relative">
//   <PopoverButton className="inpSub bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
//     Pick Color
//   </PopoverButton>
//   <PopoverPanel className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
//     <input
//       type="color"
//       value={colorCode}
//       onChange={(e) => setColorCode(e.target.value)}
//       className="w-full h-10 cursor-pointer border-none"
//     />
//   </PopoverPanel>
// </Popover>


//               <div className="inpSubBox">
//                 <input type="submit" value="Save" className="inpSub" />
//               </div>
//             </div>
//           </div>

//           {/* Color Filter Activation Section */}
//           <div className="preOrderFaqRight-new">
//             <div className="preOrderFaqRightHead">
//               <p className="allFaq">Color filter activation</p>
//             </div>

//             <div className="faqForm">
//               <div className="toggle-item">
//                 <label className="switch">
//                   <input type="checkbox" />
//                   <span className="slider"></span>
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// import { Delete, Edit, Trash } from "lucide-react";
// import "./Colors.css";
// import { MdOutlineSettings } from "react-icons/md";
// import { useState } from "react";
// import { useRef , useEffect } from "react";

// export default function PreOrderFaq() {
// //   const [selectedColor, setSelectedColor] = useState("#000000");
// //   const [newColorName, setNewColorName] = useState("");
// const [selectedColor, setSelectedColor] = useState("");
//   const [newColorName, setNewColorName] = useState("");
//   const [faqs, setFaqs] = useState([
//     {
//       id: 1,
//       name: "MistyRose",
//       code: "#FFE4E1",
//     },
//     {
//       id: 2,
//       name: "Ivory",
//       code: "#FFFFF0",
//     },
//     {
//       id: 3,
//       name: "Silver",
//       code: "#C0C0C0",
//     },
//     {
//       id: 4,
//       name: "DarkGray",
//       code: "#A9A9A9",
//     },
//     {
//       id: 5,
//       name: "LightGrey",
//       code: "#D3D3D3",
//     },
//   ]);


// //   const handleColorChange = (e) => {
// //     setSelectedColor(e.target.value);
// //   };

// //   const handleSaveColor = () => {
// //     if (newColorName && selectedColor) {
// //       const newColor = {
// //         id: faqs.length + 1,
// //         name: newColorName,
// //         code: selectedColor,
// //       };
// //       setFaqs([...faqs, newColor]);
// //       setNewColorName("");
// //       setSelectedColor("#000000");
// //     }
// //   };

// const colorInputRef = useRef(null);
// const colorPickerRef = useRef(null);

// const handleColorChange = (e) => {
//   setSelectedColor(e.target.value);
// };

// const handleSaveColor = () => {
//   if (newColorName && selectedColor) {
//     const newColor = { id: faqs.length + 1, name: newColorName, code: selectedColor };
//     setFaqs([...faqs, newColor]);
//     setNewColorName("");
//     setSelectedColor("#000000");
//   }
// };

// const openColorPicker = () => {
//   colorPickerRef.current.click(); // Trigger the color picker input
// };

// // Close color picker when clicking outside
// useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (
//       colorInputRef.current &&
//       !colorInputRef.current.contains(event.target) &&
//       colorPickerRef.current &&
//       !colorPickerRef.current.contains(event.target)
//     ) {
//       // You might need to add logic here to properly handle the closure of the color picker
//       // if it doesn't close automatically
//     }
//   };
//   document.addEventListener("mousedown", handleClickOutside);
//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }, []);





//   return (
//     <div className="PreOrderFaq ma10">
//       <div className="preOrderFaqBox">
//         <div className="preOrderFaqLeft">
//           <div className="preOrderLeftUpper">
//             <p className="allFaq">All Colors</p>
//             <input
//               type="text"
//               placeholder="Type to search...."
//               className="searchFaq"
//             />
//           </div>
//           <div className="preOrderLeftLower">
//             <div className="table-container faqTable">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Name</th>
//                     {/* <th>Color</th> */}
//                     <th>Options</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {faqs.map((n) => (
//                     <tr key={n.id}>
//                       <td>{n.id}</td>
//                       <td>{n.name}</td>
//                       {/* <td>
//                         <div
//                           style={{
//                             backgroundColor: n.code,
//                             width: "20px",
//                             height: "20px",
//                             borderRadius: "5px",
//                             border: "1px solid #ddd",
//                           }}
//                         ></div>
//                       </td> */}
//                       <td>
//                         <div className="flex flex-row gap-[.3cm]">
//                           <div className="action">
//                             <Edit color="blue" size={18} />
//                           </div>
//                           <div className="action">
//                             <Trash color="blue" size={18} />
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Add New Color */}
//         <div className="prerow">
//           <div className="preOrderFaqRight-new">
//             <div className="preOrderFaqRightHead">
//               <p className="allFaq">Add new Color</p>
//             </div>

//             <div className="faqForm">
//               <label>Name</label>
//               <input
//                 type="text"
//                 value={newColorName}
//                 onChange={(e) => setNewColorName(e.target.value)}
//                 placeholder="Enter color name"
//                 className="faqInp"
//               />

//               {/* <label>Color Code</label>
//               <div className="color-picker-wrapper">
//                 <input
//                   type="text"
//                   value={selectedColor}
//                   readOnly
//                   className="faqInp"
//                 />
//                 <input
//                   type="color"
//                   value={selectedColor}
//                   onChange={handleColorChange}
//                   className="color-picker"
//                 />
//               </div> */}
//                <label>Color Code</label>
//               <div className="color-picker-wrapper" ref={colorInputRef}>
//                 <input
//                   type="text"
//                   value={selectedColor}
//                   readOnly
//                   className="faqInp"
//                   onClick={openColorPicker} 
//                 />
//                 <input
//                   type="color"
//                   value={selectedColor}
//                   onChange={handleColorChange}
//                   className="color-picker"
//                   ref={colorPickerRef}
//                   style={{ display: "none" }} 
//                 />
//               </div>



//               <div className="inpSubBox">
//                 <input
//                   type="button"
//                   value="Save"
//                   className="inpSub"
//                   onClick={handleSaveColor}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Color Filter Activation */}
//           <div className="preOrderFaqRight-new">
//             <div className="preOrderFaqRightHead">
//               <p className="allFaq">Color filter activation</p>
//             </div>

//             <div className="faqForm">
//               <div className="toggle-item">
//                 <label className="switch">
//                   <input type="checkbox" />
//                   <span className="slider"></span>
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { Delete, Edit, Trash } from "lucide-react";
import "./Colors.css";
import { useState, useRef, useEffect } from "react";

export default function PreOrderFaq() {
    const [selectedColor, setSelectedColor] = useState("");
    const [newColorName, setNewColorName] = useState("");
    const [faqs, setFaqs] = useState([
        { id: 1, name: "MistyRose", code: "#FFE4E1" },
        { id: 2, name: "Ivory", code: "#FFFFF0" },
        { id: 3, name: "Silver", code: "#C0C0C0" },
        { id: 4, name: "DarkGray", code: "#A9A9A9" },
        { id: 5, name: "LightGrey", code: "#D3D3D3" },
    ]);

    const colorInputRef = useRef(null);
    const colorPickerRef = useRef(null);

    //   const handleColorChange = (e) => {
    //     setSelectedColor(e.target.value);
    //   };

    const handleSaveColor = () => {
        if (newColorName && selectedColor) {
            const newColor = { id: faqs.length + 1, name: newColorName, code: selectedColor };
            setFaqs([...faqs, newColor]);
            setNewColorName("");
            setSelectedColor("#000000");
        }
    };

    const handleOpenColorPicker = () => {
        if (colorInputRef.current && colorPickerRef.current) {
            const inputRect = colorInputRef.current.getBoundingClientRect();
            colorPickerRef.current.style.display = "block";
            colorPickerRef.current.style.position = "absolute";
            colorPickerRef.current.style.top = `${inputRect.bottom + window.scrollY}px`;
            colorPickerRef.current.style.left = `${inputRect.left + window.scrollX}px`;
        }
    };
    const [showColorPicker, setShowColorPicker] = useState(false);

    const openColorPicker = () => {
        setShowColorPicker(true);
    };

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
        setShowColorPicker(false); // Hide color picker after selection
    };


    const handleCloseColorPicker = (event) => {
        if (
            colorPickerRef.current &&
            !colorPickerRef.current.contains(event.target) &&
            colorInputRef.current &&
            !colorInputRef.current.contains(event.target)
        ) {
            colorPickerRef.current.style.display = "none";
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleCloseColorPicker);
        return () => {
            document.removeEventListener("mousedown", handleCloseColorPicker);
        };
    }, []);

    return (
        <div className="PreOrderFaq ma10">
            <div className="preOrderFaqBox">
                <div className="preOrderFaqLeft">
                    <div className="preOrderLeftUpper">
                        <p className="allFaq">All Colors</p>
                        <input type="text" placeholder="Type to search...." className="searchFaq" />
                    </div>
                    <div className="preOrderLeftLower">
                        <div className="table-container faqTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {faqs.map((n) => (
                                        <tr key={n.id}>
                                            <td>{n.id}</td>
                                            <td>{n.name}</td>
                                            <td>
                                                <div className="flex flex-row gap-[.3cm]">
                                                    <div className="action">
                                                        <Edit color="blue" size={18} />
                                                    </div>
                                                    <div className="action">
                                                        <Trash color="blue" size={18} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="prerow">
                    <div className="preOrderFaqRight-new">
                        <div className="preOrderFaqRightHead">
                            <p className="allFaq">Add new Color</p>
                        </div>
                        <div className="faqForm">
                            <label>Name</label>
                            <input
                                type="text"
                                value={newColorName}
                                onChange={(e) => setNewColorName(e.target.value)}
                                placeholder="Enter color name"
                                className="faqInp"
                            />
                            {/* <label>Color</label>
                            <div className="color-picker-wrapper">
                                <input
                                    type="text"
                                    value={selectedColor}
                                    readOnly
                                    className="faqInp"
                                    onClick={() => colorPickerRef.current.click()} // Click to open color picker
                                />
                                <input
                                    type="color"
                                    ref={colorPickerRef}
                                    value={selectedColor}
                                    onChange={handleColorChange}
                                    style={{ display: "flex" }}
                                />
                            </div> */}
                            <label>Color</label>
                            <div className="color-picker-wrapper" style={{ position: "relative" }}>
                                <input
                                    type="text"
                                    value={selectedColor}
                                    readOnly
                                    className="faqInp"
                                    onClick={() => colorPickerRef.current.click()} // Trigger color picker
                                />
                                <input
                                    type="color"
                                    ref={colorPickerRef}
                                    value={selectedColor}
                                    onChange={handleColorChange}
                                    style={{
                                        position: "absolute",
                                        top: "-4cm",
                                        left: "0",

                                        width: "100%",
                                        height: "200px",
                                        opacity: "0",
                                        cursor: "pointer",
                                    }}
                                />
                            </div>



                            <div className="inpSubBox">
                                <input type="button" value="Save" className="inpSub" onClick={handleSaveColor} />
                            </div>
                        </div>
                    </div>
                    <div className="preOrderFaqRight-new">
                        <div className="preOrderFaqRightHead">
                            <p className="allFaq">Color filter activation</p>
                        </div>
                        <div className="faqForm">
                            <div className="toggle-item">
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
