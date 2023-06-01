import React, { useState } from "react";
import "./ShowDetails.css";
import BookingForm from "./BookingForm";

const ShowDetails = ({ show, onClose }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookTicket = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleGoBack = () => {
    onClose(); // Call the callback function provided by the parent component
  };

  const truncateSummary = (summary, maxLength) => {
    const strippedSummary = summary.replace(/(<([^>]+)>)/gi, "");
    if (strippedSummary.length > maxLength) {
      return strippedSummary.substring(0, maxLength) + "...";
    }
    return strippedSummary;
  };

  return (
    <div className="show-details-container">
      <div className="show-image-container">
        <img
          className="show-image"
          src={show.image?.medium || "https://via.placeholder.com/210x295"}
          alt={show.name}
        />
      </div>
      <div className="show-content">
        <div className="show-info">
          <h1 className="show-name">{show.name}</h1>
          <div className="show-meta">
            <span className="show-meta-item">Language: {show.language}</span>
            <span className="show-meta-item">
              Genres: {show.genres.join(", ")}
            </span>
            <span className="show-meta-item">Premiered: {show.premiered}</span>
            <span className="show-meta-item">
              Rating: {show.rating?.average || "N/A"}
            </span>
          </div>
          <div className="show-summary">
            <h3 className="show-summary-title">Summary</h3>
            <div className="show-summary-text">
              {truncateSummary(show.summary)}
            </div>
          </div>
          <button className="book-ticket-btn" onClick={handleBookTicket}>
            Book Ticket
          </button>
          <button className="close-btn" onClick={handleGoBack}>
            Close
          </button>
        </div>
      </div>
      {isBookingOpen && (
        <BookingForm
          show={show}
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );
};

export default ShowDetails;
