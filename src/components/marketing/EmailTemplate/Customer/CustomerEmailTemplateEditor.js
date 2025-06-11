import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Mail,
  ChevronLeft,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
} from "lucide-react";
import { useEmailTemplates } from "../../../../context/EmailTemplateContext";
import apiInstance from "../../../../utils/axios";

const CustomerEmailTemplateEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createCustomerTemplate } = useEmailTemplates();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("design");
  const editorRef = useRef(null);
  const [customerTemplates, setCustomerTemplates] = useState({
    name: "",
    subject: "",
    emailType: "",
  });

  useEffect(() => {
    if (id) {
      const fetchCustomerTemplate = async () => {
        try {
          setLoading(true);
          const { data } = await apiInstance.get(`/customer-templates/${id}`);
          setCustomerTemplates(data);
        } catch (error) {
          console.error("Error fetching template:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCustomerTemplate();
    }
  }, [id]);

  const handleChange = (e) => {
    setCustomerTemplates({
      ...customerTemplates,
      [e.target.name]: e.target.value,
    });
  };

  const handleBodyChange = () => {
    if (editorRef.current) {
      setCustomerTemplates((prev) => ({
        ...prev,
        emailType: editorRef.current.innerHTML,
      }));
    }
  };

  const applyFormatting = (command) => {
    document.execCommand(command, false, null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await apiInstance.put(`/customer-templates/${id}`, customerTemplates);
        alert("Template updated successfully!");
      } else {
        await createCustomerTemplate(customerTemplates);
        alert("Template created successfully!");
      }
      navigate("/marketing/email-templates/customer");
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Failed to save template!");
    }
  };

  if (!customerTemplates) return <p>Template not found!</p>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/marketing/email-templates/customer")}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold flex items-center">
              <Mail className="w-6 h-6 mr-2" />
              {id ? "Edit Email Template" : "Create Email Template"}
            </h1>
          </div>
         
        </div>

        {/* Template Editor */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <form id="templateForm" onSubmit={handleSubmit}>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Template Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerTemplates.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={customerTemplates.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Editor */}
              <div className="border border-gray-300 rounded-md overflow-hidden">
                {/* Formatting Toolbar */}
                <div className="bg-gray-100 border-b border-gray-300 p-2 flex gap-2">
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded"
                    onClick={() => applyFormatting("bold")}
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded"
                    onClick={() => applyFormatting("italic")}
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded"
                    onClick={() => applyFormatting("underline")}
                  >
                    <Underline className="w-4 h-4" />
                  </button>
                  <div className="h-5 w-px bg-gray-400 mx-1"></div>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded"
                    onClick={() => applyFormatting("insertUnorderedList")}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded"
                    onClick={() => applyFormatting("insertOrderedList")}
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>
                </div>

                {/* Editor Tabs */}
                <div className="border-b border-gray-300 flex">
                  <button
                    type="button"
                    className={`px-4 py-2 ${
                      activeTab === "design"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("design")}
                  >
                    Design
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 ${
                      activeTab === "html"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("html")}
                  >
                    HTML
                  </button>
                </div>

                {/* Editor Content */}
                <div className="p-4">
                  {activeTab === "design" ? (
                    <div
                    ref={editorRef}
                      id="emailType"
                      className="min-h-[300px] p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      contentEditable
                      dangerouslySetInnerHTML={{
                        __html: customerTemplates.emailType,
                      }}
                      onBlur={(e) => handleBodyChange(e.target.innerHTML)}
                    />
                  ) : (
                    <textarea
                      name="emailType"
                      value={customerTemplates.emailType}
                      onChange={(e) => setCustomerTemplates({
                        ...customerTemplates,
                        emailType:e.target.value,
                      })}
                      className="w-full min-h-[300px] p-2 font-mono text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  <button
                  type="submit"
                  onClick={handleSubmit}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : id
                    ? "Update Template"
                    : "Create Template"}
                </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerEmailTemplateEditor;
