import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <div className="h-full overflow-hidden flex flex-col items-center justify-center py-2 bg-linear-to-b from-sky-100 to-indigo-100">
      <Hero />
    </div>
  );
}
