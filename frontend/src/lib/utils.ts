export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getScoreMessage(score: number, total: number): string {
  const ratio = score / total;
  if (ratio === 1) return "Perfect score! You're a cybersecurity pro.";
  if (ratio >= 0.6) return "Good job! Keep learning and you'll be an expert.";
  return "Not bad for a start! There's a lot more to explore.";
}

export function getScoreEmoji(score: number, total: number): string {
  const ratio = score / total;
  if (ratio === 1) return "🏆";
  if (ratio >= 0.6) return "👏";
  return "📚";
}