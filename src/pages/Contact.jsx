import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("❌ All fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/contact", form);
      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("❌ Error sending message:", err);
      setStatus("❌ Failed to send message. Please try again.");
    }
  };

  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
        />
        <button type="submit">Send</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default Contact;
