'use client'

export default function Statistics() {
  const stats = [
    { label: 'Members', value: 50 },
    { label: 'Volunteers', value: 52},
    { label: 'Events', value: 5 },
    { label: 'Projects', value: 7 },
    { label: 'Teams', value: 6 },
    { label: 'Github Repos', value: 3 },
  ]

  return (
    <section
      id="statistics" 
      className="w-full min-h-screen pt-16 md:pt-20 bg-white p-10 font-youth-bold flex flex-col justify-center"
    >
      <div 
        id="stat-text" 
        className="flex flex-col items-center justify-center w-full mb-12"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-12 pb-10">
          <span>IN NUMBERS</span>
        </h2>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="aspect-square w-full max-w-[280px] md:max-w-[300px] rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-8 md:p-10 flex flex-col items-center justify-center"
            >
              <div className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">
                {stat.value}
              </div>
              <div className="text-base md:text-lg font-semibold text-gray-600 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}