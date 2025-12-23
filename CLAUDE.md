# Project: udfnd.com (CV + Blog)

## Goals
- Personal CV + writing archive.
- Minimal, fast, accessible. Dark theme by default.
- Typography-first design.

## Design system
- Font: Pretendard (global). Use system fallbacks.
- Background: near-black. Text: off-white. Muted text: gray.
- One accent color only (links, small highlights).
- Use a single max content width (e.g., 720–860px for reading).

## IA / Pages
- / (Home): name, role, 1-paragraph bio, key links, highlights, latest posts.
- /cv: experience, projects, skills, education.
- /writing: list + tags + search.
- /writing/[slug]: MDX post page.
- /now (optional): what I’m doing lately.

## Implementation constraints
- Prefer Next.js + App Router.
- Use semantic HTML and excellent a11y (heading order, contrast, focus rings).
- Avoid heavy animation. If any, subtle and optional.
- Keep components small and reusable (Section, TimelineItem, Card, Tag).
- Before editing: inspect existing files and follow established patterns.

## Definition of done
- Lighthouse: good scores, no obvious a11y violations.
- Consistent spacing/type across pages.
- Mobile first, looks great on desktop.

