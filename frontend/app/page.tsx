import Hero from "./components/hero";
import ProductsSection from "./components/product";
import ServicesSection from "./components/services";

export default function Home() {
  return (
    <main className="bg-[#040B14]">
    <Hero />
    <ProductsSection />
    <ServicesSection />
    </main>
  )
}
