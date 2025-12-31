import { Language } from '@/stores/useAppStore';

export const translations = {
  ko: {
    hero: {
      role: 'Frontend Engineer',
      name: '한승목',
      bio: 'AI 기반 소프트웨어 개발과 사용자 중심 제품 설계에 관심이 많습니다. 사용자 경험을 향상시키고 비즈니스 성장을 이끄는 확장 가능한 웹 애플리케이션을 구축하는 것에 열정을 가지고 있습니다.',
      interests: '아마추어 드러머, 포커 플레이어, 애니메이션과 게임 애호가.',
      location: '서울, 대한민국',
      focusTitle: '관심 분야',
      focuses: [
        'AI 기반 개발',
        '웹 애플리케이션',
        'UI/UX 설계',
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
          description: '학원 ERP 개발 초기 과정부터 프론트엔드 리드를 맡고 있습니다. 기술 스택 선정, 아키텍처 설계, 주요 기능 구현 등을 담당하고 있으며, 다양한 AI 코딩 에이전트와 MCP 등을 활용해서 현대 개발에 최적화된 환경을 찾고 있습니다.',
          technologies: ['React', 'Next.js', 'Zustand', 'TypeScript', 'Emotion', 'Claude Code', 'Codex'],
        },
        {
          company: 'DeepLeHR',
          role: 'Co-Founder / CTO (정규직)',
          period: '2020년 3월 – 2025년 1월',
          location: '서울',
          description: '디플에이치알을 공동 창업해 초기 MVP부터 서비스 런칭 및 유지보수 전 과정에서 CTO로서 개발팀을 관리하고 프론트엔드 개발을 주도했습니다. 사용자 경험 향상과 확장 가능한 시스템 구축에 중점을 두고, HR 솔루션 개발에 기여했습니다.',
          technologies: ['React', 'Next.js', 'Zustand', 'TypeScript', 'AWS', 'Express.js'],
        },
        {
          company: '더블유컨셉코리아',
          role: '전략기획실 인턴',
          period: '2019년 6월 – 2019년 9월',
          location: '서울 강남구',
          description: '포항공대의 여름방학 인턴십 프로그램(SES)을 통해 전략기획실에서 근무했습니다. 다양한 데이터 분석과 시장 조사 업무를 수행하며, 전략 수립에 기여했습니다.',
          technologies: [],
        },
      ],
    },
    education: {
      title: '학력',
      items: [
        {
          school: '포항공과대학교 (POSTECH)',
          degree: '컴퓨터과학 및 IT융합공학 학사',
          period: '2017년 2월 – 2025년 6월',
          description: 'GPA: 3.32',
        },
        {
          school: 'Rhode Island School of Design (RISD)',
          degree: '교환학생 (Summer)',
          period: '2017년 6월 – 2017년 8월',
          description: '',
        },
        {
          school: 'UC Berkeley',
          degree: '교환학생 (Fall)',
          period: '2017년 9월 – 2017년 12월',
          description: '',
        },
        {
          school: '경남과학고등학교',
          period: '2015년 3월 – 2017년 2월',
        },
      ],
    },
    projects: {
      title: '프로젝트',
      items: [
        {
          name: 'Credittalk 어플리케이션 개발',
          organization: '한금연 및 카이스트',
          period: '2025년 5월 – 2025년 9월',
          description: '외주 작업으로 보이스피싱 예방 어플 Credittalk의 개발 및 배포 전 과정을 담당했습니다.',
        },
        {
          name: 'MonoTouch',
          organization: 'POSTECH',
          period: '2020년 2월 – 2020년 6월',
          description: 'IT융합공학과 전공 수업인 창의설계에서 제작했던 어플리케이션입니다. 한 손으로도 스마트폰을 쉽게 조작할 수 있도록 돕는 앱으로, Java를 사용해 개발했습니다.',
        },
        {
          name: 'Sensing the City : Arduino',
          organization: 'Rhode Island School of Design',
          period: '2017년 6월 – 2017년 8월',
          description: 'RISD 교환학생 최종 프로젝트로, 제품 디자인과 아두이노 소프트웨어 코딩을 담당했습니다.',
        },
        {
          name: '시각장애인용 지팡이 개발',
          organization: '경남과학고등학교',
          period: '2015년 3월 – 2016년 9월',
          description: '고등학교 R&E 프로그램으로 제품 설계, 아두이노 소프트웨어 개발 및 발표를 담당했습니다.',
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
          skills: ['React', 'Next.js', 'TypeScript', 'Emotion', 'Zustand'],
        },
        {
          title: 'Backend',
          skills: ['Node.js', 'Express.js', 'AWS', 'Supabase'],
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
          level: '상급 (일정 수준의 의사소통)',
          certification: 'TOEFL: 106 (2018)',
        },
        {
          language: '중국어',
          level: '중급 (제한적 의사소통)',
          certification: 'HSK: 6급 (2013)',
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
        'UI/UX Design',
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
          description: 'Leading frontend development from the early stages of Academy ERP development. Responsible for technology stack selection, architecture design, and key feature implementation. Exploring modern development environments optimized with various AI coding agents and MCP.',
          technologies: ['React', 'Next.js', 'Zustand', 'TypeScript', 'Emotion', 'Claude Code', 'Codex'],
        },
        {
          company: 'DeepLeHR',
          role: 'Co-Founder / CTO (Full-time)',
          period: 'Mar 2020 – Jan 2025',
          location: 'Seoul',
          description: 'Co-founded DeepLeHR and served as CTO, managing the development team and leading frontend development throughout the entire process from initial MVP to service launch and maintenance. Focused on enhancing user experience and building scalable systems, contributing to HR solution development.',
          technologies: ['React', 'Next.js', 'Zustand', 'TypeScript', 'AWS', 'Express.js'],
        },
        {
          company: 'W Concept Korea',
          role: 'Strategic Planning Intern',
          period: 'Jun 2019 – Sep 2019',
          location: 'Seoul, Gangnam',
          description: 'Worked in the Strategic Planning Department through POSTECH\'s Summer Internship Program (SES). Performed various data analysis and market research tasks, contributing to strategy development.',
          technologies: [],
        },
      ],
    },
    education: {
      title: 'Education',
      items: [
        {
          school: 'POSTECH (Pohang University of Science and Technology)',
          degree: 'B.S. in Computer Science and IT Convergence Engineering',
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
        {
          school: 'Gyeongnam Science High School',
          period: 'Mar 2015 – Feb 2017',
        },
      ],
    },
    projects: {
      title: 'Projects',
      items: [
        {
          name: 'Credittalk Application Development',
          organization: 'Korea Financial Consumers Union & KAIST',
          period: 'May 2025 – Sep 2025',
          description: 'Handled the entire development and deployment process of Credittalk, a voice phishing prevention app, as an outsourcing project.',
        },
        {
          name: 'MonoTouch',
          organization: 'POSTECH',
          period: 'Feb 2020 – Jun 2020',
          description: 'An application developed in the Creative Design course for IT Convergence Engineering major. An app that helps easily operate smartphones with one hand, developed using Java.',
        },
        {
          name: 'Sensing the City : Arduino',
          organization: 'Rhode Island School of Design',
          period: 'Jun 2017 – Aug 2017',
          description: 'Final project as an exchange student at RISD, responsible for product design and Arduino software coding.',
        },
        {
          name: 'Smart Cane for Visually Impaired',
          organization: 'Gyeongnam Science High School',
          period: 'Mar 2015 – Sep 2016',
          description: 'High school R&E program project, responsible for product design, Arduino software development, and presentation.',
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
          description: '5th Place in World Quant IQC National Championship',
        },
        {
          name: 'POSTECH Hackathon 3rd Place',
          issuer: 'POSTECH PoApper',
          year: 'Oct 2018',
          description: '3rd Place in POSTECH PoApper Hackathon',
        },
        {
          name: 'ISEF Alumnus',
          issuer: 'Intel International Science and Engineering Fair',
          year: '2017',
          description: 'Participated in 2017 Intel ISEF',
        },
      ],
    },
    skills: {
      title: 'Skills',
      categories: [
        {
          title: 'Frontend',
          skills: ['React', 'Next.js', 'TypeScript', 'Emotion', 'Zustand'],
        },
        {
          title: 'Backend',
          skills: ['Node.js', 'Express.js', 'AWS', 'Supabase'],
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
          level: 'Advanced (Professional communication)',
          certification: 'TOEFL: 106 (2018)',
        },
        {
          language: 'Chinese',
          level: 'Intermediate (Limited communication)',
          certification: 'HSK: Level 6 (2013)',
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
  zh: {
    hero: {
      role: '前端工程师',
      name: '韩承穆',
      bio: '对AI驱动的软件开发和以用户为中心的产品设计充满热情。致力于构建可扩展的Web应用程序，提升用户体验并推动业务增长。',
      interests: '业余鼓手、扑克玩家，喜欢动漫和游戏。',
      location: '韩国首尔',
      focusTitle: '专注领域',
      focuses: [
        'AI驱动开发',
        'Web应用程序',
        'UI/UX设计',
      ],
    },
    experience: {
      title: '工作经历',
      items: [
        {
          company: '기깔콘',
          role: '前端工程师（全职）',
          period: '2025年9月 – 至今',
          location: '首尔',
          description: '从学院ERP开发初期阶段开始担任前端负责人。负责技术栈选型、架构设计和核心功能实现，利用各种AI编程代理和MCP探索现代开发的最优环境。',
          technologies: ['React', 'Next.js', 'Zustand', 'TypeScript', 'Emotion', 'Claude Code', 'Codex'],
        },
        {
          company: 'DeepLeHR',
          role: '联合创始人 / CTO（全职）',
          period: '2020年3月 – 2025年1月',
          location: '首尔',
          description: '共同创立DeepLeHR，作为CTO管理开发团队并主导前端开发，从初期MVP到服务上线及维护的全过程。专注于提升用户体验和构建可扩展系统，为HR解决方案开发做出贡献。',
          technologies: ['React', 'Next.js', 'Zustand', 'TypeScript', 'AWS', 'Express.js'],
        },
        {
          company: 'W Concept Korea',
          role: '战略规划实习生',
          period: '2019年6月 – 2019年9月',
          location: '首尔江南区',
          description: '通过浦项工科大学暑期实习项目(SES)在战略规划部门工作。进行各种数据分析和市场调研工作，为战略制定做出贡献。',
          technologies: [],
        },
      ],
    },
    education: {
      title: '教育背景',
      items: [
        {
          school: '浦项工科大学（POSTECH）',
          degree: '计算机科学与IT融合工程学士',
          period: '2017年2月 – 2025年6月',
          description: 'GPA: 3.32',
        },
        {
          school: '罗德岛设计学院（RISD）',
          degree: '交换生（夏季）',
          period: '2017年6月 – 2017年8月',
          description: '',
        },
        {
          school: '加州大学伯克利分校',
          degree: '交换生（秋季）',
          period: '2017年9月 – 2017年12月',
          description: '',
        },
        {
          school: '庆南科学高中',
          period: '2015年3月 – 2017年2月',
        },
      ],
    },
    projects: {
      title: '项目',
      items: [
        {
          name: 'Credittalk应用开发',
          organization: '韩国金融消费者联合会及KAIST',
          period: '2025年5月 – 2025年9月',
          description: '作为外包项目，负责语音钓鱼预防应用Credittalk的开发和部署全过程。',
        },
        {
          name: 'MonoTouch',
          organization: 'POSTECH',
          period: '2020年2月 – 2020年6月',
          description: 'IT融合工程专业创意设计课程中开发的应用程序。一款帮助用户单手轻松操作智能手机的应用，使用Java开发。',
        },
        {
          name: 'Sensing the City : Arduino',
          organization: '罗德岛设计学院',
          period: '2017年6月 – 2017年8月',
          description: 'RISD交换生最终项目，负责产品设计和Arduino软件编程。',
        },
        {
          name: '视障人士智能手杖开发',
          organization: '庆南科学高中',
          period: '2015年3月 – 2016年9月',
          description: '高中R&E项目，负责产品设计、Arduino软件开发和演示。',
        },
      ],
    },
    awards: {
      title: '荣誉奖项',
      items: [
        {
          name: 'World Quant锦标赛第五名',
          issuer: 'World Quant',
          year: '2025年7月',
          description: 'World Quant IQC全国锦标赛第五名',
        },
        {
          name: 'POSTECH黑客马拉松第三名',
          issuer: 'POSTECH PoApper',
          year: '2018年10月',
          description: 'POSTECH PoApper黑客马拉松第三名',
        },
        {
          name: 'ISEF校友',
          issuer: '英特尔国际科学与工程大奖赛',
          year: '2017年',
          description: '参加2017年英特尔ISEF',
        },
      ],
    },
    skills: {
      title: '技能',
      categories: [
        {
          title: '前端',
          skills: ['React', 'Next.js', 'TypeScript', 'Emotion', 'Zustand'],
        },
        {
          title: '后端',
          skills: ['Node.js', 'Express.js', 'AWS', 'Supabase'],
        },
        {
          title: 'AI工具',
          skills: ['Claude Code', 'Codex'],
        },
      ],
    },
    languages: {
      title: '语言能力',
      items: [
        {
          language: '英语',
          level: '高级（一定程度的沟通）',
          certification: 'TOEFL: 106 (2018)',
        },
        {
          language: '中文',
          level: '中级（有限沟通）',
          certification: 'HSK: 六级 (2013)',
        },
      ],
    },
    contact: {
      title: '联系方式',
      description: '如果您想讨论新项目或合作机会，请随时与我联系。',
    },
    nav: {
      home: '首页',
      blog: '博客',
    },
  },
  ja: {
    hero: {
      role: 'フロントエンドエンジニア',
      name: 'ハン・スンモク',
      bio: 'AI駆動のソフトウェア開発とユーザー中心のプロダクト設計に情熱を持っています。ユーザー体験を向上させ、ビジネス成長を促進するスケーラブルなWebアプリケーションの構築に取り組んでいます。',
      interests: 'アマチュアドラマー、ポーカープレイヤー、アニメとゲームが好きです。',
      location: '韓国ソウル',
      focusTitle: '専門分野',
      focuses: [
        'AI駆動開発',
        'Webアプリケーション',
        'UI/UXデザイン',
      ],
    },
    experience: {
      title: '職歴',
      items: [
        {
          company: '기깔콘',
          role: 'フロントエンドエンジニア（正社員）',
          period: '2025年9月 – 現在',
          location: 'ソウル',
          description: '学習塾ERP開発の初期段階からフロントエンドリードを担当。技術スタック選定、アーキテクチャ設計、主要機能の実装を担当し、様々なAIコーディングエージェントやMCPを活用して現代の開発に最適化された環境を模索しています。',
          technologies: ['React', 'Next.js', 'Zustand', 'TypeScript', 'Emotion', 'Claude Code', 'Codex'],
        },
        {
          company: 'DeepLeHR',
          role: '共同創業者 / CTO（正社員）',
          period: '2020年3月 – 2025年1月',
          location: 'ソウル',
          description: 'DeepLeHRを共同創業し、CTOとして開発チームを管理し、初期MVPからサービスローンチおよび保守まで全過程でフロントエンド開発をリード。ユーザー体験の向上とスケーラブルなシステム構築に重点を置き、HRソリューション開発に貢献しました。',
          technologies: ['React', 'Next.js', 'Zustand', 'TypeScript', 'AWS', 'Express.js'],
        },
        {
          company: 'W Concept Korea',
          role: '戦略企画室インターン',
          period: '2019年6月 – 2019年9月',
          location: 'ソウル江南区',
          description: 'POSTECHの夏季インターンシッププログラム(SES)を通じて戦略企画室で勤務。様々なデータ分析と市場調査業務を行い、戦略策定に貢献しました。',
          technologies: [],
        },
      ],
    },
    education: {
      title: '学歴',
      items: [
        {
          school: '浦項工科大学校（POSTECH）',
          degree: 'コンピュータサイエンス及びIT融合工学学士',
          period: '2017年2月 – 2025年6月',
          description: 'GPA: 3.32',
        },
        {
          school: 'ロードアイランド・スクール・オブ・デザイン（RISD）',
          degree: '交換留学生（夏期）',
          period: '2017年6月 – 2017年8月',
          description: '',
        },
        {
          school: 'カリフォルニア大学バークレー校',
          degree: '交換留学生（秋期）',
          period: '2017年9月 – 2017年12月',
          description: '',
        },
        {
          school: '慶南科学高校',
          period: '2015年3月 – 2017年2月',
        },
      ],
    },
    projects: {
      title: 'プロジェクト',
      items: [
        {
          name: 'Credittalkアプリ開発',
          organization: '韓国金融消費者連合及びKAIST',
          period: '2025年5月 – 2025年9月',
          description: '外注プロジェクトとして、ボイスフィッシング防止アプリCredittalkの開発から配布まで全過程を担当しました。',
        },
        {
          name: 'MonoTouch',
          organization: 'POSTECH',
          period: '2020年2月 – 2020年6月',
          description: 'IT融合工学専攻の創意設計授業で制作したアプリケーション。片手でもスマートフォンを簡単に操作できるようにするアプリで、Javaを使用して開発しました。',
        },
        {
          name: 'Sensing the City : Arduino',
          organization: 'ロードアイランド・スクール・オブ・デザイン',
          period: '2017年6月 – 2017年8月',
          description: 'RISD交換留学の最終プロジェクトとして、プロダクトデザインとArduinoソフトウェアコーディングを担当しました。',
        },
        {
          name: '視覚障害者向けスマート杖開発',
          organization: '慶南科学高校',
          period: '2015年3月 – 2016年9月',
          description: '高校R&Eプログラムプロジェクトとして、製品設計、Arduinoソフトウェア開発、発表を担当しました。',
        },
      ],
    },
    awards: {
      title: '受賞歴',
      items: [
        {
          name: 'World Quant Championship 5位',
          issuer: 'World Quant',
          year: '2025年7月',
          description: 'World Quant IQC全国選手権5位',
        },
        {
          name: 'POSTECHハッカソン3位',
          issuer: 'POSTECH PoApper',
          year: '2018年10月',
          description: 'POSTECH PoApperハッカソン3位',
        },
        {
          name: 'ISEF参加者',
          issuer: 'インテル国際科学技術フェア',
          year: '2017年',
          description: '2017年インテルISEFに参加',
        },
      ],
    },
    skills: {
      title: 'スキル',
      categories: [
        {
          title: 'フロントエンド',
          skills: ['React', 'Next.js', 'TypeScript', 'Emotion', 'Zustand'],
        },
        {
          title: 'バックエンド',
          skills: ['Node.js', 'Express.js', 'AWS', 'Supabase'],
        },
        {
          title: 'AIツール',
          skills: ['Claude Code', 'Codex'],
        },
      ],
    },
    languages: {
      title: '言語能力',
      items: [
        {
          language: '英語',
          level: '上級（一定レベルのコミュニケーション）',
          certification: 'TOEFL: 106 (2018)',
        },
        {
          language: '中国語',
          level: '中級（限定的コミュニケーション）',
          certification: 'HSK: 6級 (2013)',
        },
      ],
    },
    contact: {
      title: 'お問い合わせ',
      description: '新しいプロジェクトやコラボレーションの機会についてお話しされたい場合は、お気軽にご連絡ください。',
    },
    nav: {
      home: 'ホーム',
      blog: 'ブログ',
    },
  },
} as const;

export type Translations = typeof translations;

export function useTranslation(language: Language) {
  return translations[language];
}
