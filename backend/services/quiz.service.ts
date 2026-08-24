import { supabase } from "../client";
import type { QuizResult, QuizResultInput } from "../models";

// SERVICE — quiz-result persistence and history. Owns every `quiz_results`
// query. RLS ties every row to its owner.

export const quizService = {
  /** Persist a quiz attempt for the signed-in user. */
  async saveResult(
    userId: string,
    input: QuizResultInput,
  ): Promise<{ error: string | null }> {
    const { error } = await supabase.from("quiz_results").insert({
      user_id: userId,
      score: input.score,
      total: input.total,
      answers: input.answers,
    });
    return { error: error ? error.message : null };
  },

  /** A member's quiz history, newest first (empty array on error). */
  async listResults(userId: string): Promise<QuizResult[]> {
    const { data, error } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[quiz] failed to load history:", error.message);
      return [];
    }
    return (data as QuizResult[]) ?? [];
  },
};
