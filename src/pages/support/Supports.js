import React from 'react';
import './Supports.css'; // Import the CSS file

function Supports() {
  return (
    <div className="container">
      <div className="product-info">
        <h1>Anivia Computer Headsets Over Ear Headphones Wired Gaming Headset with Mic for PC Mac PS4 PS5 Xbox One, Stereo Surround Sound, Purple</h1>
      </div>

      <div className="question-section">
        <div className="user-info">
          <img 
            src="https://static.vecteezy.com/system/resources/thumbnails/053/630/749/small/a-beautiful-young-business-woman-in-a-suit-and-tie-photo.jpeg" // Replace with the actual image URL
            alt="User Profile" 
            className="user-image" 
          />
          <div className="user-details">
            <p className="user-name">Arnulfo T. Lucky</p>
            <p className="time-ago">4 months ago</p>
          </div>
        </div>

        <div className="question">
          <p>Can I change or cancel my order after it has been placed?</p>
        </div>

        <div className="reply-section">
          <textarea placeholder="Type your reply"></textarea>
          <button className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default Supports;