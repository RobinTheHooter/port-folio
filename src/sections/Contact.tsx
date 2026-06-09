"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";

const SuccessIcon = () => (
  <motion.svg viewBox="0 0 64 64" fill="none" className="size-20 mx-auto">
    <motion.circle
      cx="32"
      cy="32"
      r="29"
      strokeWidth="2.5"
      className="stroke-emerald-300"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
    <motion.path
      d="M 20 32 L 28 40 L 44 24"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-emerald-300"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
    />
  </motion.svg>
);

const ErrorIcon = () => (
  <motion.svg viewBox="0 0 64 64" fill="none" className="size-20 mx-auto">
    <motion.circle
      cx="32"
      cy="32"
      r="29"
      strokeWidth="2.5"
      className="stroke-red-400"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
    <motion.path
      d="M 22 22 L 42 42"
      strokeWidth="3.5"
      strokeLinecap="round"
      className="stroke-red-400"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.5, ease: "easeOut" }}
    />
    <motion.path
      d="M 42 22 L 22 42"
      strokeWidth="3.5"
      strokeLinecap="round"
      className="stroke-red-400"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.8, ease: "easeOut" }}
    />
  </motion.svg>
);

export const ContactSection = () => {
  const email = process.env.NEXT_PUBLIC_EMAIL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot field - real users leave this blank
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formLoadedAt = useRef(Date.now());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showSuccess = () => {
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "", website: "" });
    setTimeout(() => setSent(false), 6000);
  };

  const closeModal = () => {
    setSent(false);
    setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    // 1. Honeypot: bots fill hidden field, humans don't
    if (form.website) {
      showSuccess(); // silently pretend success
      return;
    }

    // 2. Time check: real users take more than 3 seconds to fill a form
    if (Date.now() - formLoadedAt.current < 3000) {
      showSuccess(); // silently pretend success
      return;
    }

    // 3. URL count: messages with many links are usually spam
    const urlMatches = form.message.match(/(https?:\/\/|www\.)/gi);
    if (urlMatches && urlMatches.length > 2) {
      setSubmitError(
        "Your message contains too many links. Please remove some and try again.",
      );
      return;
    }

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          from_name: form.name,
          botcheck: "", // Web3Forms native honeypot
        }),
      });
      const data = await res.json();
      if (data.success) {
        showSuccess();
      } else {
        setSubmitError(
          data.message ||
            "Something went wrong on our end. Please try again in a moment.",
        );
      }
    } catch (err) {
      setSubmitError(
        "Couldn't send your message. Please check your connection and try again.",
      );
    } finally {
      setSending(false);
    }
  };

  const inputClasses =
    "w-full bg-gray-900/60 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-300/60 focus:bg-gray-900/80 transition-colors";

  return (
    <div id="contact" className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's Create Something Amazing"
          description="Have a project in mind, a question, or just want to say hi? Drop a note and I'll get back to you."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-12 md:mt-16 max-w-2xl mx-auto"
        >
          <Card className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Honeypot: hidden from real users, bots fill it and get silently rejected */}
              <div
                className="absolute -left-[9999px] w-px h-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="website">
                  Website (leave this field blank)
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm text-white/60">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                    maxLength={100}
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm text-white/60">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    required
                    maxLength={254}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm text-white/60">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry"
                  required
                  maxLength={150}
                  className={inputClasses}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm text-white/60">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, idea, or what's on your mind…"
                  rows={6}
                  required
                  maxLength={2000}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 h-12 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-2 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>{sending ? "Sending…" : "Send Message"}</span>
                {!sending && <ArrowUpRightIcon className="size-4" />}
              </button>

              <p className="text-center text-sm text-white/40 mt-2">
                Or email me directly at{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-white/70 hover:text-emerald-300 transition-colors underline underline-offset-2"
                >
                  {email}
                </a>
              </p>
            </form>
          </Card>
        </motion.div>
      </div>

      {/* Feedback modal — success or error */}
      <AnimatePresence>
        {(sent || submitError) && (
          <motion.div
            key="feedback-modal"
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 10, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 18,
                stiffness: 220,
              }}
              className="relative w-full max-w-md"
            >
              {/* Gradient glow — extended well past the Card edges so the
                  halo is clearly visible at rest, not just during the entry
                  and exit transitions when the Card is semi-transparent */}
              <div
                aria-hidden="true"
                className={`absolute -inset-6 rounded-3xl blur-2xl -z-10 opacity-60 ${
                  sent
                    ? "bg-gradient-to-r from-emerald-300 to-sky-400"
                    : "bg-gradient-to-r from-red-400 to-orange-400"
                }`}
              />

              <Card className="p-8 md:p-10 text-center overflow-visible">
                <div className="relative">
                  {sent ? <SuccessIcon /> : <ErrorIcon />}
                </div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="font-serif text-2xl md:text-3xl mt-6"
                >
                  {sent ? "Message Sent!" : "Oops — something went wrong"}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="text-white/60 mt-3 text-sm md:text-base"
                >
                  {sent
                    ? "Thanks for reaching out — I'll get back to you soon."
                    : submitError}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  onClick={closeModal}
                  className={`mt-7 h-11 px-8 rounded-xl font-semibold inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-90 ${
                    sent
                      ? "bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900"
                      : "bg-white/10 border border-white/20 text-white"
                  }`}
                >
                  {sent ? "Awesome" : "Try Again"}
                </motion.button>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
