import React, { useState, useEffect } from "react";
import { flowers } from "../data/flowers";
import "./DailyMessage.css";

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
    'Every challenge is a chance to grow',
    'Learn today, lead tomorrow',
    "Believe in yourself, always",
    "Trust your journey",
    "You are capable of amazing things." ,
    "Don't stop until you're proud." ,
    "Struggle today, strength tomorrow.",
    "Struggle today, strength tomorrow.",
    "Success is built one step at a time.",
    "يُبنى النجاح خطوة بخطوة.",
    "استمر في التقدم مهما حدث.",
    "One step at a time leads to success.",
    " خطوة بخطوة تؤدي إلى النجاح.",
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

function DailyMessage() {
  const [flower, setFlower] = useState(null);
  const [note, setNote] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");

  const currentUser = localStorage.getItem("currentUser") || "guest";

  useEffect(() => {
    // Pick the last selected flower or a random one
    const lastFlowerId = localStorage.getItem("lastFlowerId");
    let selectedFlower;

    if (lastFlowerId) {
      selectedFlower = flowers.find(f => f.id === Number(lastFlowerId));
    }

    if (!selectedFlower) {
      const randomIndex = Math.floor(Math.random() * flowers.length);
      selectedFlower = flowers[randomIndex];
    }

    setFlower(selectedFlower);
    localStorage.setItem("lastFlowerId", selectedFlower.id);

    // Pick a random message from the new messages array
    const randomMsgIndex = Math.floor(Math.random() * messages.length);
    setDisplayMessage(messages[randomMsgIndex]);
  },[]);

  const saveNote = () => {
    if (!note.trim()) {
      alert("Please write something before saving!");
      return;
    }

    const allNotes = JSON.parse(localStorage.getItem("Notes") || "[]");
    allNotes.push({
      flowerId: flower.id,
      flowerName: flower.name,
      note: note.trim(),
      date: new Date().toISOString(),
      username: currentUser,
    });
    localStorage.setItem("Notes", JSON.stringify(allNotes));

    window.dispatchEvent(new Event("storage"));
    setNote("");
    alert("Your note is saved! It will appear on the Home page immediately.");
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
        <button onClick={saveNote} disabled={!note.trim()}>
          Save Note
        </button>
      </div>
    </div>
  );
}

export default DailyMessage;
