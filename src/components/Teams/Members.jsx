"use client";

import { useState, useEffect } from 'react';
import TeamSection from './TeamSection';
import TeamCard from '@/components/ui/TeamCard';
import { loadAllTeamData, getMembers, getPhotoPath } from '@/utils/teamData';

export default function Members() {
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      console.log('[Members] Starting to fetch data...');
      
      // Load team images map from Cloudinary
      const { loadTeamImageMap } = await import('@/utils/teamData');
      const imageMap = await loadTeamImageMap();
      
      const allData = await loadAllTeamData();
      console.log('[Members] All data loaded:', allData);
      const members = getMembers(allData);
      
      // Format for display: include team name in designation
      const formattedMembers = members.map(member => {
        const imagePath = getPhotoPath(member, imageMap);
        const formatted = {
          name: member.name,
          designation: `${member.team} Team`,
          image: imagePath,
          hasSignature: !!member.signature,
          team: member.team,
        };
        console.log('[Members] Formatted member:', formatted);
        return formatted;
      });
      
      console.log('[Members] Final formatted members:', formattedMembers);
      setMembersData(formattedMembers);
      setLoading(false);
    }
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <TeamSection title="Members">
        <div className="mt-4 sm:mt-6 md:mt-8 space-y-4 sm:space-y-5 md:space-y-6 pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20">
          <div className="flex justify-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </TeamSection>
    );
  }

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
                key={`${member.name}-${index}`}
                name={member.name}
                title={member.designation}
                hasSignature={member.hasSignature}
                image={member.image}
              />
            ))}
          </div>
        ))}
      </div>
    </TeamSection>
  );
}


