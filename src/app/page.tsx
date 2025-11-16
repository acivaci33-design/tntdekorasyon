import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { WhyUsSection } from "@/components/sections/why-us";
import { InstagramSection } from "@/components/sections/instagram";
import { ContactSection } from "@/components/sections/contact";
import { TestimonialsSection } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <div className="space-y-14 md:space-y-16">
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <InstagramSection />
      <ContactSection />
    </div>
  );
}
