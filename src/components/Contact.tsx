import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { socialLinks } from "@/data/skills";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_gzjwvpl",
        "template_equqbf9",
        {
          from_name: formData.name,
          to_name: "Safwan Sayeed",
          from_email: formData.email,
          to_email: "isafwansayeed@gmail.com",
          reply_to: formData.email,
          message: formData.message,
        },
        "lrdw7LEOLqDJVYlVT",
      );

      setAlert({ type: "success", message: "Thank you for your message! 😃" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setAlert({ type: "error", message: "I didn't receive your message 😢" });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setAlert(null), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-[#0F0F0F]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#F5F5F5] mb-4">
              Let's Talk
            </h2>
            <p className="text-lg text-[#A0A0A0] mb-8">
              Looking to create a dynamic web platform 🌐, build immersive games
              🎮, or launch a cutting-edge Android app 📱? I'm here to bring
              your ideas to life!
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-[#A0A0A0]"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., John Doe 😄"
                  className="px-4 py-4 text-base text-[#F5F5F5] bg-[#1A1A1A] border border-[#323131] rounded-lg focus:outline-none focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-[#A0A0A0]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g., name@example.com 📧"
                  className="px-4 py-4 text-base text-[#F5F5F5] bg-[#1A1A1A] border border-[#313131] rounded-lg focus:outline-none focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-[#A0A0A0]"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Drop me a message 😄, I'd love to hear from you!"
                  className="px-4 py-4 text-base text-[#F5F5F5] bg-[#1A1A1A] border border-[#313131] rounded-lg focus:outline-none focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20 transition-all resize-y min-h-[150px]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-[#E07A5F] text-[#0F0F0F] font-medium rounded-lg hover:bg-[#c96a52] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#F5F5F5] mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center gap-4 p-4 bg-[#1A1A1A] rounded-lg border border-[#313131]">
                  <div className="w-11 h-11 flex items-center justify-center bg-[#262626] rounded-md text-[#E07A5F]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B6B6B] uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-base text-[#F5F5F5]">
                      isafwansayeed@gmail.com
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 bg-[#1A1A1A] rounded-lg border border-[#313131]">
                  <div className="w-11 h-11 flex items-center justify-center bg-[#262626] rounded-md text-[#81B29A]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B6B6B] uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-base text-[#F5F5F5]">Bangalore, India</p>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-4 p-4 bg-[#1A1A1A] rounded-lg border border-[#313131]">
                  <div className="w-11 h-11 flex items-center justify-center bg-[#262626] rounded-md text-[#F2CC8F]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B6B6B] uppercase tracking-wider">
                      Availability
                    </p>
                    <p className="text-base text-[#F5F5F5]">
                      Open to Remote Work
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold text-[#F5F5F5] mb-4">
                Connect With Me
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center bg-[#1A1A1A] border border-[#313131] rounded-md hover:bg-[#E07A5F] hover:border-[#E07A5F] transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <img
                      src={`/assets/social/${social.icon}.svg`}
                      alt={social.name}
                      className="w-5 h-5 transition-all duration-300 group-hover:brightness-0"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert */}
      {alert && (
        <div
          className={`fixed top-6 right-6 px-6 py-4 rounded-lg font-medium z-50 animate-slide-in ${alert.type === "success"
              ? "bg-[#81B29A]/20 border border-[#81B29A] text-[#81B29A]"
              : "bg-[#E07A5F]/20 border border-[#E07A5F] text-[#E07A5F]"
            }`}
        >
          {alert.message}
        </div>
      )}
    </section>
  );
};

export default Contact;
