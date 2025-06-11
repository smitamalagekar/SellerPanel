import { useState, useMemo, useCallback } from "react";
import OrderStatusCard from "./OrderStatusCard";
import TableRow from "./TableRow";
import SearchAndFilter from "./SearchAndFilter";
import Pagination from "../Pagination"; // Import the Pagination component

const STATUSES = [
  { name: "All", count: 48, active: true },
  { name: "Requests", count: 15 },
  { name: "Accepted Requests", count: 5 },
  { name: "Prepayment Requests", count: 4 },
  { name: "Confirmed Prepayments", count: 1 },
  { name: "Final Preorders", count: 3 },
  { name: "In Shipping", count: 0 },
  { name: "Delivered", count: 24 },
  { name: "Refund", count: 6 },
];

const PREORDERS = [
  {
    id: "20250111-11261990",
    product: {
      name: "97 Inch TV",
      image: "https://placehold.co/50x50",
      quantity: 1,
    },
    price: 22008.9,
    prepayment: 999.0,
    seller: "Filon Asset Store",
    customer: {
      name: "Paul K. Jensen",
      email: "customer@example.com",
    },
    status: "Preorder Requested",
    refundable: true,
    createdAt: "2025-01-11",
  },
  {
    id: "20250112-11261991",
    product: {
      name: "Smartphone",
      image: "https://placehold.co/50x50",
      quantity: 2,
    },
    price: 1200.0,
    prepayment: 200.0,
    seller: "Tech Store",
    customer: {
      name: "Alice B. Smith",
      email: "alice@example.com",
    },
    status: "Preorder Confirmed",
    refundable: false,
    createdAt: "2025-01-12",
  },
  {
    id: "20250113-11261992",
    product: {
      name: "Laptop",
      image: "https://placehold.co/50x50",
      quantity: 1,
    },
    price: 1500.0,
    prepayment: 300.0,
    seller: "Gadget World",
    customer: {
      name: "John D. Doe",
      email: "john@example.com",
    },
    status: "Preorder Shipped",
    refundable: true,
    createdAt: "2025-01-13",
  },
  {
    id: "20250114-11261993",
    product: {
      name: "Headphones",
      image: "https://placehold.co/50x50",
      quantity: 3,
    },
    price: 300.0,
    prepayment: 50.0,
    seller: "Audio Hub",
    customer: {
      name: "Jane E. Roe",
      email: "jane@example.com",
    },
    status: "Preorder Delivered",
    refundable: false,
    createdAt: "2025-01-14",
  },
  {
    id: "20250115-11261994",
    product: {
      name: "Smartwatch",
      image: "https://placehold.co/50x50",
      quantity: 2,
    },
    price: 400.0,
    prepayment: 100.0,
    seller: "Wearable Tech",
    customer: {
      name: "Bob F. Brown",
      email: "bob@example.com",
    },
    status: "Preorder Requested",
    refundable: true,
    createdAt: "2025-01-15",
  },
  // Add more sample data as needed
];

function Preorders() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState({ start: null, end: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  const dateOptions = useMemo(
    () => [
      { label: "Last 7 Days", value: "last7days" },
      { label: "Last 30 Days", value: "last30days" },
      { label: "Last 6 Months", value: "last6months" },
      { label: "Last Year", value: "lastyear" },
    ],
    []
  );

  const filteredOrders = useMemo(() => {
    return PREORDERS.filter((order) => {
      const matchesStatus =
        selectedStatus === "All" || order.status.includes(selectedStatus);
      const matchesSearch =
        order.id.includes(searchTerm) ||
        order.product.name.toLowerCase().includes(searchTerm.toLowerCase());

      const orderDate = new Date(order.createdAt);
      const matchesDate = dateFilter.start && dateFilter.end
        ? orderDate >= dateFilter.start && orderDate <= dateFilter.end
        : true;

      return matchesStatus && matchesSearch && matchesDate;
    });
  }, [selectedStatus, searchTerm, dateFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusClick = useCallback((status) => {
    setSelectedStatus(status);
    setCurrentPage(1); // Reset to the first page when status changes
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Preorders</h1>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUSES.map((status) => (
          <OrderStatusCard
            key={status.name}
            label={status.name}
            count={status.count}
            active={selectedStatus === status.name}
            onClick={() => handleStatusClick(status.name)}
          />
        ))}
      </div>

      {/* Search and Filters */}
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        dateOptions={dateOptions}
      />

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product/Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preorder Code/Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price/Prepayment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seller
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Refund
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrders.map((order) => (
              <TableRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} entries
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Preorders;