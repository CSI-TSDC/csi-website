import Hero from './components/Hero'
import Projects from './components/Projects'
import Vision from './components/Vision'
import WhatWeAre from './components/WhatWeAre'

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full min-h-screen">
      <Hero />
      <WhatWeAre />
      <Vision />
      <Projects />
    </main>
  )
}

