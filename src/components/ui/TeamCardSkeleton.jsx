"use client";

export default function TeamCardSkeleton({ count = 3 }) {
    return (
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[...Array(count)].map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col w-[220px] md:w-[280px] h-[380px] md:h-[460px] animate-pulse"
                >
                    {/* Image skeleton */}
                    <div className="rounded-[32px_8px] bg-gray-300/60 w-full h-full"></div>
                    {/* Text skeleton */}
                    <div className="mt-3 w-full flex flex-col items-center gap-2">
                        <div className="h-5 md:h-6 w-32 bg-gray-300/60 rounded"></div>
                        <div className="h-4 md:h-5 w-24 bg-gray-200/60 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
