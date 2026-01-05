import React, { useState } from "react";
import { flowers } from "../data/flowers";
import "./PickFlower.css";
import axios from "axios";

function PickFlower({ currentUser }) {
  const [selected, setSelected] = useState(null);
  const [entryId, setEntryId] = useState(null); // ✅ store the DB row id

  // Handle flower selection
  const handleSelect = async (flower) => {
    setSelected(flower);

    // Play sound if available
    if (flower.sound) {
      const audio = new Audio(flower.sound);
      audio.play();
    }

    // Save selected flower in localStorage for DailyMessage
    localStorage.setItem(
      "selectedFlower",
      JSON.stringify({ id: flower.id, name: flower.name, img: flower.img })
    );

    // Save to backend history once
    if (currentUser) {
      try {
        const res = await axios.post("http://localhost:5000/flower_history", {
          username: currentUser,
          flowerId: flower.id,
          flowerName: flower.name,
          favorite: false,
          note: ""
        });
        setEntryId(res.data.id); // ✅ capture the inserted row id
        console.log("✅ Flower saved to timeline");
      } catch (err) {
        console.error("❌ Error saving history:", err);
      }
    }
  };

  // Update favorite status instead of inserting again
  const addToFavorites = async () => {
    if (!selected || !currentUser || !entryId) return;

    try {
      await axios.put(`http://localhost:5000/flower_history/${entryId}/favorite`, {
        favorite: true
      });
      alert(`${selected.name} marked as favorite!`);
    } catch (err) {
      console.error("❌ Error updating favorite:", err);
      alert("Failed to update favorite.");
    }
  };

  return (
    <div className="flower-page">
      {!selected ? (
        <div className="flower-grid">
          {flowers.map((f) => (
            <div
              key={f.id}
              className="flower-card"
              onClick={() => handleSelect(f)}
            >
              <img src={f.img} alt={f.name} />
              <p>{f.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="selected-flower-row">
          <img src={selected.img} alt={selected.name} />
          <div className="flower-info">
            <h2>{selected.name}</h2>

            {/* Show meaning */}
            {selected.meaning && (
              <p>
                <strong>Meaning:</strong> {selected.meaning}
              </p>
            )}

            {/* Show properties */}
            {selected.properties && selected.properties.length > 0 && (
              <>
                <p>
                  <strong>Properties:</strong>
                </p>
                <ul>
                  {selected.properties.map((prop, index) => (
                    <li key={index}>{prop}</li>
                  ))}
                </ul>
              </>
            )}

            <button onClick={addToFavorites}>Add to Favorites</button>
            <button
              onClick={() => setSelected(null)}
              style={{ marginLeft: "1rem" }}
            >
              Back to List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PickFlower;
