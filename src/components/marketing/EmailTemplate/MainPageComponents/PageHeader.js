export const PageHeader = ({ title, icon: Icon, onAdd, addButtonText }) => {
    return (
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          {Icon && <Icon className="w-6 h-6 mr-2" />}
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {addButtonText || "+ Add"}
        </button>
      </div>
    );
  };