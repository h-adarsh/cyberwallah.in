import { useState } from "react";
import { QUIZ_QUESTIONS } from "../constants/quiz";
import type { QuizAnswer, CommunityFormData } from "../types";

type QuizStage = "intro" | "playing" | "results" | "form" | "success";

export function useQuiz() {
  const [stage, setStage] = useState<QuizStage>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [formData, setFormData] = useState<CommunityFormData>({
    name: "",
    email: "",
    age: "",
    location: "",
  });

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const score = answers.filter((a) => a.isCorrect).length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleStart = () => setStage("playing");

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedIndex: index,
        isCorrect: index === currentQuestion.correctIndex,
      },
    ]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setStage("results");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    }
  };

  const handleShowForm = () => setStage("form");

  const handleFormChange = (field: keyof CommunityFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = () => {
    const { name, email, age, location } = formData;
    if (!name || !email || !age || !location) return;
    setStage("success");
  };

  const handleReset = () => {
    setStage("intro");
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setFormData({ name: "", email: "", age: "", location: "" });
  };

  return {
    stage,
    currentIndex,
    currentQuestion,
    totalQuestions,
    selectedOption,
    score,
    isLastQuestion,
    formData,
    handleStart,
    handleSelectOption,
    handleNext,
    handleShowForm,
    handleFormChange,
    handleFormSubmit,
    handleReset,
  };
}