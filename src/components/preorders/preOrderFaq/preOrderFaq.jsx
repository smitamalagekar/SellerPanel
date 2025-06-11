// import { Delete, Edit, Trash } from "lucide-react"
import {  Edit, Trash } from "lucide-react"
import "./preOrderFaq.scss"
// import Switch from "../../Switch"
import { useEffect, useState } from "react";
import axios from "axios";

export default function PreOrderFaq() {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      
      // const res = await axios.get("http://localhost:5000/api/faq");
      const res = await axios.get("https://e-commerce-backend-1-0.onrender.com/api/faq");
      setFaqs(res.data);
    } catch (err) {
      console.error("Error fetching FAQs:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || !answer) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/faq", {
        question,
        answer,
      });
      setFaqs((prev) => [res.data, ...prev]);
      setQuestion("");
      setAnswer("");
    } catch (err) {
      console.error("Error adding FAQ:", err);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/faq/${id}/status`, {
        status: !currentStatus,
      });
      setFaqs((prev) =>
        prev.map((faq) =>
          faq._id === id ? { ...faq, status: res.data.status } : faq
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="PreOrderFaq ma10">
      <div className="preOrderFaqBox">
        <div className="preOrderFaqLeft">
          <div className="preOrderLeftUpper">
            <p className="allFaq">All FAQ</p>
            <input
              type="text"
              placeholder="Type to search...."
              className="searchFaq"
            />
          </div>

          <div className="preOrderLeftLower">
            <div className="table-container faqTable">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Status</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.map((faq, index) => (
                    <tr key={faq._id}>
                      <td>{index + 1}</td>
                      <td>{faq.question}</td>
                      <td>
                        <div className="toggle-item">
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={faq.status}
                              onChange={() =>
                                handleToggleStatus(faq._id, faq.status)
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="actions">
                          <div className="action">
                            <Edit color="blue" size={18} />
                          </div>
                          <div className="action">
                            <Trash color="blue" size={18} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {faqs.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        No FAQs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Section: Add FAQ */}
        <div className="preOrderFaqRight">
          <div className="preOrderFaqRightHead">
            <p className="allFaq">Add new FAQ</p>
          </div>

          <form className="faqForm" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter question"
              className="faqInp"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <textarea
              placeholder="Enter answer"
              className="faqTxt"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <div className="inpSubBox">
              <input type="submit" value="Save" className="inpSub" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
