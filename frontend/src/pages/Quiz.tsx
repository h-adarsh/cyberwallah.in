import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { quizService } from "@backend/services";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string;

const questions = [
  {
    question: "What is the most effective way to create a strong password?",
    options: [
      "Use your birthdate",
      "Use a mix of letters, numbers, and symbols",
      'Use the word "password"',
      "Use only lowercase letters",
    ],
    answer: 1,
  },
  {
    question: "Which of the following is a sign of phishing?",
    options: [
      "Unexpected email asking for personal info",
      "Email from a known contact",
      "Email with no links",
      "Email with a friendly greeting",
    ],
    answer: 0,
  },
  {
    question: "What should you do if you receive a suspicious link?",
    options: [
      "Click it immediately",
      "Ignore and delete it",
      "Forward to friends",
      "Reply to sender",
    ],
    answer: 1,
  },
  {
    question: "Which device is safest to use for online banking?",
    options: [
      "Public computer",
      "Friend's phone",
      "Your personal device",
      "Shared tablet",
    ],
    answer: 2,
  },
  {
    question: "What is two-factor authentication?",
    options: [
      "Using two passwords",
      "A security method requiring two forms of verification",
      "Logging in twice",
      "Using two devices",
    ],
    answer: 1,
  },
  {
    question: "How can you protect your personal information online?",
    options: [
      "Share on social media",
      "Use privacy settings",
      "Post everywhere",
      "Ignore security warnings",
    ],
    answer: 1,
  },
  {
    question: "What is the safest way to connect to public Wi-Fi?",
    options: [
      "Without a password",
      "Using a VPN",
      "Sharing credentials",
      "Connecting automatically",
    ],
    answer: 1,
  },
  {
    question: "Which is a good practice for social media security?",
    options: [
      "Accept all friend requests",
      "Use strong, unique passwords",
      "Share your location always",
      "Post personal details",
    ],
    answer: 1,
  },
  {
    question: "What should you do if your account is hacked?",
    options: [
      "Do nothing",
      "Change your password and notify support",
      "Tell no one",
      "Delete your account",
    ],
    answer: 1,
  },
  {
    question: "Why should you update your software regularly?",
    options: [
      "To get new features",
      "To fix security vulnerabilities",
      "To slow down your device",
      "No reason",
    ],
    answer: 1,
  },
];

type Stage = "quiz" | "results" | "form" | "success";

export default function Quiz() {
  const { user, profile } = useAuth();
  const [stage, setStage] = useState<Stage>("quiz");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [feedback, setFeedback] = useState({ name: "", email: "", age: "", phone: "", location: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Prefill the feedback form from the signed-in user's profile.
  useEffect(() => {
    if (!user) return;
    setFeedback((f) => ({
      ...f,
      name: f.name || profile?.full_name || "",
      email: f.email || user.email || "",
      age: f.age || (profile?.age != null ? String(profile.age) : ""),
      location: f.location || profile?.location || "",
    }));
  }, [user, profile]);

  const score = selected.filter((ans, idx) => ans === questions[idx].answer).length;
  const percentage = Math.round((score / questions.length) * 100);

  const handleSelect = (oIdx: number) => {
    const updated = [...selected];
    updated[current] = oIdx;
    setSelected(updated);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setStage("results");
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleFeedbackSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      timestamp: new Date().toISOString(),
      name: feedback.name,
      email: feedback.email,
      age: feedback.age,
      phone: feedback.phone,
      location: feedback.location,
      score,
      totalQuestions: questions.length,
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Also persist to the user's account when signed in (with per-question answers).
      if (user) {
        const { error } = await quizService.saveResult(user.id, {
          score,
          total: questions.length,
          answers: selected,
        });
        if (error) console.error("[quiz] failed to save result:", error);
      }

      setStage("success");
    } catch {
      setSubmitError("Unable to submit right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (stage === "success") {
    return (
      <section className="max-w-xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-6">&#127881;</div>
        <h2 className="font-display text-3xl font-bold mb-3 text-[var(--color-text-primary)]">
          Welcome, {feedback.name}!
        </h2>
        <p className="text-[var(--color-text-muted)] mb-2">
          You scored{" "}
          <span className="font-semibold text-[var(--color-text-primary)]">
            {score}/{questions.length}
          </span>{" "}
          on the quiz.
        </p>
        <p className="text-[var(--color-text-dim)] text-sm">
          We'll be in touch at{" "}
          <span className="text-[var(--color-electric-400)]">{feedback.email}</span>.
        </p>
      </section>
    );
  }

  // Community join form after results
  if (stage === "form") {
    const allFilled = feedback.name && feedback.email && feedback.age && feedback.location;
    return (
      <section className="max-w-xl mx-auto px-6 py-16">
        <div className="glass mb-8 rounded-2xl border border-[var(--color-border-subtle)] p-4 text-center">
          <p className="text-[var(--color-text-muted)] text-sm mb-1">Your Score</p>
          <p className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
            {score}{" "}
            <span className="text-xl font-normal text-[var(--color-text-dim)]">/ {questions.length}</span>
          </p>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            {percentage}% — {score >= 8 ? "Excellent work!" : score >= 5 ? "Good effort!" : "Keep learning!"}
          </p>
        </div>
        <h2 className="font-display text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Share Feedback
        </h2>
        <p className="text-[var(--color-text-dim)] mb-8 text-sm">
          Share your details and let us know how you did.
        </p>
        <form onSubmit={handleFeedbackSubmit} className="grid gap-4">
          {[
            { label: "Full Name", id: "name", type: "text", placeholder: "Your name", required: true },
            { label: "Email Address", id: "email", type: "email", placeholder: "your@email.com", required: true },
            { label: "Age", id: "age", type: "number", placeholder: "e.g. 20", required: true },
            { label: "Phone Number (Optional)", id: "phone", type: "tel", placeholder: "+91 XXXXX XXXXX", required: false },
            { label: "Where are you from?", id: "location", type: "text", placeholder: "City, State", required: true },
          ].map(({ label, id, type, placeholder, required }) => (
            <div key={id} className="flex flex-col gap-1.5">
              <label htmlFor={id} className="text-sm text-[var(--color-text-secondary)]">{label}</label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                required={required}
                value={feedback[id as keyof typeof feedback]}
                onChange={(e) => setFeedback({ ...feedback, [id]: e.target.value })}
                className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-dim)] outline-none transition-all focus:border-[var(--color-electric-500)] focus:shadow-[var(--shadow-glow-sm)]"
              />
            </div>
          ))}
          {submitError && <p className="text-[var(--color-danger)] text-sm">{submitError}</p>}
          <button
            type="submit"
            disabled={!allFilled || isSubmitting}
            className="mt-2 w-full rounded-xl bg-gradient-primary py-3 font-semibold text-white transition-all hover:shadow-[var(--shadow-glow-md)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback →"}
          </button>
        </form>
      </section>
    );
  }

  // Results screen
  if (stage === "results") {
    return (
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-6">{score >= 8 ? "🎉" : score >= 5 ? "👍" : "😅"}</div>
        <h2 className="font-display text-4xl font-bold mb-3 text-[var(--color-text-primary)]">
          {score} / {questions.length} Correct
        </h2>
        <p className="text-[var(--color-text-muted)] text-lg mb-10">
          {percentage}% — {score >= 8 ? "Excellent work!" : score >= 5 ? "Good effort!" : "Keep learning!"}
        </p>
        <div className="space-y-3 text-left mb-10">
          {questions.map((q, idx) => (
            <div key={idx} className="glass rounded-2xl border border-[var(--color-border-subtle)] p-5">
              <p className="text-sm text-[var(--color-text-muted)] mb-1">Q{idx + 1}. {q.question}</p>
              {selected[idx] === q.answer ? (
                <p className="text-[var(--color-electric-400)] text-sm font-medium">&#10003; Correct</p>
              ) : (
                <p className="text-[var(--color-danger)] text-sm font-medium">
                  &#10007; Incorrect — <span className="text-[var(--color-text-secondary)]">{q.options[q.answer]}</span>
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setStage("form")}
            className="rounded-xl bg-gradient-primary px-8 py-3 font-semibold text-white transition-all hover:shadow-[var(--shadow-glow-md)]"
          >
            Share Feedback →
          </button>
          <button
            onClick={() => { setCurrent(0); setSelected(Array(questions.length).fill(null)); setStage("quiz"); }}
            className="glass rounded-xl border border-[var(--color-border-default)] px-8 py-3 font-semibold text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
          >
            Retry Quiz
          </button>
        </div>
      </section>
    );
  }

  // Quiz slide
  const q = questions[current];
  return (
    <section className="max-w-2xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[var(--color-text-dim)] text-sm">Question {current + 1} of {questions.length}</span>
        <span className="text-[var(--color-electric-400)] text-sm font-medium">
          {selected.filter((s) => s !== null).length} answered
        </span>
      </div>
      <div className="w-full rounded-full bg-[var(--color-electric-950)]/60 h-1.5 mb-8">
        <div
          className="bg-gradient-primary h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="glass rounded-2xl border border-[var(--color-border-subtle)] p-6 mb-6">
        <p className="font-semibold text-[var(--color-text-primary)] text-lg mb-6">
          <span className="text-[var(--color-electric-400)] mr-2">{current + 1}.</span>{q.question}
        </p>
        <div className="space-y-2">
          {q.options.map((opt, oIdx) => (
            <button
              key={oIdx}
              onClick={() => handleSelect(oIdx)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border ${
                selected[current] === oIdx
                  ? "border-[var(--color-border-glow)] bg-[var(--color-electric-500)]/12 text-[var(--color-text-primary)] shadow-[var(--shadow-glow-sm)]"
                  : "border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/40 text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <span className="text-[var(--color-text-dim)] mr-3">{String.fromCharCode(65 + oIdx)}.</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="glass rounded-xl border border-[var(--color-border-default)] px-6 py-2.5 text-sm font-semibold text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          disabled={selected[current] === null}
          className="rounded-xl bg-gradient-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[var(--shadow-glow-md)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
        >
          {current < questions.length - 1 ? "Next →" : "Submit Quiz →"}
        </button>
      </div>
    </section>
  );
}
