import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="container mx-auto px-4 pt-20 flex items-center">
      <div className="w-1/2 pr-8">
        <h1 className="mb-6 text-5xl font-bold text-slate-800 text-start">
          TRUST OUR MSP SOLUTION FOR YOUR GROWING BUSINESS NEEDS
        </h1>
        <p className="mb-8 text-xl text-zinc-500 text-justify">
          Grow & sustain your growth with DVLS Managed Service solutions.
          Information Technology resources managed by DVLS as a provider
          eliminates bottlenecks from your technologically demanding IT expense.
        </p>
        <Button asChild className="bg-green-600 text-white hover:bg-green-700">
          <Link href={"https://www.mydvls.com"}>Get Started</Link>
        </Button>
      </div>
      <div className="w-1/2">
        <Image
          src="/bg.avif"
          alt="Tech solutions"
          width={600}
          height={400}
          className="h-full w-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
