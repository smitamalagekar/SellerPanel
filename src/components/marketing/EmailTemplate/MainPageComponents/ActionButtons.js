export const ActionButtons = ({ onEdit, onDelete }) => {
    return (
      <div className="text-right">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-blue-600 text-white rounded-md mr-2 hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    );
  };