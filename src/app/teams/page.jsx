import Hero from "@/components/Teams/Hero"
import Core from '@/components/Teams/Core';
import Heads from '@/components/Teams/Heads';
import Members from '@/components/Teams/Members';

export default function Teams() {
    return (
        <main className="px-[5vw]">
            <Hero></Hero>
            <Core />
            <Heads />
            <Members />
        </main>
    )
}