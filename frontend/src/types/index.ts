export interface NavItem {
  label: string;
  path: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface QuizAnswer {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
}

export interface CommunityFormData {
  name: string;
  email: string;
  age: string;
  location: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface LearnCard {
  icon: string;
  title: string;
  description: string;
}