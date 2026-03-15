export function NewsletterCTA() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 pb-14 md:pb-20">
      <div className="bg-blue-950/30 border border-blue-800/30 rounded-3xl p-8 sm:p-12 md:p-16 text-center">

        <div className="text-4xl md:text-5xl mb-5 md:mb-6">🧠</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Cybersecurity Quiz</h2>
        <p className="text-gray-400 mb-6 md:mb-8 max-w-md mx-auto text-base md:text-lg">
          Test your knowledge with 10 quick questions.
        </p>
        <a
          href="/quiz"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-2xl"
        >
          Start Quiz →
        </a>

      </div>
    </section>
  );
}