import { css } from '@emotion/css';
import {
  HeroSection,
  ExperienceSection,
  LanguagesSection,
  ContactSection,
} from '@/components/home';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const mainStyles = css`
  min-height: 100vh;
`;

export default function Home() {
  return (
    <main className={mainStyles}>
      <AnimatedBackground />
      <HeroSection />
      <ExperienceSection />
      <LanguagesSection />
      <ContactSection />
    </main>
  );
}
