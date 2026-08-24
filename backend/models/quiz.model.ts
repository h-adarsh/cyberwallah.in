// MODEL — a saved quiz attempt. Mirrors the `quiz_results` table in
// supabase/migrations/0001_init.sql.

export interface QuizResult {
  id: string;
  user_id: string;
  score: number;
  total: number;
  answers: (number | null)[] | null;
  created_at: string;
}

/** Payload for saving a new attempt (the DB fills id / user_id / created_at). */
export interface QuizResultInput {
  score: number;
  total: number;
  answers: (number | null)[];
}
