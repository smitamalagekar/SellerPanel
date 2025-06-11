import { useState } from "react";
import { useParams } from "react-router-dom";

const AttributeForm = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("English");
    const [formData, setFormData] = useState({
        English: "",
        Bangla: "",
        Arabic: "",
        French: "",
    });

    const handleTabClick = (language) => {
        setActiveTab(language);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [activeTab]: e.target.value });
    };

    const languageTabs = [
        { lang: "English", flagUrl: "https://flagcdn.com/w40/us.png" },
        { lang: "Bangla", flagUrl: "https://flagcdn.com/w40/bd.png" },
        { lang: "Arabic", flagUrl: "https://flagcdn.com/w40/sa.png" },
        { lang: "French", flagUrl: "https://flagcdn.com/w40/fr.png" },
    ];

    return (
        <div className="container mx-auto p-6 flex justify-center">
            <div className="bg-white border border-gray-300 rounded-lg p-6 w-full max-w-3xl min-h-[450px]">
                {/* Heading */}
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-left">
                    Attribute Information
                </h2>

                {/* Language Tabs */}
                <div className="flex items-center border-b-2 mb-4 overflow-x-auto">
                    {languageTabs.map(({ lang, flagUrl }) => (
                        <button
                            key={lang}
                            className={`flex-none sm:flex-1 py-2 sm:py-3 px-3 sm:px-0 text-sm sm:text-lg font-medium border-b-4 flex justify-center items-center gap-2 transition-all ${
                                activeTab === lang
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-600"
                            }`}
                            onClick={() => handleTabClick(lang)}
                        >
                            <img src={flagUrl} alt={lang} className="w-5 h-5 rounded-full" />
                            {lang}
                        </button>
                    ))}
                </div>

                {/* Form Input */}
                <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <label className="text-gray-700 font-semibold text-lg w-full sm:w-1/3">
                            Attribute Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full sm:w-2/3 p-3 border border-gray-400 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter attribute name"
                            value={formData[activeTab]}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-6">
                        <button className="bg-blue-400 text-white px-6 py-3 text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttributeForm;
