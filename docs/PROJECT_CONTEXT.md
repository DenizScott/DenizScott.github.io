# PROJECT CONTEXT — Coşkun Deniz Karcı Portfolio

## 1. Project Purpose & Professional Positioning
This project is the official personal portfolio website for **Coşkun Deniz Karcı** (short brand: **Deniz Karcı**), built from scratch as a production-grade, highly accessible, high-performance, and bilingual web experience.

Deniz Karcı is a **Digital Game Design student at Doğuş University** and an independent creator operating at the convergence of:
- **Artificial Intelligence & LLM Systems** (Claude, ChatGPT, Gemini, Prompt Engineering, Vibe Coding, MCP Workflows)
- **Game Development** (Unreal Engine, Unity, Gameplay Prototyping, Interactive Systems)
- **Software Development** (Electron, React, TypeScript, Vite, Desktop Architecture)
- **Visual & Digital Design** (Adobe Photoshop, Illustrator, Premiere Pro, Audition)

He is positioned not merely as an "AI user" or "content creator", but as a multi-disciplinary technical creator who integrates modern AI models and MCP integrations into end-to-end software, game, and design workflows.

---

## 2. Architecture & Technology Stack

- **Framework & Language:** React 19, TypeScript 6 (strict mode), Vite 8
- **Styling & Design System:** Tailwind CSS v4, `@tailwindcss/vite`, CSS Variables for design tokens
- **Typography:** `@fontsource-variable/space-grotesk` (headings & display) + `@fontsource-variable/inter` (body & UI)
- **Animations:** Motion (`motion/react`) with full `prefers-reduced-motion` compliance
- **Icons:** Lucide Icons (`lucide-react`) + SVG components for social brand marks
- **Routing:** React Router v7 (`react-router-dom`) with localized URL routing (`/en`, `/tr`, `/en/projects/:slug`, `/tr/projects/:slug`, `/404`)
- **Prerender & SEO Plugin:** Custom Vite plugin (`plugins/seo-static.ts`) that prerenders 10 localized HTML route shells, generates dynamic `sitemap.xml`, `robots.txt`, `404.html`, and manages Open Graph / Twitter Card / JSON-LD schemas.
- **Deployment Target:** Cloudflare Pages (static SPA with headers and prerendered shells).

---

## 3. Directory Structure

```
deniz-karci-portfolio/
├── docs/
│   ├── PROJECT_CONTEXT.md   # Architectural decisions, design tokens, context
│   ├── PROGRESS.md          # Completed phases and verification logs
│   └── NEXT_STEPS.md         # Future enhancements and optional tasks
├── plugins/
│   └── seo-static.ts        # Prerender, sitemap, robots, 404 & SEO plugin
├── public/
│   ├── _headers             # Cloudflare Pages security & caching headers
│   ├── favicon.svg          # Dynamic gradient brand favicon
│   ├── og-image.png         # 1200x630 Open Graph preview image
│   └── resume/              # Destination for sanitized public resume PDFs
├── references/              # Original reference CVs (protected, not published)
├── scripts/
│   ├── check-content.ts     # Automated integrity test for all data & assets
│   ├── check-links.mjs      # Post-build file & route shell verification
│   ├── test-browser.mjs     # Headless Edge CDP browser & screenshot runner
│   └── debug-images.mjs     # Deep DOM image inspection tool
├── src/
│   ├── assets/              # WebP/PNG images (underwake, omni, cyber-rebirth, profile)
│   ├── components/
│   │   ├── layout/          # Header, Footer, Ambient, BackToTop, LanguageSwitcher, ScrollManager
│   │   ├── project/         # ProjectCard, ProjectCover, StatusBadge, GalleryModal
│   │   ├── ui/              # Button, Chip, Icons, MediaImage, Reveal, SectionHeading
│   │   └── Seo.tsx          # Client-side dynamic document head manager
│   ├── data/
│   │   ├── experience.ts    # Work history and university education
│   │   ├── expertise.ts     # Categorized skills (basic/advanced as in CV)
│   │   ├── projects.ts      # Single source of truth for all projects
│   │   ├── site.ts          # Central site config, public links, placeholders
│   │   ├── types.ts         # TypeScript data contracts & languages
│   │   └── workflows.ts     # "AI as a Creative & Development Partner"
│   ├── i18n/
│   │   └── context.ts       # React I18nContext and useI18n hook
│   ├── lib/
│   │   ├── media.ts         # Media registry with intrinsic width/height & WebP mappings
│   │   ├── routes.ts        # Language-aware route helpers
│   │   ├── seo.ts           # Schema.org and Open Graph metadata builder
│   │   ├── storage.ts       # Safe localStorage wrapper for language preference
│   │   └── useActiveSection.ts # IntersectionObserver active nav state
│   ├── locales/
│   │   ├── en.ts            # English translations (default)
│   │   ├── tr.ts            # Turkish translations
│   │   ├── types.ts         # Dictionary type definitions
│   │   └── index.ts         # Locale dictionary exports & format utility
│   ├── pages/
│   │   ├── Home.tsx         # Assembled single-page experience
│   │   ├── LangLayout.tsx   # Language wrapper with header, footer, accessibility
│   │   ├── NotFound.tsx     # 404 error page
│   │   └── ProjectDetail.tsx# Comprehensive 10-point project case study
│   ├── styles/
│   │   └── index.css        # Base styles, Tailwind @theme tokens, animations
│   ├── App.tsx              # React Router structure and root redirection
│   └── main.tsx             # Entry point
├── index.html               # Base HTML template with SEO placeholder markers
├── package.json             # Scripts and dependencies
├── tsconfig.json            # Strict TypeScript configuration
└── vite.config.ts           # Vite bundler setup
```

---

## 4. Design System & Theme Tokens

- **Palette:**
  - Ink (Background): `#0B1020` / Ink-2: `#0E1428`
  - Surfaces: `#151D32` (Glass cards), `#1B2540`
  - Foregrounds: `#F3F6FC` (Primary text), `#A4AEC0` (Muted), `#7D889D` (Subtle)
  - Accents: Blue (`#667EFF`), Teal (`#21C7C7`), Violet (`#A184FF`), Magenta (`#FF62AE`)
- **Typography:**
  - Display / Headings: `Space Grotesk Variable`
  - Body & Labels: `Inter Variable`
- **Effects:** Controlled frosted glass (`backdrop-filter: blur(14px)`), hairline borders with linear gradient masks, ambient glow following fine pointers (disabled on touch & reduced motion), circular orbital avatar frame.

---

## 5. Projects & Accuracy Rules

The four featured projects are strictly ordered:
1. **Underwake** (Unreal Engine — playable prototype, Dash/Lasso, night street & station captures)
2. **Omni** (Electron, React, TypeScript, .NET media bridge — Windows desktop workspace, 0.27.1 beta paused)
3. **LudenOS** (Gamer web platform, independent AI-assisted & vibe coding, transparent placeholder for media)
4. **Cyber Rebirth** (Tabletop strategy game, full 2D cyberpunk card design & layouts, 50+ printed cards rendered)

**Ground Truth Guarantee:**
- No invented statistics, customer logos, or unverified claims.
- Real captured assets only (from Unreal Engine screenshots, Omni verification captures, and Cyber Rebirth PDFs).
- Private data (home street address and telephone number) is never deployed. Resumes require sanitized copies before publication.
