import SearchBar from "@/components/SearchBar";
import Hero from "@/components/Hero";
import CategoryLinks from "@/components/CategoryLinks";
import HighlightMenu from "@/components/HighlightMenu";
import KatalogPreview from "@/components/KatalogPreview";
import WarungCarousel from "@/components/WarungCarousel";
import Faq from "@/components/Faq";


export default function HomePage() {
  return (
    <main>
      <Hero />
      <SearchBar />
      <CategoryLinks />
      <HighlightMenu />
      <KatalogPreview />
      <WarungCarousel />
      <Faq />
    </main>
  );
}