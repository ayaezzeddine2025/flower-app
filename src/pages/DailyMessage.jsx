import { useState, useEffect } from "react";
import { flowers } from "../data/flowers";
import "./DailyMessage.css";
import axios from "axios";

const messages = [
  "Remember to smile today!",
  "A small step can lead to great progress.",
  "Happiness is found in little things.",
  "Take a moment to enjoy the beauty around you.",
  "You are capable of amazing things!",
  "لا تستسلم أبداً مهما كانت الصعوبات.",
  "كل يوم هو فرصة جديدة للنجاح.",
  "ثق بنفسك وقدراتك.",
  "لا تنتظر الوقت المثالي، ابدأ الآن.",
  "الحياة قصيرة، عشها بسعادة.",
  "كل يوم جديد هو فرصة لتصبح أفضل.",
  "كل تحدي هو فرصة للتطور.",
  "تعلم شيئاً جديداً كل يوم.",
  "Every challenge is a chance to grow",
  "Learn today, lead tomorrow",
  "Believe in yourself, always",
  "Trust your journey",
  "Don't stop until you're proud.",
  "Struggle today, strength tomorrow.",
  "Success is built one step at a time.",
  "يُبنى النجاح خطوة بخطوة.",
  "استمر في التقدم مهما حدث.",
  "One step at a time leads to success.",
  "خطوة بخطوة تؤدي إلى النجاح.",
  "Don't let fear hold you back.",
  "Focus on what makes you happy.",
  "ركّز على ما يجعلك سعيدًا.",
  "Rise above negativity.",
  "Believe in the power of your dreams.",
  "Every day is a chance to improve.",
  "Challenges make you stronger.",
  "Your persistence will lead to results.",
  "Be proud of how far you've come.",
  "Don't be afraid to start over."
];

function DailyMessage({ currentUser }) {
  const [flower, setFlower] = useState(null);
  const [note, setNote] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedFlower = localStorage.getItem("selectedFlower");
    let selectedFlower;

    if (storedFlower) {
      selectedFlower = JSON.parse(storedFlower);
    } else {
      const randomIndex = Math.floor(Math.random() * flowers.length);
      selectedFlower = {
        img: flowers[randomIndex].img,
        name: flowers[randomIndex].name
      };
    }

    setFlower(selectedFlower);
    const randomMsgIndex = Math.floor(Math.random() * messages.length);
    setDisplayMessage(messages[randomMsgIndex]);
  }, []);

  const saveNote = async () => {
    if (!note.trim()) {
      alert("Please write something before saving!");
      return;
    }
    if (!currentUser) {
      alert("Please log in to save your note.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/notes", {
        flowerName: flower?.name || "",
        flowerImg: flower?.img || "",
        note: note.trim(),
        username: currentUser
      });

      setNote("");
      alert("Your note is saved! It will appear on the Home page immediately.");
    } catch (err) {
      console.error("Error saving note:", err);
      alert("Failed to save note. Please try again.");
    }
    setLoading(false);
  };

  if (!flower) return <p className="message-warning">Loading...</p>;

  return (
    <div className="daily-message-page">
      <div className="daily-message-content">
        <img src={flower.img} alt={flower.name} />
        <div className="daily-message-info">
          <p>{flower.name}</p>
          <h3>{displayMessage}</h3>
        </div>
      </div>

      <div className="note-box">
        <h3>Write a message :</h3>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your note here..."
        />
        <button onClick={saveNote} disabled={!note.trim() || loading}>
          {loading ? "Saving..." : "Save Note"}
        </button>
      </div>
    </div>
  );
}

export default DailyMessage;
