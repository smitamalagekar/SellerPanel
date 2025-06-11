// import { Plus, Minus, ChevronRight } from "lucide-react";
import axios from "axios";
import { Plus, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import apiInstance from "../../utils/axios";


const SupportTicket = () => {
  const [expandedTicketId, setExpandedTicketId] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateTicket = () => {
    navigate("/create-ticket");
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("https://e-commerce-backend-1-0.onrender.com/api/sellertickets/getall");

        // Check the actual response structure first
        console.log("API Response:", response);

        // Handle different possible response structures
        let ticketsData = [];

        if (Array.isArray(response.data)) {
          // Case 1: Response data is already an array
          ticketsData = response.data;
        } else if (
          response.data.tickets &&
          Array.isArray(response.data.tickets)
        ) {
          // Case 2: Response has a tickets array property
          ticketsData = response.data.tickets;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          // Case 3: Response has a data property containing the array
          ticketsData = response.data.data;
        } else {
          throw new Error("Unexpected API response structure");
        }

        // Transform API data to match expected structure
        const formattedTickets = ticketsData.map((ticket) => ({
          id: ticket.ticketId || ticket.id || "N/A",
          _id: ticket._id, // Store MongoDB ID
          date: ticket.sendingDate || ticket.date || new Date().toISOString(),
          subject: ticket.subject || "No subject",
          status: ticket.status || "Unknown",
          user: ticket.user || "Unknown user",
          lastReply:
            ticket.lastReply || ticket.date || new Date().toISOString(),
          createdAt: ticket.createdAt || new Date().toISOString(),
        }));

        setTickets(formattedTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError(`Failed to load tickets. ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleToggleExpand = (ticketId) => {
    setExpandedTicketId((prev) => (prev === ticketId ? null : ticketId));
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const statusColors = {
    New: "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Solved: "bg-green-100 text-green-800",
    Closed: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-2xl text-gray-800 mb-10">
        Support Tickets
      </h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mb-12">
        <div className="w-96 bg-white border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-md transition">
          <button
            onClick={handleCreateTicket}
            className="bg-gray-300 p-4 rounded-full text-gray-600 hover:bg-gray-400 transition"
          >
            <Plus size={32} />
          </button>
          <div className="mt-2 text-sm font-medium text-gray-700">
            Create New Ticket
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 text-xl font-semibold text-gray-800">
          Ticket List
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            {/* <thead className="bg-gray-100 text-gray-600 font-semibold">
              <tr className="md:hidden">
                <th className="px-6 py-3 text-left">Subject</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
              <tr className="hidden md:table-row">
                <th className="px-6 py-3 text-left">Ticket ID</th>
                <th className="px-6 py-3 text-left">SENDING Date</th>
                <th className="px-6 py-3 text-left">Subject</th>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Options</th>
              </tr>
            </thead> */}
            <thead className="bg-gray-100 text-gray-600 font-semibold">
              <tr className="xl:hidden">
                <th className="px-6 py-3 text-left">+</th>
                <th className="px-6 py-3 text-left">Ticket ID</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Options</th>
              </tr>
              <tr className="hidden xl:table-row">

                <th className="px-6 py-3 text-left">Ticket ID</th>

                <th className="px-6 py-3 text-left">SENDING Date</th>
                <th className="px-6 py-3 text-left">Subject</th>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Options</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {loading ? (
                [...Array(3)].map((_, index) => (
                  <React.Fragment key={index}>
                    <tr className="md:hidden">
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                      </td>
                    </tr>
                    <tr className="hidden md:table-row">
                      {[...Array(6)].map((_, i) => (
                        <td key={i} className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                ))
              ) : tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <React.Fragment key={ticket._id}>
                    {/* <tr
                      className="md:hidden hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleToggleExpand(ticket._id)}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium">{ticket.subject}</div>
                        <div className="text-sm text-gray-500">{ticket.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            statusColors[ticket.status] ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                    </tr> */}
                    <tr className="xl:hidden hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4">
                        <button onClick={() => handleToggleExpand(ticket._id)}>
                          {expandedTicketId === ticket._id ? "-" : <Plus size={16} />}
                        </button>
                      </td>
                      <td className="px-6 py-4 font-medium">{ticket.id}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status] || "bg-gray-100 text-gray-800"
                            }`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => navigate(`/tickets/${ticket._id}`)}
                          className="text-indigo-600 hover:underline font-medium focus:outline-none"
                        >
                          View
                        </button>
                      </td>
                    </tr>

                    {/* {expandedTicketId === ticket._id && (
                      <tr className="md:hidden">
                        <td colSpan={2} className="px-6 py-4 bg-gray-50">
                          <div className="flex flex-col space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium text-gray-700">
                                User:
                              </span>
                              <span className="text-gray-800">
                                {ticket.user}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium text-gray-700">
                                Created:
                              </span>
                              <span className="text-gray-800">
                                {formatDate(ticket.createdAt)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium text-gray-700">
                                Last Reply:
                              </span>
                              <span className="text-gray-800">
                                {formatDate(ticket.lastReply)}
                              </span>
                            </div>
                            <div className="flex justify-end mt-2">
                              <button
                                onClick={() =>
                                  navigate(`/tickets/${ticket._id}`)
                                }
                                className="text-indigo-600 hover:underline font-medium focus:outline-none"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )} */}

                    {expandedTicketId === ticket._id && (
                      <tr className="xl:hidden">
                        <td colSpan={4} className="px-6 py-4 bg-gray-50">
                          <div className="grid gap-2 text-sm">
                            <div>
                              <strong>Date:</strong> {formatDate(ticket.date)}
                            </div>
                            <div>
                              <strong>Subject:</strong> {ticket.subject}
                            </div>
                            <div>
                              <strong>User:</strong> {ticket.user}
                            </div>
                            <div>
                              <strong>Created:</strong> {formatDate(ticket.createdAt)}
                            </div>
                            <div>
                              <strong>Last Reply:</strong> {formatDate(ticket.lastReply)}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}

                    <tr className="hidden md:table-row hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(ticket.date)}
                      </td>
                      <td className="px-6 py-4">{ticket.subject}</td>
                      <td className="px-6 py-4">{ticket.user}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status] ||
                            "bg-gray-100 text-gray-800"
                            }`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => navigate(`/tickets/${ticket._id}`)}
                          className="text-indigo-600 hover:underline font-medium focus:outline-none flex items-center"
                        >
                          View Details{" "}
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No tickets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupportTicket;
