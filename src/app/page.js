import Hero from "@/components/Home/Hero";
import Existence from "@/components/Home/Existence";
import Vision from "@/components/Home/Vision";
import Numbers from "@/components/Home/Numbers";
import Events from "@/components/Home/Events";
import Repos from "@/components/Home/Repos";
export default function Home() {
  return (
    <main className="bg-[#f8f8f8]">
      <Hero></Hero>
      <Existence></Existence>
      <Numbers></Numbers>
      <Vision></Vision>
      <Events></Events>
      <Repos></Repos>
    </main>
  );
}
