export default function TeamSection({ title, hasOverflow = true, children }) {
  return (
    <div className={`relative ${hasOverflow ? 'overflow-hidden' : ''} text-[7vw] uppercase w-full`}>
      <div className="w-full relative py-6 flex justify-center items-center overflow-hidden">
        <span>
          <span>{title}</span>
        </span>
        <div className="w-full h-px absolute bottom-0">
          <span className="w-full h-full relative bg-black/30 block"></span>
        </div>
        <div className="w-full h-px absolute bottom-0 team-prog">
          <span className="w-full h-full bg-black block -translate-x-20"></span>
        </div>
      </div>
      <div className="w-full h-max relative">
        {children}
      </div>
    </div>
  );
}

