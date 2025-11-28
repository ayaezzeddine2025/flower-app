import React, { useState } from "react";
import { flowers } from "../data/flowers";
import "./PickFlower.css";

function PickFlower() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (flower) => {
    setSelected(flower);

    const audio = new Audio(flower.sound);
    audio.play();

    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === currentUser);
    if (user) {
      user.history.push({ 
        flowerId: flower.id, 
        flowerName: flower.name,
        date: new Date(),
      });
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  const addToFavorites = () => {
    if (!selected) return;

    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === currentUser);
    if (user) {
      user.history.push({
        flowerId: selected.id,
        flowerName: selected.name,
        date: new Date(),
        favorite: true,
      });
      localStorage.setItem("users", JSON.stringify(users));
      alert(`${selected.name} added to favorites!`);
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
