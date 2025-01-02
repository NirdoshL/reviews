import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/auth.provider";

export function Header() {
  const { user } = useAuth();
  return (
    <header className="border-b">
      <div className="max-w-[1536px] mx-auto flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">MY DVLS Google Reviews</h1>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>{user?.data.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
