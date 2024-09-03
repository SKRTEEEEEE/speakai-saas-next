import Banner from "@/components/banner";
import BgGradient from "@/components/bg-gradient";
import HowItWorks from "@/components/howitworks";
import Pricing from "@/components/pricing";
import { Dot } from "lucide-react";

const DotDivider = () => {
  return (
    <div className="flex items-center justify-center">
        <Dot className="text-purple-400"></Dot>
        <Dot className="text-purple-400"></Dot>
        <Dot className="text-purple-400"></Dot>
      </div>
  )
}

export default function Home() {
  return (
    <main className="mx-auto w-full inset-0 h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <BgGradient />
      <Banner />
      <DotDivider/>
      <HowItWorks />
      <DotDivider/>

      <Pricing />

      <DotDivider/>

      <footer className="bg-gray-200/20 flex h-20 py-24 px-12 z-20 relative overflow-hidden flex-col gap-2">
        <p>All Rights Reserved, {new Date().getFullYear()}</p>
        <a href="https://github.com/SKRTEEEEEE" target="_blank">
          Built by SKRTEEEEEE 🥦🐉
        </a>
      </footer>
    </main>
  );
}