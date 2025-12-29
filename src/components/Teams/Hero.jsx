
import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-20 sm:pt-24 md:pt-32 min-h-screen bg-[#f8f8f8] text-black w-full font-satoshi font-bold">
      <div className="text-[8vw] sm:text-[7vw] md:text-[6vw] text-[#4F77FF] flex justify-center mb-12 sm:mb-16 md:mb-20 px-4">
        <span>meet the team</span>
      </div>

      <div
        id="teamsgrid"
        className="
          grid
          grid-cols-2
          md:grid-cols-9
          grid-rows-[repeat(5,minmax(80px,1fr))]
          sm:grid-rows-[repeat(5,minmax(100px,1fr))]
          md:grid-rows-[repeat(5,minmax(120px,1fr))]
          gap-2 sm:gap-[8px] md:gap-[12px]
          relative
        "
      >
        <div
          className="
          relative overflow-hidden
          flex items-center justify-center
          col-start-1 col-end-2 row-start-1 row-end-2
          md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2
          w-full h-full
        "
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-full -translate-y-full w-[40px] h-[20px] scale-125">
    
              <div className="absolute inset-0 bg-[#F9E492] rounded-t-full origin-bottom-right"></div>
              
              <div className="absolute inset-0 bg-[#4F77FF] rounded-t-full origin-bottom-right rotate-90"></div>
              
              <div className="absolute inset-0 bg-[#F9E492] rounded-t-full origin-bottom-right rotate-180"></div>
              
              <div className="absolute inset-0 bg-[#4F77FF] rounded-t-full origin-bottom-right rotate-[270deg]"></div>
              
            </div>
        </div>
        {/* 1 */}
        <div
          className="
            relative overflow-hidden bg-[#1b1b1b] rounded-[32px_8px]
            col-start-1 col-end-3 row-start-1 row-end-3
            md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-5
          "
        >
        </div>

        {/* 2 */}
        <div
          className="
            relative overflow-hidden bg-[#1b1b1b] rounded-[32px_8px_8px_8px]
            col-start-1 col-end-2 row-start-3 row-end-4
            md:col-start-2 md:col-end-5 md:row-start-1 md:row-end-3
          "
        >
          <Image src="/assets/Teams/Hero/Team1.webp" alt="Team member" fill className="object-cover" />
        </div>

        {/* 3 */}
        <div
          className="
            relative overflow-hidden bg-[#1b1b1b] rounded-[8px_8px_32px_8px]
            col-start-2 col-end-3 row-start-3 row-end-4
            md:col-start-2 md:col-end-6 md:row-start-3 md:row-end-5
          "
        >
          <Image src="/assets/Teams/Hero/Team2.webp" alt="Team member" fill className="object-cover" />
        </div>

        {/* 4 */}
        <div
          className="
            relative overflow-hidden bg-[#1b1b1b] rounded-[32px_8px_8px_8px]
            col-start-1 col-end-3 row-start-4 row-end-6
            md:col-start-5 md:col-end-8 md:row-start-1 md:row-end-3
          "
        >
          <Image src="/assets/Teams/Hero/Team3.webp" alt="Team member" fill className="object-cover" />
        </div>

        {/* 5 */}
        <div
          className="
            relative overflow-hidden bg-[#1b1b1b] rounded-[8px_8px_32px_8px]
            col-start-1 col-end-2 row-start-6 row-end-7
            md:col-start-6 md:col-end-9 md:row-start-3 md:row-end-5
          "
        >
          <Image src="/assets/Teams/Hero/Team4.webp" alt="Team member" fill className="object-cover" />
        </div>

        {/* 6 */}
        <div
          className="
            relative overflow-hidden bg-[#1b1b1b] rounded-[32px_8px]
            col-start-8 col-end-10 row-start-1 row-end-7
            md:col-start-8 md:col-end-10 md:row-start-1 md:row-end-3
          "
        >
          <Image src="/assets/Teams/img6.jpg" alt="Team member" fill className="object-cover" />
        </div>
        <div
          className="
            relative overflow-hidden bg-[#1b1b1b] rounded-[32px_8px]
            col-start-9 col-end-10 row-start-1 row-end-3
            md:col-start-9 md:col-end-10 md:row-start-3 md:row-end-5
          "
        >
        </div>
      </div>  
    </section>
  )
}