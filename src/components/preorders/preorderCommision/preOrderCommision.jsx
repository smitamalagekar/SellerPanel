import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
// import apiInstance from "../../../utils/axios";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export default function CommissionHistory() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://e-commerce-backend-1-0.onrender.com/api/sellerpreorder-commission-history");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log("PreOrderCommision:", data);

  // const handleViewQuery = (data) => {
  //   navigate("/preorder-commision", { state: { data } });
  // };

  const filteredData = data.filter((item) =>
    item.orderCode.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    // Simulate loading for demo
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-2xl mb-8">
        Preorder Commission History report
      </h2>

      <div className="bg-white rounded-lg p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
          <h3 className="text-md ">Commission History</h3>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Daterange"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-1 rounded-md w-full md:w-64"
            />
            <button className="bg-indigo-600 text-white px-4 py-1 rounded-md">
              Filter
            </button>
          </div>
        </div>

        {/* Table or Skeleton */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border md:table-fixed">
            <thead className="hidden md:table-header-group bg-gray-100 border-b border-gray-200">
              <tr className="divide-x divide-gray-200">
                <th className="p-3 w-12">#</th>
                <th className="p-3">Order Code</th>
                <th className="p-3">Admin Commission</th>
                <th className="p-3">Earning</th>
                <th className="p-3">Created At</th>
              </tr>
            </thead>

            <thead className="table-header-group md:hidden bg-gray-100">
              <tr>
                <th className="p-2 w-10"></th>
                <th className="p-2 w-10">#</th>
                <th className="p-2">Admin Commission</th>
                <th className="p-2">Earning</th>
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array.from({ length: 3 }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse border-b">
                      <td className="p-3" colSpan={5}>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div className="h-4 bg-gray-200 rounded w-2/5 md:w-1/5" />
                          <div className="h-4 bg-gray-200 rounded w-1/5" />
                          <div className="h-4 bg-gray-200 rounded w-1/5" />
                          <div className="h-4 bg-gray-200 rounded w-1/5" />
                        </div>
                      </td>
                    </tr>
                  ))
                : filteredData.map((item, idx) => (
                    <React.Fragment key={item.id}>
                      {/* Mobile Row */}
                      <tr className="md:hidden border-b">
                        <td className="p-2 text-indigo-600">
                          <button onClick={() => toggleExpand(item.id)}>
                            {expanded === item.id ? (
                              <Minus size={18} />
                            ) : (
                              <Plus size={18} />
                            )}
                          </button>
                        </td>
                        <td className="p-2 font-medium">#{idx + 1}</td>
                        <td className="p-2">{item.adminCommission}</td>
                        <td className="p-2">{item.earning}</td>
                      </tr>

                      {expanded === item.id && (
                        <tr className="md:hidden border-b bg-gray-50">
                          <td colSpan="4" className="p-2">
                            <hr className="my-2 border-t border-gray-300" />
                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                              <div className="font-medium">Order Code:</div>
                              <div>{item.orderCode}</div>
                              <div className="font-medium">Created At:</div>
                              <div>{item.createdAt}</div>
                            </div>
                          </td>
                        </tr>
                      )}

                      {/* Desktop Row */}
                      <tr className="hidden md:table-row border-b border-gray-200 divide-x divide-gray-200">
                        <td className="p-3">{idx + 1}</td>
                        <td className="p-3">{item.orderCode}</td>
                        <td className="p-3">{item.adminCommission}</td>
                        <td className="p-3">{item.sellerEarning}</td>
                        <td className="p-3">{item.createdAt}</td>
                      </tr>
                    </React.Fragment>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
