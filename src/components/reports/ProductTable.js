import PropTypes from 'prop-types';
import Pagination from '../Pagination';

const ProductTable = ({ 
  columns, 
  data, 
  currentPage, 
  itemsPerPage, 
  onPageChange,
  showPagination = true
}) => {
  // Calculate pagination values
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full border-b">
            {columns.map((column, index) => (
              <th 
                key={index} 
                className="py-3 px-4 text-left text-sm font-medium text-gray-500"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50">
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex} 
                  className="py-3 px-4 text-sm text-gray-700"
                >
                  {column.accessor(item, indexOfFirstItem + rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {showPagination && data.length > itemsPerPage && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, data.length)} of {data.length} entries
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

ProductTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.func.isRequired,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  showPagination: PropTypes.bool,
};

export default ProductTable;