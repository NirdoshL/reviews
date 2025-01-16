import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex justify-center items-center gap-10">
          <Link href="/" className="text-2xl font-bold text-green-800">
            Delta V Logics
          </Link>
          <nav>
            <ul className="flex space-x-4 text-sm font-semibold">
              <li>
                <Link href="/" className="text-slate-800 hover:text-slate-600">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.mydvls.com/about-us"
                  className="text-slate-800 hover:text-slate-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.mydvls.com/support-1"
                  className="text-slate-800 hover:text-slate-600"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.mydvls.com/our-clients"
                  className="text-slate-800 hover:text-slate-600"
                >
                  Our Clients
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.mydvls.com/pricing"
                  className="text-slate-800 hover:text-slate-600"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.mydvls.com/book-online"
                  className="text-slate-800 hover:text-slate-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex justify-center items-center gap-8">
          <Button
            asChild
            className="bg-transparent font-semibold text-sm text-black hover:bg-transparent shadow-none"
          >
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button
            asChild
            className="bg-green-600 text-white hover:bg-green-700 rounded-sm px-4"
          >
            <Link href={"https://www.mydvls.com"}>Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
