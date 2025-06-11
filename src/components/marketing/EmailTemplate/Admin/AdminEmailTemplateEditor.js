import { useEffect, useRef, useState } from "react";
import apiInstance from "../../../../utils/axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEmailTemplates } from "../../../../context/EmailTemplateContext";
import { EditorPageHeader } from "../EditorComponents/EditorPageHeader";
import { TemplateFormFields } from "../EditorComponents/TemplateFormFields";
import { TextEditor } from "../EditorComponents/TextEditor";

const AdminEmailTemplateEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createAdminTemplate } = useEmailTemplates();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("design");
  const editorRef = useRef(null);

  const [adminTemplates, setAdminTemplates] = useState({
    name: "",
    subject: "",
    emailType: "",
  });

  useEffect(() => {
    if (id) {
      const fetchAdminTemplate = async () => {
        try {
          setLoading(true);
          const { data } = await apiInstance.get(`/adminemail/${id}`);
          setAdminTemplates(data);
        } catch (error) {
          console.error("Error fetching template:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAdminTemplate();
    }
  }, [id]);

  const handleChange = (e) => {
    setAdminTemplates({ ...adminTemplates, [e.target.name]: e.target.value });
  };

  const handleBodyChange = () => {
    if (editorRef.current) {
      setAdminTemplates((prev) => ({
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
        await apiInstance.put(`/adminemail/${id}`, adminTemplates);
        alert("Template updated successfully!");
      } else {
        await createAdminTemplate(adminTemplates);
        alert("Template created successfully!");
      }
      navigate("/marketing/email-templates/admin");
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Failed to save template!");
    }
  };

  return (
     <div className="p-4 bg-gray-50 min-h-screen">
       <div className="max-w-7xl mx-auto">
         <EditorPageHeader
           title={id ? "Edit Email Template" : "Create Email Template"}
           backLink="/marketing/email-templates/admin"
         />
 
         <div className="bg-white rounded-lg shadow p-6">
           <form id="templateForm" onSubmit={handleSubmit}>
             <TemplateFormFields
               template={adminTemplates}
               onChange={handleChange}
             />
 
             <TextEditor
               activeTab={activeTab}
               setActiveTab={setActiveTab}
               content={adminTemplates.emailType}
               onChange={(value) =>
                 setAdminTemplates({ ...adminTemplates, emailType: value })
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

export default AdminEmailTemplateEditor;
