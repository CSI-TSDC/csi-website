import Hero from "@/components/Home/Hero";
import Existence from "@/components/Home/Existence";
import Vision from "@/components/Home/Vision";
import Numbers from "@/components/Home/Numbers";
import Events from "@/components/Home/Events";
import Repos from "@/components/Home/Repos";
export default function Home() {
  return (
    <main className="bg-csi-white">
      <Hero></Hero>
      <Existence></Existence>
      <Vision></Vision>
      <Events></Events>
      <Repos></Repos>
    </main>
  );
}
