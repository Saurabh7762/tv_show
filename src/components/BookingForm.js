import React, { useState } from "react";
import "./BookingForm.css";

const BookingForm = ({ show, isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "dob") {
      setDob(value);
    } else if (name === "mobile") {
      setMobile(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Form submitted with the following details:");
    console.log("Show Name:", show.name);
    console.log("Language:", show.language);
    console.log("Name:", name);
    console.log("Date of Birth:", dob);
    console.log("Mobile:", mobile);
    console.log("Email:", email);
    setBookingStatus("Ticket has been booked!"); // Update the booking status
  };

  return (
    <div className="booking-form-bg">
      {bookingStatus ? ( // Display the booking status message if available
        <div className="booking-status-message" style={{ zIndex: 150 }}>
          {bookingStatus}
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
      ) : (
        <div className={`booking-form ${isOpen ? "open" : ""}`}>
          <form onSubmit={handleSubmit}>
            <h3 className="booking-form-title">Book Ticket</h3>
            <div className="form-field">
              <label htmlFor="show-name">Show Name:</label>
              <input
                type="text"
                id="show-name"
                name="show-name"
                value={show.name}
                readOnly
              />
            </div>
            <div className="form-field">
              <label htmlFor="language">Language:</label>
              <input
                type="text"
                id="language"
                name="language"
                value={show.language}
                readOnly
              />
            </div>
            <div className="form-field">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={dob}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="submit-button">
                Submit
              </button>
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
