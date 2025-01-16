import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 backdrop-blur-lg bg-white/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-slate-800">
            &copy; {new Date().getFullYear()} Delta V Logics. All rights
            reserved.
          </p>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-800 hover:text-slate-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-800 hover:text-slate-600"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
