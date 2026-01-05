import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

function Home({ currentUser }) {
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const deleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(`http://localhost:5000/notes/${noteId}`);
      setNotes(prev => prev.filter((note) => note.id !== noteId));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div className="home">
      <h1>🌸 Flower Notes 🌸</h1>

      {notes.length === 0 && (
        <p className="encouragement">
          🌱 No notes yet. Be the first to write your note in Daily Message!
        </p>
      )}

      {notes.map((entry) => (
        <div key={entry.id} className="note-entry">
          {entry.flowerImg && (
            <img src={entry.flowerImg} alt={entry.flowerName || "Flower"} />
          )}
          <div className="note-info">
            <p>{entry.note}</p>
            <p className="note-meta">
              {entry.flowerName ? `Flower: ${entry.flowerName} • ` : ""}
              {entry.username ? `By: ${entry.username} • ` : ""}
              {entry.date && new Date(entry.date).toLocaleString()}
            </p>
          </div>
          {entry.username === currentUser && (
            <button
              className="delete-btn"
              onClick={() => deleteNote(entry.id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
