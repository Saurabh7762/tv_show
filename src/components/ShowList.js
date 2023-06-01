import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShowList.css";
import ShowDetails from "./ShowDetails";

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        setShows(response.data);
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };

    fetchShows();
  }, []);

  const handleSelectShow = (show) => {
    setSelectedShow(show);
  };

  const handleGoBack = () => {
    setSelectedShow(null);
  };

  const truncateSummary = (summary, maxLength) => {
    const strippedSummary = summary.replace(/(<([^>]+)>)/gi, "");
    if (strippedSummary.length > maxLength) {
      return strippedSummary.substring(0, maxLength) + "...";
    }
    return strippedSummary;
  };

  useEffect(() => {
    const filteredShows = shows.filter((show) =>
      show.show.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredShows);
  }, [searchTerm, shows]);

  if (selectedShow) {
    return <ShowDetails show={selectedShow} onClose={handleGoBack} />;
  }

  return (
    <>
      <h1 className="show-list-title">TV Shows</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search TV show..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {searchResults.length === 0 && searchTerm.length > 0 && (
        <p className="show_message">No shows found.</p>
      )}
      <div className="show-list-container">
        {(searchResults.length === 0 ? shows : searchResults).map((show) => (
          <div key={show.show.id} className="show-card">
            <div className="show-card-left">
              <img
                className="show-image"
                src={
                  show.show.image?.medium ||
                  "https://via.placeholder.com/210x295"
                }
                alt={show.show.name}
              />
            </div>
            <div className="show-card-right">
              <h2 className="show-name">{show.show.name}</h2>
              <div className="show-details">
                <div>
                  <strong>Language:</strong> {show.show.language}
                </div>
                <div>
                  <strong>Genres:</strong> {show.show.genres.join(", ")}
                </div>
                <div>
                  <strong>Premiered:</strong> {show.show.premiered}
                </div>
                <div>
                  <strong>Rating:</strong> {show.show.rating?.average || "N/A"}
                </div>
              </div>
              <p className="show-summary">
                {truncateSummary(show.show.summary, 100)}
              </p>
              <button
                className="show-details-btn"
                onClick={() => handleSelectShow(show.show)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowList;
