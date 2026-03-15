import type { QuizQuestion } from "../types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What does 'HTTPS' stand for?",
    options: [
      "HyperText Transfer Protocol Secure",
      "High Transfer Text Protocol System",
      "Hyper Transfer Technology Protocol Standard",
      "HyperText Transmission Protocol System",
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "What is a 'phishing' attack?",
    options: [
      "Hacking a server directly",
      "Tricking users into giving sensitive info via fake emails or sites",
      "A type of malware that encrypts files",
      "Scanning a network for open ports",
    ],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "What does 'VPN' stand for?",
    options: [
      "Virtual Public Network",
      "Verified Private Node",
      "Virtual Private Network",
      "Verified Public Network",
    ],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "Which of these is the strongest password?",
    options: ["password123", "MyName@1990", "Tr!9kL#2mZ$", "admin"],
    correctIndex: 2,
  },
  {
    id: 5,
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Using two different passwords",
      "Logging in from two devices",
      "A second layer of verification beyond just a password",
      "Encrypting data twice",
    ],
    correctIndex: 2,
  },
];