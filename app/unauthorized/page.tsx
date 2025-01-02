import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, Key, ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-orange-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-lg w-full text-center relative">
        <div className="bg-red-500 p-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Unauthorized Access
          </h1>
          <p className="text-red-100 text-xl">
            Oops! You don&apos;t have permission to view this page.
          </p>
        </div>
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Lock className="h-20 w-20 text-gray-300" />
              <ShieldAlert className="h-10 w-10 text-red-500 absolute bottom-0 right-0" />
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            It looks like you&apos;re trying to access a VIP review area.
            Let&apos;s get you the right credentials!
          </p>
          <Button
            asChild
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            <Link href="/login">Log In</Link>
          </Button>
        </div>
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <Key className="h-12 w-12 text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute bottom-4 right-4 animate-bounce">
          <Lock className="h-8 w-8 text-red-400" />
        </div>
      </div>
    </div>
  );
}
