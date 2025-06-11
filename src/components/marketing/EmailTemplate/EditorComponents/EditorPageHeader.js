import { Mail, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const EditorPageHeader = ({ title, backLink }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <Link
          to={backLink}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold flex items-center">
          <Mail className="w-6 h-6 mr-2" />
          {title}
        </h1>
      </div>
    </div>
  );
};