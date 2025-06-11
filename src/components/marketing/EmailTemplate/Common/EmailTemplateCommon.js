import { useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatusToggle } from "../MainPageComponents/StatusToggle";
import { ActionButtons } from "../MainPageComponents/ActionButtons";
import { SearchBar } from "../MainPageComponents/SearchBar";
import { PageHeader } from "../MainPageComponents/PageHeader";
import { DataTable } from "../MainPageComponents/DataTable";
import Pagination from "../../../Pagination";
import { useEmailTemplates } from "../../../../context/EmailTemplateContext";
import apiInstance from "../../../../utils/axios";
const EmailTemplateCommon = () => {
  const {commonTemplates, setCommonTemplates,loading} = useEmailTemplates();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await apiInstance.put(`/common-templates/${id}`, { status: newStatus });
      setCommonTemplates((prev) =>
        prev.map((template) =>
          template._id === id ? { ...template, status: newStatus } : template
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const deleteTemplate = async (id) => {
    try {
      await apiInstance.delete(`/common-templates/${id}`);
      setCommonTemplates((prev) =>
        prev.filter((template) => template._id !== id)
      );
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  const filteredTemplates = commonTemplates.filter(
    (template) =>
      template.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTemplates.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const columns = [
    { key: "_id", title: "ID" },
    { key: "name", title: "Email Type" },
    { key: "subject", title: "Subject" },
    {
      key: "status",
      title: "Status",
      render: (template) => (
        <div className="flex justify-center">
          <StatusToggle
            status={template.status}
            onToggle={() => toggleStatus(template._id, template.status)}
          />
        </div>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (template) => (
        <ActionButtons
          onEdit={() =>
            navigate(`/marketing/email-templates/common/${template._id}`)
          }
          onDelete={() => deleteTemplate(template._id)}
        />
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Common Email Templates"
          icon={Mail}
          onAdd={() => navigate("/marketing/email-templates/common/new")}
          addButtonText="+ Add Template"
        />

        <div className="flex justify-end mb-6">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search templates..."
          />
        </div>

        <DataTable
          columns={columns}
          data={currentItems}
          loading={loading}
          emptyMessage="No templates found"
        />

        {filteredTemplates.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default EmailTemplateCommon;
