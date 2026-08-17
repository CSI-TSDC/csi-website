export default function GallerySkeleton() {
  // Generate random heights for masonry effect
  const skeletonHeights = [
    "h-[200px]", "h-[250px]", "h-[180px]", "h-[300px]", 
    "h-[220px]", "h-[280px]", "h-[200px]", "h-[240px]",
    "h-[260px]", "h-[190px]", "h-[270px]", "h-[210px]"
  ];

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 md:gap-6">
      {skeletonHeights.map((height, index) => (
        <div
          key={index}
          className={`break-inside-avoid mb-5 md:mb-6 ${height} rounded-2xl bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse`}
        >
          <div className="w-full h-full rounded-2xl bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
}


