import TeamSection from './TeamSection';
import TeamCard from '@/components/ui/TeamCard';

const membersData = [
  {
    name: "Vidit Jain",
    designation: "Tech Team",
    image: "/assets/Teams/img2.jpg",
    hasSignature: false,
    isEmpty: true
  },
  {
    name: "Ashfil Shaikh",
    designation: "Event Team",
    image: "/assets/Teams/img3.jpg",
    hasSignature: false,
    isEmpty: true
  },
  {
    name: "Vivek",
    designation: "Design Team",
    image: "/assets/Teams/img4.avif",
    hasSignature: false,
    isEmpty: true
  },
  {
    name: "",
    designation: null,
    image: "/assets/Teams/img5.jpg",
    hasSignature: false,
    isEmpty: true
  }
];

export default function Members() {
  const rows = [];
  for (let i = 0; i < membersData.length; i += 4) {
    rows.push(membersData.slice(i, i + 4));
  }

  return (
    <TeamSection title="Members">
      <div className="mt-4 sm:mt-6 md:mt-8 space-y-4 sm:space-y-5 md:space-y-6 pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex w-full flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 pb-6 sm:pb-8 md:pb-10"
          >
            {row.map((member, index) => (
              <TeamCard
                key={index}
                name={member.name}
                title={member.designation}
                hasSignature={member.hasSignature}
                isEmpty={member.isEmpty}
                image={member.image}
              />
            ))}
          </div>
        ))}
      </div>
    </TeamSection>
  );
}


