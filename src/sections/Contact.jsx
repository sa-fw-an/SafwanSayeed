import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

import useAlert from "../hooks/useAlert.js";
import Alert from "../components/Alert.jsx";

const Contact = () => {
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_gzjwvpl",
        "template_equqbf9",
        {
          from_name: form.name,
          to_name: "Safwan Sayeed",
          from_email: form.email,
          to_email: "isafwansayeed@gmail.com",
          message: form.message,
        },
        "lrdw7LEOLqDJVYlVT",
      );

      showAlert({
        show: true,
        text: "Thank you for your message 😃",
        type: "success",
      });

      setTimeout(() => {
        hideAlert(false);
        setForm({ name: "", email: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error(error);

      showAlert({
        show: true,
        text: "I didn't receive your message 😢",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="c-space my-20" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img
          src="./assets/terminal.png"
          alt="terminal-bg"
          className="absolute inset-0 min-h-screen"
        />

        <div className="contact-container">
          <h3 className="head-text">Let's talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Looking to create a dynamic web platform 🌐, build immersive games
            🎮, or launch a cutting-edge Android app 📱? I'm here to bring your
            ideas to life!
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col space-y-7"
          >
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="e.g., John Doe 😄"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email Address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="e.g., name@example.com 📧"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Your Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Drop me a message 😄, I'd love to hear from you!"
              />
            </label>

            <button
              className={`field-btn ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
              <img
                src="./assets/arrow-up.png"
                alt="arrow-up"
                className="field-btn_arrow"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
