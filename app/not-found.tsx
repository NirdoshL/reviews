import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Star } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-red-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-lg w-full text-center">
        <div className="bg-red-500 p-8">
          <h1 className="text-6xl font-bold text-white mb-2">404</h1>
          <p className="text-red-100 text-xl">Oops! Page not found</p>
        </div>
        <div className="p-8">
          <p className="text-gray-600 mb-6">
            It seems the review you&apos;re looking for has gone on vacation.
            Let&apos;s find you a better destination!
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <div className="bg-yellow-100 p-4 rounded-full">
              <Search className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="bg-red-100 p-4 rounded-full">
              <MapPin className="h-8 w-8 text-red-500" />
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <Star className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <Button
            asChild
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            <Link href="/login">Return to login Page</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 animate-bounce">
        <Star className="h-8 w-8 text-yellow-400" />
      </div>
      <div className="absolute top-4 right-4 animate-pulse">
        <MapPin className="h-8 w-8 text-red-400" />
      </div>
    </div>
  );
}
