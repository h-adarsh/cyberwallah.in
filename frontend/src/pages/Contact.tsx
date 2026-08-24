export default function Contact() {
  return (
    <section className="max-w-xl mx-auto px-6 py-20">
      <h1 className="font-display text-4xl font-bold mb-2 text-[var(--color-text-primary)]">Contact Us</h1>
      <p className="text-[var(--color-text-dim)] mb-10">
        Have a question? Feel free to reach out to us.
      </p>
      <div className="space-y-8">
        <div className="flex items-start gap-4">
          <span className="text-3xl">&#128222;</span>
          <div>
            <h3 className="font-display text-lg font-semibold mb-1 text-[var(--color-text-primary)]">Phone</h3>
            <a href="tel:+919836225179" className="text-[var(--color-electric-400)] hover:text-[var(--color-electric-300)] transition-colors">
              +91 98362 25179
            </a>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <span className="text-3xl">&#9993;</span>
          <div>
            <h3 className="font-display text-lg font-semibold mb-1 text-[var(--color-text-primary)]">Email</h3>
            <a href="mailto:suryabhushan.singh@gmail.com" className="text-[var(--color-electric-400)] hover:text-[var(--color-electric-300)] transition-colors">
              suryabhushan.singh@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
