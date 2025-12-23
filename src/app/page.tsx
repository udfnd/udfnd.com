import { css } from '@emotion/css';
import {
  HeroSection,
  ExperienceSection,
  SkillsSection,
  ContactSection,
} from '@/components/home';

const mainStyles = css`
  min-height: 100vh;
`;

export default function Home() {
  return (
    <main className={mainStyles}>
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
