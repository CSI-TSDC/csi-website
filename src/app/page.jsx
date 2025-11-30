import Events from './components/Events'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Vision from './components/Vision'
import WhatWeAre from './components/WhatWeAre'
import FooterSep from './components/FooterSep'
import Footer from './components/ui/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full min-h-screen">
      <Hero />
      <WhatWeAre />
      <Vision />
      <Projects />
      <Events />
      <FooterSep />
      <Footer />
    </main>
  )
}

