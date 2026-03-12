import { css } from '@emotion/css';
import {
  HeroSection,
  ExperienceSection,
  SkillsSection,
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
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
