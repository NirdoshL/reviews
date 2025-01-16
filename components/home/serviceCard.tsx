import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  image,
}: ServiceCardProps) {
  return (
    <div className="group rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl backdrop-blur-lg bg-white/30 hover:bg-white/40">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
        <Icon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold text-slate-800">{title}</h3>
        <p className="text-slate-700">{description}</p>
      </div>
    </div>
  );
}
