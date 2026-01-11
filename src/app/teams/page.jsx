import Hero from "@/components/Teams/Hero"
import Chairperson from '@/components/Teams/Chairperson';
import HOD from '@/components/Teams/HOD';
import Core from '@/components/Teams/Core';
import Heads from '@/components/Teams/Heads';
import Members from '@/components/Teams/Members';

export default function Teams() {
    return (
        <main className="px-4 sm:px-6 md:px-[5vw]">
            <Hero></Hero>
            <Chairperson />
            <HOD />
            <Core />
            <Heads />
            <Members />
        </main>
    )
}