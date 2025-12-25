import { useEffect, useRef, useState } from 'react';

export default function TechWeek() {
    const containerRef = useRef(null);
    const [dots, setDots] = useState([]);
    const dotSize = 40; // width and height of each dot in pixels
    const gap = 28; // gap between dots in pixels (7 * 4, since gap-7 = 1.75rem = 28px)

    useEffect(() => {
        const calculateDots = () => {
            if (!containerRef.current) return;
            
            // Get container width minus padding (px-7 = 1.75rem = 28px on each side)
            const containerWidth = containerRef.current.offsetWidth - 56; // 28px * 2 for padding
            
            // Calculate how many dots can fit in the container
            const dotsThatFit = Math.floor(containerWidth / (dotSize + gap)) + 1;
            
            // Create array of dots
            setDots(Array(dotsThatFit).fill(0));
        };

        // Initial calculation
        calculateDots();

        // Recalculate on window resize
        window.addEventListener('resize', calculateDots);
        return () => window.removeEventListener('resize', calculateDots);
    }, []);

    return (
        <div className="w-full relative min-h-[800px] bg-[#ffe1bf] rounded-[32px_8px] mb-20 md:mb-28 overflow-hidden">
            <div className="absolute inset-0 -z-10 grid-bg" />
            <div 
                ref={containerRef}
                className="relative px-7 pt-6 flex justify-center gap-7"
            >
                {dots.map((_, index) => (
                    <span key={index} className="block w-[40px] h-[40px] flex-shrink-0">
                        <img 
                            className="w-full h-full" 
                            src="/assets/Events/calender_dot.png" 
                            alt="" 
                        />
                    </span>
                ))}
            </div>
            <div className='relative z-2'>
                <div className='font-satoshi font-medium text-[5vw] flex justify-center pt-15'>
                    <span>
                        Tech Week
                    </span>
                </div>
            </div>
            <div className='relative px-20 py-15 flex-col flex-wrap space-y-15 z-2'>
                <div className='w-full flex justify-between'>
                    <div className='bg-[#fb74a7] border-3 aspect-square w-[300px] rounded-[32px]'>
                    </div>
                    <div className='bg-[#9996f7] border-3 aspect-square w-[300px] rounded-[32px]'>
                    </div>
                    <div className='bg-[#fff] border-3 aspect-square w-[300px] rounded-[32px]'>
                    </div>
                </div>
                <div className='w-full flex justify-between'>
                    <div className='bg-[#fdfe52] border-3 aspect-square w-[300px] rounded-[32px]'>

                    </div>
                </div>
            </div>
        </div>
    )
}