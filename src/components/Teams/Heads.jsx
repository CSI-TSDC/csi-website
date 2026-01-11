"use client";

import { useState, useEffect } from 'react';
import TeamSection from './TeamSection';
import TeamCard from '@/components/ui/TeamCard';
import TeamCardSkeleton from '@/components/ui/TeamCardSkeleton';
import { loadAllTeamData, getHeads, getPhotoPath, getSignaturePath } from '@/utils/teamData';

export default function Heads() {
  const [headsMembers, setHeadsMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Load team images map from Cloudinary
      const { loadTeamImageMap } = await import('@/utils/teamData');
      const imageMap = await loadTeamImageMap();

      const allData = await loadAllTeamData();
      const heads = getHeads(allData);

      // Format for display: include team name in designation
      const formattedHeads = heads.map(member => {
        const imagePath = getPhotoPath(member, imageMap);
        const signaturePath = getSignaturePath(member);
        const formatted = {
          name: member.name,
          designation: `${member.team} Team - ${member.designation}`,
          image: imagePath,
          hasSignature: !!member.signature,
          signature: signaturePath,
          team: member.team,
        };
        return formatted;
      });
      setHeadsMembers(formattedHeads);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <TeamSection title="Heads">
        <div className="mt-4 sm:mt-6 md:mt-8 space-y-4 sm:space-y-5 md:space-y-6 pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20">
          <TeamCardSkeleton count={4} />
          <TeamCardSkeleton count={4} />
        </div>
      </TeamSection>
    );
  }

  const rows = [];
  for (let i = 0; i < headsMembers.length; i += 4) {
    rows.push(headsMembers.slice(i, i + 4));
  }

  return (
    <TeamSection title="Heads">
      <div className="mt-4 sm:mt-6 md:mt-8 space-y-4 sm:space-y-5 md:space-y-6 pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex w-full flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 pb-6 sm:pb-8 md:pb-10"
          >
            {row.map((member, index) => (
              <TeamCard
                key={`${member.name}-${index}`}
                name={member.name}
                title={member.designation}
                hasSignature={member.hasSignature}
                image={member.image}
                signature={member.signature}
              />
            ))}
          </div>
        ))}
      </div>
    </TeamSection>
  );
}

