import Hero from './components/Hero'
import WhatWeAre from './components/WhatWeAre'
import Statistics from './components/Statistics'

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full min-h-screen">
      <Hero />
      <WhatWeAre />
      <Statistics />
    </main>
  )
}

