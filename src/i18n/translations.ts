import { Language } from '@/stores/useAppStore';

export const translations = {
  ko: {
    hero: {
      role: 'Frontend Engineer',
      name: '한승목',
      bio: 'AI 기반 소프트웨어 개발과 사용자 중심 제품 설계에 관심이 많습니다. 사용자 경험을 향상시키고 비즈니스 성장을 이끄는 확장 가능한 웹 애플리케이션을 구축하는 것에 열정을 가지고 있습니다.',
      interests: '드러머, 포커 플레이어, 애니메이션과 게임을 좋아합니다.',
      location: '서울, 대한민국',
      focusTitle: '관심 분야',
      focuses: [
        'AI 기반 개발',
        '웹 애플리케이션',
        'UX 설계',
        '확장 가능한 시스템',
        '프론트엔드 아키텍처',
      ],
    },
    experience: {
      title: '경력',
      items: [
        {
          company: '기깔콘',
          role: 'Frontend Engineer (정규직)',
          period: '2025년 9월 – 현재',
          location: '서울',
          description: '학원 ERP 프론트엔드 리드 개발',
          technologies: ['React', 'Next.js', 'Zustand', 'TypeScript', 'TailwindCSS', 'Node.js', 'Claude Code', 'Codex'],
        },
        {
          company: 'DeepLeHR',
          role: 'Co-Founder / CTO (정규직)',
          period: '2020년 3월 – 2025년 1월',
          location: '서울',
          description: 'CTO 겸 공동창업자, 개발팀 관리 및 프론트엔드 개발 리드',
          technologies: ['React', 'Next.js', 'Zustand', 'TypeScript', 'AWS', 'Express.js'],
        },
        {
          company: 'Wconceptkorea',
          role: '전략기획실 인턴',
          period: '2019년 6월 – 2019년 9월',
          location: '서울 강남구',
          description: '전략기획실 인턴',
          technologies: [],
        },
      ],
    },
    education: {
      title: '학력',
      items: [
        {
          school: '포항공과대학교 (POSTECH)',
          degree: '컴퓨터 과학 학사',
          period: '2017년 2월 – 2025년 6월',
          description: 'GPA: 3.32',
        },
        {
          school: 'Rhode Island School of Design (RISD)',
          degree: 'Exchange Student (Summer)',
          period: '2017년 6월 – 2017년 8월',
          description: '',
        },
        {
          school: 'UC Berkeley',
          degree: 'Exchange Student (Fall)',
          period: '2017년 9월 – 2017년 12월',
          description: '',
        },
      ],
    },
    projects: {
      title: '프로젝트',
      items: [
        {
          name: 'Sensing the City : Arduino',
          organization: 'Rhode Island School of Design',
          period: '2017년 6월 – 2017년 8월',
          description: '제품 디자인 및 아두이노 소프트웨어 코딩',
        },
        {
          name: '시각장애인용 지팡이 개발',
          organization: '경남과학고등학교',
          period: '2015년 3월 – 2016년 9월',
          description: '아두이노 소프트웨어 개발',
        },
      ],
    },
    awards: {
      title: '수상 및 성과',
      items: [
        {
          name: 'World Quant Championship 5th Place',
          issuer: 'World Quant',
          year: '2025년 7월',
          description: 'World Quant IQC National Championship 5위',
        },
        {
          name: 'POSTECH Hackathon 3rd Place',
          issuer: 'POSTECH PoApper',
          year: '2018년 10월',
          description: 'POSTECH PoApper Hackathon 3위',
        },
        {
          name: 'ISEF Alumnus',
          issuer: 'Intel International Science and Engineering Fair',
          year: '2017년',
          description: '2017 Intel ISEF 참가',
        },
      ],
    },
    skills: {
      title: '기술 스택',
      categories: [
        {
          title: 'Frontend',
          skills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Zustand'],
        },
        {
          title: 'Backend',
          skills: ['Node.js', 'Express.js', 'AWS'],
        },
        {
          title: 'AI Tools',
          skills: ['Claude Code', 'Codex'],
        },
      ],
    },
    languages: {
      title: '언어 능력',
      items: [
        {
          language: '영어',
          level: '상급 (자유로운 의사소통 가능)',
          certification: 'TOEFL: 106 (2018)',
        },
        {
          language: '중국어',
          level: '중급 (제한적 의사소통 가능)',
          certification: 'HSK: 6급 (2014)',
        },
      ],
    },
    contact: {
      title: '연락처',
      description: '새로운 프로젝트나 협업 기회에 대해 이야기하고 싶으시다면 언제든지 연락해 주세요.',
    },
    nav: {
      home: '홈',
      blog: '블로그',
    },
  },
  en: {
    hero: {
      role: 'Frontend Engineer',
      name: 'Seungmok Han',
      bio: 'Interested in AI-driven software development and user-centric product design. Passionate about building scalable web applications that enhance user experience and drive business growth.',
      interests: 'Amateur drummer, Poker player, Loves anime and games.',
      location: 'Seoul, South Korea',
      focusTitle: 'What I Focus On',
      focuses: [
        'AI-driven Development',
        'Web Applications',
        'UX Design',
        'Scalable Systems',
        'Frontend Architecture',
      ],
    },
    experience: {
      title: 'Experience',
      items: [
        {
          company: 'Gigalkon',
          role: 'Frontend Engineer (Full-time)',
          period: 'Sep 2025 – Present',
          location: 'Seoul',
          description: 'Lead frontend development for Academy ERP',
          technologies: ['React', 'Next.js', 'Zustand', 'TypeScript', 'TailwindCSS', 'Node.js', 'Claude Code', 'Codex'],
        },
        {
          company: 'DeepLeHR',
          role: 'Co-Founder / CTO (Full-time)',
          period: 'Mar 2020 – Jan 2025',
          location: 'Seoul',
          description: 'CTO and Co-founder, managed development team and led frontend development',
          technologies: ['React', 'Next.js', 'Zustand', 'TypeScript', 'AWS', 'Express.js'],
        },
        {
          company: 'Wconceptkorea',
          role: 'Strategic Planning Intern',
          period: 'Jun 2019 – Sep 2019',
          location: 'Seoul, Gangnam',
          description: 'Strategic Planning Department Intern',
          technologies: [],
        },
      ],
    },
    education: {
      title: 'Education',
      items: [
        {
          school: 'POSTECH',
          degree: 'B.S. in Computer Science',
          period: 'Feb 2017 – Jun 2025',
          description: 'GPA: 3.32',
        },
        {
          school: 'Rhode Island School of Design (RISD)',
          degree: 'Exchange Student (Summer)',
          period: 'Jun 2017 – Aug 2017',
          description: '',
        },
        {
          school: 'UC Berkeley',
          degree: 'Exchange Student (Fall)',
          period: 'Sep 2017 – Dec 2017',
          description: '',
        },
      ],
    },
    projects: {
      title: 'Projects',
      items: [
        {
          name: 'Sensing the City : Arduino',
          organization: 'Rhode Island School of Design',
          period: 'Jun 2017 – Aug 2017',
          description: 'Product design and Arduino software coding',
        },
        {
          name: 'Smart Cane for Visually Impaired',
          organization: 'Gyeongnam Science High School',
          period: 'Mar 2015 – Sep 2016',
          description: 'Arduino software development',
        },
      ],
    },
    awards: {
      title: 'Awards & Honors',
      items: [
        {
          name: 'World Quant Championship 5th Place',
          issuer: 'World Quant',
          year: 'Jul 2025',
          description: '5th Place Award in World Quant IQC National Championship',
        },
        {
          name: 'POSTECH Hackathon 3rd Place',
          issuer: 'POSTECH PoApper',
          year: 'Oct 2018',
          description: '3rd Place Award in POSTECH PoApper Hackathon',
        },
        {
          name: 'ISEF Alumnus',
          issuer: 'Intel International Science and Engineering Fair',
          year: '2017',
          description: 'Attended in 2017 Intel ISEF',
        },
      ],
    },
    skills: {
      title: 'Skills',
      categories: [
        {
          title: 'Frontend',
          skills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Zustand'],
        },
        {
          title: 'Backend',
          skills: ['Node.js', 'Express.js', 'AWS'],
        },
        {
          title: 'AI Tools',
          skills: ['Claude Code', 'Codex'],
        },
      ],
    },
    languages: {
      title: 'Languages',
      items: [
        {
          language: 'English',
          level: 'Advanced (Fluent)',
          certification: 'TOEFL: 106 (2018)',
        },
        {
          language: 'Chinese',
          level: 'Intermediate (Limited)',
          certification: 'HSK: Level 6 (2014)',
        },
      ],
    },
    contact: {
      title: 'Contact',
      description: 'If you want to discuss new projects or collaboration opportunities, feel free to reach out.',
    },
    nav: {
      home: 'Home',
      blog: 'Blog',
    },
  },
} as const;

export type Translations = typeof translations;

export function useTranslation(language: Language) {
  return translations[language];
}
