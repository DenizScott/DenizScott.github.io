import { Seo } from '../components/Seo.tsx';
import { Hero } from '../sections/Hero.tsx';
import { About } from '../sections/About.tsx';
import { Projects } from '../sections/Projects.tsx';
import { Expertise } from '../sections/Expertise.tsx';
import { Workflows } from '../sections/Workflows.tsx';
import { Experience } from '../sections/Experience.tsx';
import { Resume } from '../sections/Resume.tsx';
import { Contact } from '../sections/Contact.tsx';

export function Home() {
  return (
    <>
      <Seo route={{ kind: 'home' }} />
      <Hero />
      <About />
      <Projects />
      <Expertise />
      <Workflows />
      <Experience />
      <Resume />
      <Contact />
    </>
  );
}
