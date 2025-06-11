import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../utils/axios";
import { useEmailTemplates } from "../../../../context/EmailTemplateContext";
import { EditorPageHeader } from "../EditorComponents/EditorPageHeader";
import { TemplateFormFields } from "../EditorComponents/TemplateFormFields";
import { TextEditor } from "../EditorComponents/TextEditor";

const SellerEmailTemplateEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createSellerTemplate } = useEmailTemplates();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("design");
  const editorRef = useRef(null);

  const [sellerTemplates, setSellerTemplates] = useState({
    name: "",
    subject: "",
    emailType: "",
  });

  useEffect(() => {
    if (id) {
      const fetchSellerTemplate = async () => {
        try {
          setLoading(true);
          const { data } = await apiInstance.get(`/seller-templates/${id}`);
          setSellerTemplates(data);
        } catch (error) {
          console.error("Error fetching template:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSellerTemplate();
    }
  }, [id]);

  const handleChange = (e) => {
    setSellerTemplates({ ...sellerTemplates, [e.target.name]: e.target.value });
  };

  const handleBodyChange = () => {
    if (editorRef.current) {
      setSellerTemplates((prev) => ({
        ...prev,
        emailType: editorRef.current.innerHTML,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await apiInstance.put(`/seller-templates/${id}`, sellerTemplates);
        alert("Template updated successfully!");
      } else {
        await createSellerTemplate(sellerTemplates);
        alert("Template created successfully!");
      }
      navigate("/marketing/email-templates/seller");
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Failed to save template!");
    } finally {
      setLoading(false);
    }
  };

  if (!sellerTemplates) return <p>Template not found!</p>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <EditorPageHeader
          title={id ? "Edit Email Template" : "Create Email Template"}
          backLink="/marketing/email-templates/seller"
        />

        <div className="bg-white rounded-lg shadow p-6">
          <form id="templateForm" onSubmit={handleSubmit}>
            <TemplateFormFields
              template={sellerTemplates}
              onChange={handleChange}
            />

            <TextEditor
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              content={sellerTemplates.emailType}
              onChange={(value) =>
                setSellerTemplates({ ...sellerTemplates, emailType: value })
              }
              onBlur={handleBodyChange}
              editorRef={editorRef}
            />
            
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : id
                ? "Update Template"
                : "Create Template"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerEmailTemplateEditor;