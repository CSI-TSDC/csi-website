import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function TechWeek() {
    const containerRef = useRef(null);
    const [dots, setDots] = useState([]);
    const dotSize = 40; // width and height of each dot in pixels
    const gap = 28; // gap between dots in pixels (7 * 4, since gap-7 = 1.75rem = 28px)

    useEffect(() => {
        const calculateDots = () => {
            if (!containerRef.current) return;
            
            // Get container width minus padding (px-7 = 1.75rem = 28px on each side)
            const containerWidth = containerRef.current.offsetWidth - 96; // 28px * 2 for padding
            
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
        <div className="w-full relative min-h-[800px] bg-[#CBD5E1] text-csi-black rounded-[32px_8px] mb-20 md:mb-28 overflow-hidden">
            <div className="absolute inset-0 -z-10 grid-bg" />
            <div className='absolute top-0 left-0 w-[250px] -rotate-12 mt-16 ml-12'>
                <Image
                    src="/assets/Events/sticker1.png"
                    className='w-full h-full object-contain'
                    width={200}
                    height={200}
                    alt=''
                />
            </div>
            <div 
                ref={containerRef}
                className="relative px-12 pt-6 flex justify-between"
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
                <div className="w-full flex justify-between h-[300px]">
                    <div className="bg-gradient-to-b from-csi-black to-csi-blue-600 border-3 h-full w-[600px] rounded-[32px]">
                        <div>
                        <Image
                            src="/assets/Events/semicircle.png"
                            alt=""
                            width={65}
                            height={65}
                        />
                        </div>
                    </div>

                    <div className="flex-1 h-full">
                        <Image
                            src="/assets/Events/geekgirl.png"
                            alt=""
                            width={600}
                            height={300}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}