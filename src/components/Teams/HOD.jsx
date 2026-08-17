"use client";

import { useState, useEffect } from "react";
import TeamSection from "./TeamSection";
import TeamCard from "@/components/ui/TeamCard";
import TeamCardSkeleton from "@/components/ui/TeamCardSkeleton";
import {
  loadAllTeamData,
  getPhotoPath,
  getSignaturePath,
} from "@/utils/teamData";

export default function HOD() {
  const [hods, setHods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { loadTeamImageMap } = await import("@/utils/teamData");
      const imageMap = await loadTeamImageMap();

      const allData = await loadAllTeamData();
      const hodData = allData.filter(
        member => member.designation === "HOD"
      );

      const formatted = hodData.map(member => ({
        name: member.name,
        designation: member.team,
        image: getPhotoPath(member, imageMap),
        hasSignature: !!member.signature,
        signature: getSignaturePath(member),
      }));

      setHods(formatted);
      setLoading(false);

    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <TeamSection title="HEAD OF DEPARTMENT" hasOverflow={false}>
        <div className="mt-6 pt-10 pb-20">
          <TeamCardSkeleton count={3} />
        </div>
      </TeamSection>
    );
  }

  return (
    <TeamSection title="HEAD OF DEPARTMENT" hasOverflow={false}>
      <div className="mt-6 pt-10 pb-20">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {hods.map((member, index) => (
            <TeamCard
              key={`${member.name}-${index}`}
              name={member.name}
              title={member.designation}
              image={member.image}
              hasSignature={member.hasSignature}
              signature={member.signature}
            />
          ))}
        </div>
      </div>
    </TeamSection>
  );
}