import TeamSection from './TeamSection';
import TeamCard from '@/components/ui/TeamCard';

const coreMembers = [
  // Top Row - 2 members
  {
    name: "Aryan",
    designation: "Chairperson",
    image: "/assets/Teams/img2.jpg",
    hasSignature: true,
  },
  {
    name: "Aman",
    designation: "Vice Chairperson",
    image: "/assets/Teams/img3.jpg",
    hasSignature: true,
  },
  // Bottom Row - 4 members
  {
    name: "Suraj Singh",
    designation: "Treasurer",
    image: "/assets/Teams/img4.avif",
    hasSignature: false,
  },
  {
    name: "Om Murkar",
    designation: "Treasurer",
    image: "/assets/Teams/img5.jpg",
    hasSignature: false,
  },
  {
    name: "Sakshi Jaiswal",
    designation: "Secretary",
    image: "/assets/Teams/img6.jpg",
    hasSignature: false,
  },
  {
    name: "Siddhika Narvekar",
    designation: "Secretary",
    image: "/assets/Teams/il_570xN.4613780489_pw0q.webp",
    hasSignature: false,
  }
];

export default function Core() {
  const topRowMembers = coreMembers.slice(0, 2);
  const bottomRowMembers = coreMembers.slice(2);

  return (
    <TeamSection title="THE CORE" hasOverflow={false}>
      <div className="mt-8 space-y-6 pt-10 pb-20">
        {/* Top Row - 2 cards on all screens */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 pb-10">
          {topRowMembers.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              title={member.designation}
              hasSignature={member.hasSignature}
              image={member.image}
            />
          ))}
        </div>
        
        {/* Bottom Row - 2 cards on mobile, 4 cards on desktop */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {bottomRowMembers.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              title={member.designation}
              hasSignature={member.hasSignature}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </TeamSection>
  );
}

