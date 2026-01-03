import React, { useState } from "react";
import { flowers } from "../data/flowers";
import "./PickFlower.css";
import axios from "axios";

function PickFlower() {
  const [selected, setSelected] = useState(null);
  const currentUser = localStorage.getItem("currentUser");

  const handleSelect = async (flower) => {
    setSelected(flower);

    const audio = new Audio(flower.sound);
    audio.play();

    // Save selection to backend history
    if (currentUser) {
      try {
        await axios.post("http://localhost:5000/history", {
          username: currentUser,
          flowerId: flower.id,
          flowerName: flower.name,
          date: new Date(),
          favorite: false,
        });
      } catch (err) {
        console.error("Error saving history:", err);
      }
    }
  };

  const addToFavorites = async () => {
    if (!selected || !currentUser) return;

    try {
      await axios.post("http://localhost:5000/history", {
        username: currentUser,
        flowerId: selected.id,
        flowerName: selected.name,
        date: new Date(),
        favorite: true,
      });
      alert(`${selected.name} added to favorites!`);
    } catch (err) {
      console.error("Error adding to favorites:", err);
      alert("Failed to add to favorites.");
    }
  };

  return (
    <div className="flower-page">
      {!selected ? (
        <div className="flower-grid">
          {flowers.map(f => (
            <div key={f.id} className="flower-card" onClick={() => handleSelect(f)}>
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
            <p><strong>Meaning:</strong> {selected.meaning}</p>
            <p><strong>Properties:</strong></p>
            <ul>
              {selected.properties.map((prop, index) => (
                <li key={index}>{prop}</li>
              ))}
            </ul>

            <button onClick={addToFavorites}>Add to Favorites</button>
            <button onClick={() => setSelected(null)} style={{ marginLeft: "1rem" }}>
              Back to List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PickFlower;
