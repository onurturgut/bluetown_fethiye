import {
  Amenities,
  BookingCTA,
  Discover,
  FAQ,
  Footer,
  Gallery,
  Header,
  Hero,
  Introduction,
  Intro,
  Location,
  Residence,
  SmoothScroll,
  TheView,
} from "@/components/bt/Sections";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Intro />
      <Header />
      <main>
        <Hero />
        <Introduction />
        <Residence />
        <TheView />
        <Amenities />
        <Discover />
        <Gallery />
        <Location />
        <FAQ />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
