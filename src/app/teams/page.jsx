"use client";

import Image from "next/image";

const TeamMemberImage = ({
  src,
  alt,
  width,
  height,
  name,
  designation,
  className = "",
}) => {
  return (
    <div
      className={`relative group overflow-hidden rounded-2xl ${className}`}
    >
      {/* Image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        unoptimized
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-500 ease-out group-hover:opacity-0"
      />

      {/* Text content */}
      <div
        className="absolute bottom-4 left-4 right-4 z-10 transition-all duration-500 ease-out
                   group-hover:translate-y-2 group-hover:opacity-0"
      >
        <p className="text-white font-semibold text-sm md:text-base">
          {name}
        </p>
        <p className="text-white/80 text-xs md:text-sm">
          {designation}
        </p>
      </div>
    </div>
  );
};

const Team = () => {
  // Marquee images data - all same size
  const marqueeImages = [
    {
      src: "https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=",
      alt: "Team member",
      width: 300,
      height: 300,
      className: "h-[28vh] w-[28vh] shrink-0",
      style: { clipPath: "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)" },
      name: "John Doe",
      designation: "CEO",
    },
    {
      src: "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg",
      alt: "Team member",
      width: 300,
      height: 300,
      className: "h-[28vh] w-[28vh] shrink-0 rounded-full overflow-hidden",
      name: "Jane Doe",
      designation: "CTO",
    },
    {
      src: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740&q=80",
      alt: "Team member",
      width: 300,
      height: 300,
      className: "h-[28vh] w-[28vh] shrink-0 rounded-md overflow-hidden",
      name: "John Doe",
      designation: "CEO",
    },
    {
      src: "https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=",
      alt: "Team member",
      width: 300,
      height: 300,
      className: "h-[28vh] w-[28vh] shrink-0",
      style: { clipPath: "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)" },
      name: "John Doe",
      designation: "CEO",
    },
    {
      src: "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg",
      alt: "Team member",
      width: 300,
      height: 300,
      className: "h-[28vh] w-[28vh] shrink-0 rounded-full overflow-hidden",
      name: "John Doe",
      designation: "CEO",
    },
    {
      src: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740&q=80",
      alt: "Team member",
      width: 300,
      height: 300,
      className: "h-[28vh] w-[28vh] shrink-0 rounded-md overflow-hidden",
      name: "John Doe",
      designation: "CEO",
    }
  ];

  // Grid images data
  const gridImageSrc = "https://img.freepik.com/free-photo/young-bearded-man-with-denim-shirt_273609-7230.jpg?semt=ais_hybrid&w=740&q=80";
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <div className="items-center justify-center flex w-full border-b-[8px] md:border-b-[12px] border-black bg-[#00BFFF] h-[60vh] pt-16 md:pt-20 overflow-hidden relative">
        {/* Marquee container */}
        <div className="absolute inset-0 flex items-center overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {/* 1st set of images */}
            <div className="flex items-center gap-8 md:gap-12 shrink-0">
              {marqueeImages.map((img, i) => (
                <TeamMemberImage key={`marquee1-${i}`} {...img} />
              ))}
            </div>

            {/* 2nd set of images (duplicate for seamless scroll) */}
            <div className="flex items-center gap-8 md:gap-12 shrink-0">
              {marqueeImages.map((img, i) => (
                <TeamMemberImage key={`marquee2-${i}`} {...img} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16 font-satoshi font-bold">
        <div className="flex flex-col md:flex-row justify-center items-center tracking-tight text-[14vw] leading-[13vw] md:text-[10vw] md:leading-[8vw]">

          <div className="flex md:mr-8">
            {["M", "E", "E", "T"].map((char, i) => (
              <span key={i} className="float-left">{char}</span>
            ))}
          </div>

          <div className="flex flex-row mt-4 md:mt-0">
            <div className="flex mr-8">
              {["T", "H", "E"].map((char, i) => (
                <span key={i} className="float-left">{char}</span>
              ))}
            </div>

            <div className="flex">
              {["T", "E", "A", "M"].map((char, i) => (
                <span key={i} className="float-left">{char}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pyramid grid of team cards */}
      <div className="mx-auto mt-8 mb-16 flex flex-col items-center gap-4 md:gap-6 w-full max-w-7xl">
        {/* Row 1 - 2 cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 w-full justify-items-center">
          {[
    { name: "Jane Doe", designation: "Product Designer" },
    { name: "John Smith", designation: "Frontend Developer" }].map((i, idx) => (
            <TeamMemberImage
              key={`row1-${idx}`}
              src={gridImageSrc}
              alt="Team member"
              width={200}
              height={267}
              className="w-[180px] md:w-[200px] aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200"
              { ...i }
            />
          ))}
        </div>

        {/* Row 2 - 4 cards */}
        <div className="grid grid-cols-4 gap-4 md:gap-6 w-full justify-items-center">
          {[
      { name: "Jane Doe", designation: "Product Designer" },
    { name: "John Smith", designation: "Frontend Developer" },
    { name: "Alex Brown", designation: "UI Engineer" },
    { name: "Sarah Lee", designation: "Project Manager" },
  ].map((i, idx) => (
            <TeamMemberImage
              key={`row2-${idx}`}
              src={gridImageSrc}
              alt="Team member"
              width={200}
              height={267}
              className="w-[180px] md:w-[200px] aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200"
              { ...i }
            />
          ))}
        </div>

        {/* Row 3 - 5 cards */}
        <div className="grid grid-cols-5 gap-4 md:gap-6 w-full justify-items-center">
          {[
    { name: "Jane Doe", designation: "Product Designer" },
    { name: "John Smith", designation: "Frontend Developer" },
    { name: "Alex Brown", designation: "UI Engineer" },
    { name: "Sarah Lee", designation: "Project Manager" },
    { name: "Sarah Lee", designation: "Project Manager" },
  ].map((i, idx) => (
            <TeamMemberImage
              key={`row3-${idx}`}
              src={gridImageSrc}
              alt="Team member"
              width={200}
              height={267}
              className="w-[180px] md:w-[200px] aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200"
              { ...i }
            />
          ))}
        </div>

        {/* Row 4 - 5 cards */}
        <div className="grid grid-cols-5 gap-4 md:gap-6 w-full justify-items-center">
          {[
    { name: "Jane Doe", designation: "Product Designer" },
    { name: "John Smith", designation: "Frontend Developer" },
    { name: "Alex Brown", designation: "UI Engineer" },
    { name: "Sarah Lee", designation: "Project Manager" },
    { name: "Sarah Lee", designation: "Project Manager" },
  ].map((i, idx) => (
            <TeamMemberImage
              key={`row4-${idx}`}
              src={gridImageSrc}
              alt="Team member"
              width={200}
              height={267}
              className="w-[180px] md:w-[200px] aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200"
              { ...i }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
