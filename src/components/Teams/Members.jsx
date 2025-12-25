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
      <div className="mt-8 space-y-6 pt-10 pb-20">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex w-full justify-center gap-4 md:gap-6 pb-10"
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


