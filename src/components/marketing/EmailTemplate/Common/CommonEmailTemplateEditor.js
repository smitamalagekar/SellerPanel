import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../utils/axios";
import { useEmailTemplates } from "../../../../context/EmailTemplateContext";
import { TextEditor } from "../EditorComponents/TextEditor";
import { EditorPageHeader } from "../EditorComponents/EditorPageHeader";
import { TemplateFormFields } from "../EditorComponents/TemplateFormFields";

const CommonEmailTemplateEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createCommonTemplate } = useEmailTemplates();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("design");
  const editorRef = useRef(null);

  const [commonTemplates, setCommonTemplates] = useState({
    name: "",
    subject: "",
    emailType: "",
  });

  // Fetch Template Data if Editing
  useEffect(() => {
    if (id) {
      const fetchCommonTemplates = async () => {
        try {
          setLoading(true);
          const { data } = await apiInstance.get(`/common-templates/${id}`);
          setCommonTemplates(data);
        } catch (error) {
          console.error("Error fetching template:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCommonTemplates();
    }
  }, [id]);

  // Handle Input Changes
  const handleChange = (e) => {
    setCommonTemplates({ ...commonTemplates, [e.target.name]: e.target.value });
  };

  // Handle Content Editable Changes
  const handleBodyChange = () => {
    if (editorRef.current) {
      setCommonTemplates((prev) => ({
        ...prev,
        emailType: editorRef.current.innerHTML,
      }));
    }
  };

  // Handle Save/Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await apiInstance.put(`/common-templates/${id}`, commonTemplates);
        alert("Template updated successfully!");
      } else {
        await createCommonTemplate(commonTemplates);
        alert("Template created successfully!");
      }
      navigate("/marketing/email-templates/common");
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Failed to save template!");
    } finally {
      setLoading(false);
    }
  };

  // Prevent Rendering if No Template Found
  if (!commonTemplates) return <p>Template not found!</p>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <EditorPageHeader
          title={id ? "Edit Email Template" : "Create Email Template"}
          backLink="/marketing/email-templates/common"
        />

        <div className="bg-white rounded-lg shadow p-6">
          <form id="templateForm" onSubmit={handleSubmit}>
            <TemplateFormFields
              template={commonTemplates}
              onChange={handleChange}
            />

            <TextEditor
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              content={commonTemplates.emailType}
              onChange={(value) =>
                setCommonTemplates({ ...commonTemplates, emailType: value })
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

export default CommonEmailTemplateEditor;