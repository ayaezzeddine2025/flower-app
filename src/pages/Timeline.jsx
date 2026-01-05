import React, { useState, useEffect } from "react";
import { flowers } from "../data/flowers";
import "./Timeline.css";
import axios from "axios";

function Timeline({ currentUser }) {
  const [history, setHistory] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!currentUser) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/flower_history?username=${currentUser}`
        );
        setHistory(res.data);
      } catch (err) {
        console.error("❌ Error fetching history:", err);
      }
    };
    fetchHistory();
  }, [currentUser]);

  const toggleSelect = (index) => {
    setSelectedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const deleteSelected = async () => {
    if (selectedIndexes.length === 0) {
      alert("Please select at least one entry to delete.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete the selected entries?")) return;

    try {
      const selectedIds = selectedIndexes.map((i) => history[i].id);
      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`http://localhost:5000/flower_history/${id}`)
        )
      );

      const newHistory = history.filter((_, idx) => !selectedIndexes.includes(idx));
      setHistory(newHistory);
      setSelectedIndexes([]);
    } catch (err) {
      console.error("❌ Error deleting entries:", err);
      alert("Failed to delete entries.");
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
            const flower =
              flowers.find((f) => f.id === entry.flowerId) || {
                img: entry.flowerImg,
                name: entry.flowerName,
              };

            return (
              <li
                key={entry.id}
                className={`timeline-entry ${entry.favorite ? "favorite" : ""} ${
                  selectedIndexes.includes(index) ? "selected" : ""
                }`}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {flower.img && (
                    <img
                      src={flower.img}
                      alt={flower.name}
                      className="timeline-flower-img"
                    />
                  )}
                  <div className="entry-details">
                    <span className="flower-name">
                      {flower.name}{" "}
                      {entry.favorite && (
                        <span className="flower-favorite">★ Favorite</span>
                      )}
                    </span>
                    <span className="flower-date">
                      {entry.date && new Date(entry.date).toLocaleDateString()}
                    </span>
                    {entry.note && <p className="flower-note">Note: {entry.note}</p>}
                  </div>
                </div>

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
