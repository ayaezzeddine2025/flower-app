import React, { useState, useEffect } from "react";
import axios from "axios"; // new import
import { flowers } from "../data/flowers";
import "./Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const currentUser = localStorage.getItem("currentUser") || "guest";

  // fetch notes from backend
  const loadNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/notes"); // backend API
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  // delete note using backend
  const deleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(`http://localhost:5000/notes/${noteId}`); // backend delete
      // update frontend state after deletion
      setNotes(notes.filter((note) => note.id !== noteId));
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

      {notes.map((entry) => {
        const flower = flowers.find((f) => f.id === entry.flowerId);
        if (!flower) return null;

        return (
          <div key={entry.id} className="note-entry">
            <img src={flower.img} alt={flower.name} />
            <div className="note-info">
              <p>{entry.note}</p>
              <p className="note-date">
                {new Date(entry.date).toLocaleString()}
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
        );
      })}
    </div>
  );
}

export default Home;
