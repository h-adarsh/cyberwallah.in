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

export interface BlogPost {
  slug: string;
  locale: "en" | "hi";
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: number;
  published: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface Resource {
  name: string;
  description: string;
  url: string;
  category: "VPN" | "Learning" | "Tools" | "Books" | "Practice";
  affiliate: boolean;
  free: boolean;
}