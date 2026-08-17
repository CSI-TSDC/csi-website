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

export default function Chairperson() {
    const [chairpersons, setChairpersons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { loadTeamImageMap } = await import("@/utils/teamData");
            const imageMap = await loadTeamImageMap();

            const allData = await loadAllTeamData();
            const chairpersonData = allData.filter(
                member => member.designation === "Chairperson"
            );

            const formatted = chairpersonData.map(member => ({
                name: member.name,
                designation: member.team,
                image: getPhotoPath(member, imageMap),
                hasSignature: !!member.signature,
                signature: getSignaturePath(member),
            }));

            setChairpersons(formatted);
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <>
                {/* Minimal divider */}
                <div className="flex items-center justify-center py-8">
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                    <div className="mx-4 w-2 h-2 rounded-full bg-gray-400/50"></div>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                </div>
                <div className="mt-6 pt-10 pb-20">
                    <TeamCardSkeleton count={1} />
                </div>
            </>
        );
    }

    return (
        <>
            {/* Minimal divider */}
            <div className="flex items-center justify-center py-8">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                <div className="mx-4 w-2 h-2 rounded-full bg-gray-400/50"></div>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
            <div className="mt-6 pt-10 pb-20">
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {chairpersons.map((member, index) => (
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
        </>
    );
}
