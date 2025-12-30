"use client";

import { useState, useEffect } from 'react';
import TeamSection from './TeamSection';
import TeamCard from '@/components/ui/TeamCard';
import { loadAllTeamData, getCore, getPhotoPath, getSignaturePath } from '@/utils/teamData';

export default function Core() {
  const [coreMembers, setCoreMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Load team images map from Cloudinary
      const { loadTeamImageMap } = await import('@/utils/teamData');
      const imageMap = await loadTeamImageMap();
      
      const allData = await loadAllTeamData();
      const core = getCore(allData);
      
      // Sort: Chairperson first, then Vice-Chairperson, then others
      const sortedCore = core.sort((a, b) => {
        const order = {
          'Student Chairperson': 1,
          'Student Vice-Chairperson': 2,
          'Secretary': 3,
          'Treasurer': 4,
        };
        return (order[a.designation] || 99) - (order[b.designation] || 99);
      });
      
      // Format for display
      const formattedCore = sortedCore.map(member => {
        const imagePath = getPhotoPath(member, imageMap);
        const signaturePath = getSignaturePath(member);
        const formatted = {
          name: member.name,
          designation: member.designation,
          image: imagePath,
          hasSignature: !!member.signature,
          signature: signaturePath,
        };
        return formatted;
      });
      setCoreMembers(formattedCore);
      setLoading(false);
    }
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <TeamSection title="THE CORE" hasOverflow={false}>
        <div className="mt-4 sm:mt-6 md:mt-8 space-y-4 sm:space-y-5 md:space-y-6 pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20">
          <div className="flex justify-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </TeamSection>
    );
  }

  const topRowMembers = coreMembers.slice(0, 2);
  const bottomRowMembers = coreMembers.slice(2);

  return (
    <TeamSection title="THE CORE" hasOverflow={false}>
      <div className="mt-4 sm:mt-6 md:mt-8 space-y-4 sm:space-y-5 md:space-y-6 pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20">
        {/* Top Row - 2 cards on all screens */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 pb-6 sm:pb-8 md:pb-10">
          {topRowMembers.map((member, index) => (
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
        
        {/* Bottom Row - 2 cards on mobile, 4 cards on desktop */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
          {bottomRowMembers.map((member, index) => (
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
      </div>
    </TeamSection>
  );
}

