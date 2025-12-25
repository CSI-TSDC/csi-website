import TeamSection from './TeamSection';
import TeamCard from '@/components/ui/TeamCard';

const headsMembers = [
  {
    name: "Shreya Pandey",
    designation: "Event Team - Head",
    image: "/assets/Teams/img2.jpg",
    hasSignature: false,
  },
  {
    name: "Hardik Gandhi",
    designation: "Tech Team - Head",
    image: "/assets/Teams/img3.jpg",
    hasSignature: false,
  },
  {
    name: "Soham Sharma",
    designation: "Tech Team - Asst. Head",
    image: "/assets/Teams/img2.jpg",
    hasSignature: false,
  },
  {
    name: "Angad Dabholkar",
    designation: "Design Team - Head",
    image: "/assets/Teams/img3.jpg",
    hasSignature: false,
  },
  {
    name: "Pragati Vishwakarma",
    designation: "Event Team - Head",
    image: "/assets/Teams/img2.jpg",
    hasSignature: false,
  },
  {
    name: "Jaydeep Borgaonkar",
    designation: "P.R. Team - Head",
    image: "/assets/Teams/img3.jpg",
    hasSignature: false,
  }
];

export default function Members() {
  const rows = [];
  for (let i = 0; i < headsMembers.length; i += 4) {
    rows.push(headsMembers.slice(i, i + 4));
  }

  return (
    <TeamSection title="Heads">
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

