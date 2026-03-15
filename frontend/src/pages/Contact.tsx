export default function Contact() {
  return (
    <section className="max-w-xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-10">
        Have a question? Feel free to reach out to us.
      </p>
      <div className="space-y-8">
        <div className="flex items-start gap-4">
          <span className="text-3xl">&#128222;</span>
          <div>
            <h3 className="text-lg font-semibold mb-1">Phone</h3>
            <a href="tel:+915678943208" className="text-blue-400 hover:text-blue-300 transition-colors">
              +91 5678943208
            </a>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <span className="text-3xl">&#9993;</span>
          <div>
            <h3 className="text-lg font-semibold mb-1">Email</h3>
            <a href="mailto:johndoe@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
              johndoe@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
