import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DemoSection from "@/components/DemoSection";
import APISection from "@/components/APISection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DemoSection />
      <APISection />
      <Footer />
    </div>
  );
};

export default Index;
