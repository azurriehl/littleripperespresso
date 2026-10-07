import business from "./config/business.js";
import Sprite from "./components/ui/Sprite.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import OrderBuilder from "./components/OrderBuilder.jsx";
import Menu from "./components/Menu.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Sprite />
      <a className="skip" href="#main">
        {business.skipLink}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Marquee />
        <About />
        <OrderBuilder />
        <Menu />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
