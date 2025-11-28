import React, { useState } from "react";
import { flowers } from "../data/flowers";
import "./Timeline.css";

function Timeline() {
  const currentUser = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.username === currentUser);

  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [history, setHistory] = useState(user?.history || []);

  // Toggle checkbox selection
  const toggleSelect = (index) => {
    setSelectedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Delete all selected entries
  const deleteSelected = () => {
    if (selectedIndexes.length === 0) {
      alert("Please select at least one entry to delete.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete the selected entries?")) return;

    const newHistory = history.filter((_, idx) => !selectedIndexes.includes(idx));
    setHistory(newHistory);
    setSelectedIndexes([]);

    // Update localStorage
    if (user) {
      user.history = newHistory;
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  return (
    <div className="timeline-page">
      {history.length > 0 && (
        <button className="delete-selected-btn" onClick={deleteSelected}>
          Delete Selected
        </button>
      )}

      <h2>Your Flower Timeline</h2>

      {history.length === 0 ? (
        <p className="timeline-empty">No flowers picked yet. Pick a flower first!</p>
      ) : (
        <ul>
          {history.map((entry, index) => {
            const flower = flowers.find(f => f.id === entry.flowerId);
            if (!flower) return null;

            return (
              <li
                key={index}
                className={`timeline-entry ${entry.favorite ? "favorite" : ""} ${
                  selectedIndexes.includes(index) ? "selected" : ""
                }`}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={flower.img} alt={flower.name} />
                  <div className="entry-details">
                    <span className="flower-name">
                      {flower.name} {entry.favorite && <span className="flower-favorite">★</span>}
                    </span>
                    <span className="flower-date">{new Date(entry.date).toLocaleDateString()}</span>
                    {entry.note && <p className="flower-note">Note: {entry.note}</p>}
                  </div>
                </div>

                {/* Checkbox on the right */}
                <input
                  type="checkbox"
                  checked={selectedIndexes.includes(index)}
                  onChange={() => toggleSelect(index)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Timeline;
