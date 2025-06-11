import React, { useState } from 'react';
//  import { useParams } from 'react-router-dom';

const ProductQuestionAnswer = ({ productName, initialQuestion, initialTimestamp }) => {

    // const { userId } = useParams();
    const [reply, setReply] = useState('');
    const [sent, setSent] = useState(false);

    const handleInputChange = (event) => {
        setReply(event.target.value);
        setSent(false);
    };

    const handleSend = () => {
        if (reply.trim()) {
            console.log('Sending reply:', reply);
            // In a real application, you would send this reply to your backend
            setReply('');
            setSent(true);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mx-auto mt-10 sm:px-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{productName}</h2>
            <div className="mb-6 border-b border-gray-200 pb-6">
                <p className="text-sm text-gray-500 mb-2">{initialTimestamp}</p>
                <p className="text-gray-700">{initialQuestion}</p>
            </div>
            <div className="flex flex-col items-end">
                <textarea
                    className="border border-gray-300 rounded-md p-4 w-full mb-4 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Type your reply"
                    rows="6"
                    value={reply}
                    onChange={handleInputChange}
                />
                <button
                    className="bg-blue-500 text-white rounded-md px-6 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-600"
                    onClick={handleSend}
                    disabled={sent}
                >
                    {sent ? 'Sent' : 'Send'}
                </button>
            </div>
        </div>
    );
};

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 md:px-8 lg:px-10">
      <ProductQuestionAnswer
        productName="Hummer EV 2025 | Experience unmatched power and innovation with the 2025 Hummer EV, the ultimate blend of rugged performance."
        initialQuestion="Does this support iPhone?"
        initialTimestamp="3 months ago"
      />
    </div>
  );
};

export default App;
