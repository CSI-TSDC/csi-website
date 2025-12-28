'use client'

export default function ContactPage() {
  return (
    <main className="w-screen bg-sky-50 text-slate-900">

      {/* HERO */}
      <section className="bg-sky-100 py-20 relative overflow-hidden">
        {/* illustration placeholder */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,#bae6fd,transparent_60%)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-semibold">Contact Us</h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </section>

      {/* LOGO STRIP */}
      <section className="bg-white py-10">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-10 opacity-60">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-8 w-24 bg-slate-200 rounded" />
          ))}
        </div>
      </section>

      {/* FORM + NEWSLETTER */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

          {/* CONTACT FORM */}
          <div className="md:col-span-2 bg-sky-100 rounded-2xl p-8">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input placeholder="Email" />
              <Input placeholder="Phone" />
              <Input placeholder="Name" className="md:col-span-2" />
              <textarea
                placeholder="Message"
                rows="5"
                className="md:col-span-2 rounded-xl px-4 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <button className="bg-sky-600 text-white px-8 py-3 rounded-full w-max">
                Submit Button
              </button>
            </form>
          </div>

          {/* NEWSLETTER */}
          <div className="bg-sky-700 text-white rounded-2xl p-8">
            <h3 className="text-lg font-medium">Our Newsletters</h3>
            <p className="text-sm opacity-80 mt-2">
              Lorem ipsum dolor sit amet.
            </p>

            <input
              placeholder="Email"
              className="w-full mt-6 rounded-full px-4 py-3 text-slate-900 focus:outline-none"
            />
            <button className="w-full mt-4 bg-slate-900 py-3 rounded-full">
              Submit Button
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <Card title="Phone" value="(+876) 765 665" />
          <Card title="Email" value="mail@influenca.id" />
          <Card title="Location" value="London Eye, London" />
        </div>
      </section>

      {/* MAP */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto h-96 rounded-2xl overflow-hidden bg-slate-200 flex items-center justify-center text-slate-500">
          Map placeholder
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-sky-700 text-white py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 text-sm">
          <div>
            <h4 className="font-semibold">Influenca</h4>
            <p className="opacity-80 mt-2">
              Lorem ipsum dolor sit amet.
            </p>
          </div>
          <FooterCol title="Navigation" />
          <FooterCol title="Quick Links" />
          <FooterCol title="Services" />
        </div>
      </footer>

    </main>
  )
}

function Input({ placeholder, className = '' }) {
  return (
    <input
      placeholder={placeholder}
      className={`rounded-full px-4 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-sky-400 ${className}`}
    />
  )
}

function Card({ title, value }) {
  return (
    <div className="bg-sky-600 text-white rounded-2xl p-6">
      <h4 className="text-sm opacity-80">{title}</h4>
      <p className="mt-2 font-medium">{value}</p>
    </div>
  )
}

function FooterCol({ title }) {
  return (
    <div>
      <h4 className="font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 opacity-80">
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
      </ul>
    </div>
  )
}