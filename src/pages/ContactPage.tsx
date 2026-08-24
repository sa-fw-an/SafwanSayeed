import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { profile, socialLinks } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReveal } from "@/lib/useReveal";
import { burst } from "@/lib/confetti";

const MAX_NAME = 80;
const MAX_EMAIL = 120;
const MAX_MESSAGE = 4000;

type Toast = { kind: "success" | "error"; text: string };

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const formRef = useReveal<HTMLDivElement>();

  const showToast = (t: Toast) => {
    setToast(t);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 5000);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    // Trim + length caps before anything leaves the page.
    const cleanName = name.trim().slice(0, MAX_NAME);
    const cleanEmail = email.trim().slice(0, MAX_EMAIL);
    const cleanMessage = message.trim().slice(0, MAX_MESSAGE);
    if (!cleanName || !cleanEmail || !cleanMessage) {
      showToast({ kind: "error", text: "Please fill in every field." });
      return;
    }

    setSending(true);
    emailjs
      .send(
        "service_gzjwvpl",
        "template_equqbf9",
        {
          from_name: cleanName,
          to_name: "Safwan Sayeed",
          from_email: cleanEmail,
          to_email: profile.email,
          reply_to: cleanEmail,
          message: cleanMessage,
        },
        "lrdw7LEOLqDJVYlVT",
      )
      .then(() => {
        showToast({ kind: "success", text: "Thank you for your message!" });
        burst(window.innerWidth / 2, window.innerHeight / 3);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch(() => {
        showToast({
          kind: "error",
          text: "I didn't receive your message — try again?",
        });
      })
      .finally(() => setSending(false));
  };

  return (
    <section className="section page-contact">
      <div className="shell contact-page">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Talk"
          subtitle="A web platform, a game, an Android app — or something that doesn't have a category yet. I'm listening."
        />

        <div ref={formRef} className="reveal">
          <form className="card contact__form" onSubmit={onSubmit}>
            <label className="field">
              <span className="eyebrow">Your name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                maxLength={MAX_NAME}
                required
                autoComplete="name"
              />
            </label>
            <label className="field">
              <span className="eyebrow">Your email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                maxLength={MAX_EMAIL}
                required
                autoComplete="email"
              />
            </label>
            <label className="field">
              <span className="eyebrow">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your idea…"
                maxLength={MAX_MESSAGE}
                rows={6}
                required
              />
            </label>
            <Button
              variant="accent"
              type="submit"
              disabled={sending}
              className="contact__submit"
            >
              {sending ? "Sending…" : "Send Message"}
            </Button>
          </form>

          <div className="contact-side">
            <a
              href={`mailto:${profile.email}`}
              className="card info-card"
              rel="noopener noreferrer"
            >
              <span aria-hidden="true">✉️</span>
              <span>
                <span className="eyebrow">Email</span>
                <span className="info-card__value">{profile.email}</span>
              </span>
            </a>
            <div className="card info-card">
              <span aria-hidden="true">📍</span>
              <span>
                <span className="eyebrow">Location</span>
                <span className="info-card__value">{profile.location}</span>
              </span>
            </div>
            <div className="card info-card">
              <span aria-hidden="true">💼</span>
              <span>
                <span className="eyebrow">Availability</span>
                <span className="info-card__value">{profile.availability}</span>
              </span>
            </div>
          </div>

          <h3 className="eyebrow contact-connect__label">Or find me here</h3>
          <ul className="social-row social-row--big">
            {socialLinks.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip social-row__link"
                  aria-label={s.name}
                >
                  <img
                    src={s.icon}
                    alt=""
                    width="22"
                    height="22"
                    loading="lazy"
                  />
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {toast && (
        <p role="status" className={`toast toast--${toast.kind}`}>
          {toast.text}
        </p>
      )}
    </section>
  );
}
