import { Code, BarChart, Phone, Globe, Cloud, Cog } from "lucide-react";
import ServiceCard from "./serviceCard";

const services = [
  {
    title: "Business Development",
    description:
      "Specialized and customized solutions for your tech needs, from backend to frontend.",
    icon: BarChart,
    image: "/business.avif",
  },
  {
    title: "Marketing Services",
    description:
      "30+ years of experience helping small to medium-sized businesses scale effectively.",
    icon: Globe,
    image: "/marketing.avif",
  },
  {
    title: "Consulting Services",
    description:
      "Free 30-minute consultation to help you navigate your business tech needs.",
    icon: Phone,
    image: "/consulting.avif",
  },
  {
    title: "Web Development",
    description:
      "Visually appealing, user-friendly, and functional websites for businesses and personal use.",
    icon: Code,
    image: "/web.avif",
  },
  {
    title: "Cloud Services",
    description:
      "Support and solutions in cloud technologies for business resiliency & security.",
    icon: Cloud,
    image: "/cloud.avif",
  },
  {
    title: "Managed Services",
    description:
      "Monthly service plans to keep your technology running smoothly and up to industry standards.",
    icon: Cog,
    image: "/managed.avif",
  },
];

export default function Services() {
  return (
    <section id="services" className="pt-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-start text-3xl font-bold text-slate-800">
          Our Services
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
