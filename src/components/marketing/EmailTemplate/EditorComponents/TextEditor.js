import { Bold, Italic, Underline, List, ListOrdered } from "lucide-react";

export const TextEditor = ({
  activeTab,
  setActiveTab,
  content,
  onChange,
  onBlur,
  editorRef,
}) => {
  const applyFormatting = (command) => {
    document.execCommand(command, false, null);
  };

  const formattingButtons = [
    { command: "bold", icon: <Bold className="w-4 h-4" /> },
    { command: "italic", icon: <Italic className="w-4 h-4" /> },
    { command: "underline", icon: <Underline className="w-4 h-4" /> },
    { command: "insertUnorderedList", icon: <List className="w-4 h-4" /> },
    { command: "insertOrderedList", icon: <ListOrdered className="w-4 h-4" /> },
  ];

  const tabs = [
    { id: "design", label: "Design" },
    { id: "html", label: "HTML" },
  ];

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center gap-2">
        {formattingButtons.map((button) => (
          <button
            key={button.command}
            type="button"
            className="p-2 hover:bg-gray-200 rounded"
            onClick={() => applyFormatting(button.command)}
          >
            {button.icon}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-300 flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`px-4 py-2 ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "design" ? (
          <div
            ref={editorRef}
            className="min-h-[300px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            contentEditable
            onBlur={onBlur}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-h-[300px] p-2 font-mono text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>
    </div>
  );
};