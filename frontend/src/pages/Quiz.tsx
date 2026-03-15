import { useState } from "react";

const GOOGLE_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbyEx0axzmv9zxREvbwup-RPKFIpiUKhW1f8Bxbl9XYEViJumCA0IBjh6yEiLPH5xnZQhQ/exec";

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
  const [stage, setStage] = useState<Stage>("quiz");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [feedback, setFeedback] = useState({ name: "", email: "", age: "", phone: "", location: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
        <h2 className="text-3xl font-bold mb-3">Welcome, {feedback.name}!</h2>
        <p className="text-gray-400 mb-2">
          You scored <span className="text-white font-semibold">{score}/{questions.length}</span> on the quiz.
        </p>
        <p className="text-gray-500 text-sm">
          We'll be in touch at <span className="text-blue-400">{feedback.email}</span>.
        </p>
      </section>
    );
  }

  // Community join form after results
  if (stage === "form") {
    const allFilled = feedback.name && feedback.email && feedback.age && feedback.location;
    return (
      <section className="max-w-xl mx-auto px-6 py-16">
        <div className="mb-8 p-4 bg-[#111] border border-white/5 rounded-2xl text-center">
          <p className="text-gray-400 text-sm mb-1">Your Score</p>
          <p className="text-3xl font-bold">{score} <span className="text-gray-500 text-xl font-normal">/ {questions.length}</span></p>
          <p className="text-gray-400 text-sm mt-1">{percentage}% — {score >= 8 ? "Excellent work!" : score >= 5 ? "Good effort!" : "Keep learning!"}</p>
        </div>
        <h2 className="text-3xl font-bold mb-2">Share Feedback</h2>
        <p className="text-gray-500 mb-8 text-sm">Share your details and let us know how you did.</p>
        <form onSubmit={handleFeedbackSubmit} className="grid gap-4">
          {[
            { label: "Full Name", id: "name", type: "text", placeholder: "Your name", required: true },
            { label: "Email Address", id: "email", type: "email", placeholder: "your@email.com", required: true },
            { label: "Age", id: "age", type: "number", placeholder: "e.g. 20", required: true },
            { label: "Phone Number (Optional)", id: "phone", type: "tel", placeholder: "+91 XXXXX XXXXX", required: false },
            { label: "Where are you from?", id: "location", type: "text", placeholder: "City, State", required: true },
          ].map(({ label, id, type, placeholder, required }) => (
            <div key={id} className="flex flex-col gap-1.5">
              <label htmlFor={id} className="text-sm text-gray-400">{label}</label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                required={required}
                value={feedback[id as keyof typeof feedback]}
                onChange={(e) => setFeedback({ ...feedback, [id]: e.target.value })}
                className="w-full bg-[#141414] border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none transition-colors"
              />
            </div>
          ))}
          {submitError && <p className="text-red-400 text-sm">{submitError}</p>}
          <button
            type="submit"
            disabled={!allFilled || isSubmitting}
            className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white font-semibold rounded-xl"
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
        <h2 className="text-4xl font-bold mb-3">{score} / {questions.length} Correct</h2>
        <p className="text-gray-400 text-lg mb-10">{percentage}% — {score >= 8 ? "Excellent work!" : score >= 5 ? "Good effort!" : "Keep learning!"}</p>
        <div className="space-y-3 text-left mb-10">
          {questions.map((q, idx) => (
            <div key={idx} className="bg-[#111] border border-white/5 rounded-2xl p-5">
              <p className="text-sm text-gray-400 mb-1">Q{idx + 1}. {q.question}</p>
              {selected[idx] === q.answer ? (
                <p className="text-green-400 text-sm font-medium">&#10003; Correct</p>
              ) : (
                <p className="text-red-400 text-sm font-medium">
                  &#10007; Incorrect — <span className="text-gray-300">{q.options[q.answer]}</span>
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setStage("form")}
            className="bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold px-8 py-3 rounded-xl"
          >
            Share Feedback →
          </button>
          <button
            onClick={() => { setCurrent(0); setSelected(Array(questions.length).fill(null)); setStage("quiz"); }}
            className="bg-white/10 hover:bg-white/20 transition-colors text-white font-semibold px-8 py-3 rounded-xl"
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
        <span className="text-gray-500 text-sm">Question {current + 1} of {questions.length}</span>
        <span className="text-blue-400 text-sm font-medium">
          {selected.filter((s) => s !== null).length} answered
        </span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-1.5 mb-8">
        <div
          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-[#111] border border-white/5 rounded-2xl p-6 mb-6">
        <p className="font-semibold text-white text-lg mb-6">
          <span className="text-blue-400 mr-2">{current + 1}.</span>{q.question}
        </p>
        <div className="space-y-2">
          {q.options.map((opt, oIdx) => (
            <button
              key={oIdx}
              onClick={() => handleSelect(oIdx)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border ${
                selected[current] === oIdx
                  ? "border-blue-500 bg-blue-950/40 text-white"
                  : "border-white/10 bg-white/3 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              <span className="text-gray-500 mr-3">{String.fromCharCode(65 + oIdx)}.</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="px-6 py-2.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white font-semibold rounded-xl text-sm"
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          disabled={selected[current] === null}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white font-semibold rounded-xl text-sm"
        >
          {current < questions.length - 1 ? "Next →" : "Submit Quiz →"}
        </button>
      </div>
    </section>
  );
}
