import Events from './components/Events'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Vision from './components/Vision'
import WhatWeAre from './components/WhatWeAre'
import Statistics from './components/Statistics'
import Gallery from './components/Gallery'
import Team from './components/Team'

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full min-h-screen">
      <Hero />
      <WhatWeAre />
      <Statistics />
      <Vision />
      <Projects />
      <Events />
      <Gallery />
      <Team />
    </main>
  )
}

