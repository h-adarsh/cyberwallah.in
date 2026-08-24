// Top-level barrel for the backend layer.
//
// Canonical imports for app code:
//   import { authService, profileService, quizService } from "@backend/services";
//   import type { Profile, QuizResult } from "@backend/models";
//
// The Supabase client itself lives at "@backend/client" and is intentionally
// NOT re-exported here — only the service layer should touch it.
export * from "./models";
export * from "./services";
