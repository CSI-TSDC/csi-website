"use client";

import Image from "next/image";

const directors = [
  {
    name: "Mike Jordan",
    designation: "Managing Director",
    src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Ian Lowe",
    designation: "Technical Director",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Matt Ross",
    designation: "Commercial Director",
    src: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Nigel Baker",
    designation: "Operations Director",
    src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Laura Green",
    designation: "Finance Director",
    src: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Priya Kapoor",
    designation: "Strategy Director",
    src: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80",
  },
];

const heads = [
  {
    name: "Ava Hart",
    designation: "Head of Product",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Liam Chen",
    designation: "Head of Engineering",
    src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sofia Reyes",
    designation: "Head of Operations",
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Ethan Wright",
    designation: "Head of Marketing",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  },
];

const TeamCard = ({ name, designation, src }) => {
  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 transition transform-gpu duration-300 ease-out hover:-translate-y-3 hover:-rotate-2 hover:scale-[1.03] hover:bg-sky-100 hover:shadow-2xl hover:ring-2 hover:ring-sky-300"
    >
      <div className="relative h-[22rem] w-full bg-slate-100">
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 320px, (min-width: 768px) 45vw, 100vw"
          unoptimized
        />
      </div>
      <div className="px-6 py-5 text-left">
        <p className="text-lg font-semibold text-slate-900 group-hover:text-slate-900">
          {name}
        </p>
        <p className="text-sm font-medium text-slate-600 group-hover:text-slate-700">
          {designation}
        </p>
      </div>
    </article>
  );
};

const Team = () => {
  return (
    <main className="min-h-screen bg-[#e6e6e6]">
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-40 teams-h-bg">
        <div className="absolute inset-0 -z-10 grid-bg" />
        <div className="mx-auto flex max-w-5xl flex-col gap-6 text-left text-white">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Meet The Team
          </h1>
          <div className="space-y-4 text-base md:text-lg">
            <p>
              Summit Systems partners closely with our customers and suppliers,
              ensuring exceptional outcomes through unwavering commitment,
              dedication, and trust. We deliver cutting-edge technical solutions
              that delight project leaders and exceed expectations in Plastics
              Automation, Process Cooling, Material Handling, and Recycling
              Materials.
            </p>
            <p>
              With over 35 years of industry experience, we have assembled a
              top-tier team ready to support your business and help it thrive.
            </p>
            <p>Meet the team below!</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto flex max-w-6xl flex-col text-left">
          <h2 className="text-center pb-16 md:pb-24 text-3xl font-bold uppercase tracking-wide text-slate-900 md:text-5xl">
            The Directors
          </h2>
          <div className="flex flex-col gap-12">
            <div className="flex flex-wrap justify-center gap-8">
              {directors.slice(0, 2).map((person) => (
                <div key={person.name} className="w-full max-w-sm sm:w-[320px]">
                  <TeamCard {...person} />
                </div>
              ))}
            </div>

            <div className="flex flex-row w-full h-max">
              <div className="grid grid-rows-2 md:grid-cols-2 gap-8 justify-between w-full h-max">
                <div className="grid gap-8 w-full grid-cols-2">
                  {directors.slice(2, 4).map((person) => (
                    <div key={person.name} className="w-full col-span-1">
                      <TeamCard {...person} />
                    </div>
                  ))}
                </div>
                <div className="grid gap-8 w-full grid-cols-2">
                  {directors.slice(4, 6).map((person) => (
                    <div key={person.name} className="w-full col-span-1">
                      <TeamCard {...person} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto flex max-w-6xl flex-col text-left">
          <h2 className="text-center pb-16 md:pb-24 text-3xl font-bold uppercase tracking-wide text-slate-900 md:text-5xl">
            The Heads
          </h2>

          <div className="flex gap-8 justify-between w-full">
            <div className="flex flex-col gap-8 w-full max-w-[520px]">
              {heads.slice(0, 2).map((person) => (
                <div key={person.name} className="w-full">
                  <TeamCard {...person} />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-8 w-full max-w-[520px]">
              {heads.slice(2, 4).map((person) => (
                <div key={person.name} className="w-full">
                  <TeamCard {...person} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Team;
