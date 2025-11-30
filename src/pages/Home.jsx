import React, { useState, useEffect } from "react";
import { flowers } from "../data/flowers";
import "./Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const currentUser = localStorage.getItem("currentUser") || "guest";

  const loadNotes = () => {
    const storedNotes = JSON.parse(localStorage.getItem("Notes") || "[]");
    setNotes(storedNotes);
  };

  useEffect(() => {
    loadNotes();
    const handleStorage = () => loadNotes();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const deleteNote = (index) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    localStorage.setItem("Notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  return (
    <div className="home">
      <h1>🌸 Flower Notes 🌸</h1>

      {notes.length === 0 && (
        <p className="encouragement">
          🌱 No notes yet. Be the first to write your note in Daily Message!
        </p>
      )}

      {notes.map((entry, index) => {
        const flower = flowers.find((f) => f.id === entry.flowerId);
        if (!flower) return null;

        return (
          <div key={index} className="note-entry">
            <img src={flower.img} alt={flower.name} />
            <div className="note-info">
              <p>{entry.note}</p>
              <p className="note-date">{new Date(entry.date).toLocaleString()}</p>
            </div>
            {entry.username === currentUser && (
              <button className="delete-btn" onClick={() => deleteNote(index)}>
                Delete
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Home;
