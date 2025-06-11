export const DataTable = ({ columns, data, loading, emptyMessage }) => {
  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-600">{emptyMessage || "No data found."}</p>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto text-sm text-left text-gray-800">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 whitespace-nowrap">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 align-top whitespace-nowrap">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
