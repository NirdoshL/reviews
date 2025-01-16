import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="pt-20 backdrop-blur-lg bg-white/30">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-start text-3xl font-bold text-slate-800">
          About Us
        </h2>
        <div className="flex items-center">
          <div className="w-1/2 pr-8">
            <Image
              src="/about.avif"
              alt="About our company"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-1/2">
            <p className="mb-4 text-lg text-slate-700">
              With over 30 years of combined experience, we specialize in
              providing comprehensive tech solutions for small to medium-sized
              businesses. Our unique approach combines IT expertise with
              marketing prowess, ensuring that your business not only runs
              smoothly but also grows effectively.
            </p>
            <p className="text-lg text-slate-700">
              From backend development to frontend design, from cloud services
              to managed IT solutions, we&apos;ve got you covered. Let us handle
              the tech, so you can focus on what you do best - running your
              business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
