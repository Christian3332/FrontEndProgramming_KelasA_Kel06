import SearchBar from "@/components/layout/SearchBar";
import Hero from "@/components/home/Hero";
import CategoryLinks from "@/components/home/CategoryLinks";
import HighlightMenu from "@/components/home/HighlightMenu";
import KatalogPreview from "@/components/home/KatalogPreview";
import WarungCarousel from "@/components/home/WarungCarousel";
import Faq from "@/components/home/Faq";


export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchBar />
      <CategoryLinks />
      <HighlightMenu />
      <KatalogPreview />
      <WarungCarousel />
      <Faq />
    </>
  );
}