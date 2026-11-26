import SearchBar from "@/components/layout/SearchBar";
import Hero from "@/components/home/Hero";
import CategoryLinks from "@/components/home/CategoryLinks";
import HighlightMenu from "@/components/home/HighlightMenu";
import TopCategories from "@/components/home/TopCategories";
import WarungCarousel from "@/components/home/WarungCarousel";
import Faq from "@/components/home/Faq";


export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchBar />
      <CategoryLinks />
      <HighlightMenu />
      <TopCategories />
      <WarungCarousel />
      <Faq />
    </>
  );
}