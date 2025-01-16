import About from "@/components/home/about";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import Services from "@/components/home/services";

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-fixed bg-center">
      <div className="backdrop-blur-sm bg-white/100">
        <Header />
        <Hero />
        <Services />
        <About />
        <Footer />
      </div>
    </div>
  );
}
