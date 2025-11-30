"use client";

const Events = () => {
  return (
    <section className="w-full py-12 md:py-16 px-16 bg-white">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">
        Events,{" "}
        <span className="text-red-500">Where Innovation Meets Community..</span>
      </h2>

      <div className="flex flex-col items-center gap-8">
        {/* Event Card 1 - Milkyway */}
        <article className="relative w-[80%] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 min-h-[400px] md:min-h-[500px]">
          {/* Background pattern with stars */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-32 left-32 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="absolute bottom-32 left-24 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-32 w-2 h-2 bg-white rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 flex flex-col flex-1 h-full">
            <div className="mb-6">
              <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                Milkyway
              </h3>
              
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-white/90 font-medium">Coming Soon</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white/90 font-medium">Singapore</span>
              </div>
            </div>

            <p className="text-white/90 text-lg md:text-xl mb-8 flex-1 leading-relaxed">
              Make games, build houses, and get prizes like a flight to a game jam in Singapore!
            </p>

            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 w-fit px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-200 text-base font-semibold"
            >
              <span>Join Milkyway</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </article>

        {/* Event Card 2 - Moonshot */}
        <article className="relative w-[80%] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 min-h-[400px] md:min-h-[500px]">
          {/* Background pattern with stars */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-32 left-32 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="absolute bottom-32 left-24 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-32 w-2 h-2 bg-white rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 flex flex-col flex-1 h-full">
            <div className="mb-6">
              <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                Moonshot!
              </h3>
              
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-white/90 font-medium">Coming Soon</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white/90 font-medium">Orlando, Florida</span>
              </div>
            </div>

            <p className="text-white/90 text-lg md:text-xl mb-8 flex-1 leading-relaxed">
              4-day hackathon in Orlando, Florida w/ a FREE visit to NASA and Universal Studios!
            </p>

            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 w-fit px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-200 text-base font-semibold"
            >
              <span>Join Moonshot</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Events;
