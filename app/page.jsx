import Image from "next/image";
import Hero from './components/hero/hero';
import Services from './components/services/services';
import About from './components/about/about';
import Stats from './components/stats/stats';
import Projects from './components/projects/projects';
import Clients from './components/clients/clients';
import Contact from './components/contact/contact';
import Header from './components/header/header';

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between">
      <Header />
      <Hero />
      <Services />
      <About />
      <Stats />
      <Projects />
      <Clients />
      <Contact />
      <footer className="w-full flex justify-center text-sm text-gray-600 py-4">
        <p>&copy; {new Date().getFullYear()} Sphere Constructions</p>
      </footer>
    </main>
  );
}
