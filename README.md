# Coşkun Deniz Karcı — Premium Personal Portfolio

A modern, high-performance, accessible, and bilingual personal developer portfolio website for **Coşkun Deniz Karcı (Deniz Karcı)**, showcasing work in Artificial Intelligence, Game Development, Software Engineering, and Visual Design.

Live Demo / Prerendered Static Site ready for **Cloudflare Pages**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (Node 22 or 24 recommended)
- npm 10+

### Installation
```bash
# Clone or navigate to the project directory
cd deniz-karci-portfolio

# Install dependencies
npm install
```

### Local Development
```bash
# Start Vite development server
npm run dev
```
Open `http://localhost:5173` in your browser. Navigating to `/` will automatically redirect to `/en` (or `/tr` based on stored preferences).

### Full Verification Pipeline
Runs typecheck, linter, content integrity audit, production build, and static link checks in sequence:
```bash
npm run verify
```

### Production Build & Preview
```bash
# Build production bundles & prerender static HTML shells
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack & Architecture

- **Core:** React 19, TypeScript 6 (strict), Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), custom CSS token system
- **Typography:** Space Grotesk Variable (display), Inter Variable (body/UI)
- **Animations:** Motion (`motion/react`) with full `prefers-reduced-motion` support
- **Icons:** Lucide Icons & handcrafted SVG brand marks
- **Routing & i18n:** React Router v7 with `/en` and `/tr` language-based URLs
- **SEO & Static Prerendering:** Custom Vite plugin (`plugins/seo-static.ts`) generating:
  - 10 static HTML route shells
  - `sitemap.xml` with bidirectional `hreflang` tags
  - `robots.txt`
  - `404.html` fallback
  - Open Graph, Twitter Cards, and Schema.org JSON-LD

---

## 📁 Project Structure

```
├── docs/                # Architecture, progress log, and next steps
├── plugins/             # Custom Vite prerender & SEO generator
├── public/              # Static assets, favicon, OG image, headers, resume folder
├── references/          # Source CVs (protected, never published)
├── scripts/             # Automated validation and headless browser test scripts
├── src/
│   ├── assets/          # Real project media (WebP/PNG)
│   ├── components/      # UI, layout, project cards, gallery modal, SEO
│   ├── data/            # Centralized content (projects, expertise, site, etc.)
│   ├── i18n/            # Language context and hooks
│   ├── lib/             # Routes, media registry, storage, active section
│   ├── locales/         # Bilingual dictionaries (en, tr)
│   ├── pages/           # Home, ProjectDetail, NotFound, LangLayout
│   └── styles/          # Base styling & theme tokens
```

---

## ✏️ How to Edit Content & Add Projects

### 1. Site Metadata & Links
Edit `src/data/site.ts`:
- Change `siteUrl` or pass `VITE_SITE_URL` at build time.
- Update public email or add a GitHub profile link.
- Connect public resume PDFs once exported.

### 2. Adding / Modifying Projects
Projects are managed in `src/data/projects.ts`:
- Update project descriptions, features, or approaches.
- To add a new project, append an object to `projects`, drop optimized WebP images into `src/assets/projects/<slug>/`, and register them in `src/lib/media.ts`.
- Run `npm run verify` to validate and generate static pages.

### 3. Public Resume Upload
Because original CVs contain private phone numbers and street addresses, they are protected.
To publish your public resume:
1. Export a version of your CV with only public details.
2. Save it into `public/resume/Deniz-Karci-CV-EN.pdf` (and TR equivalent).
3. Set the path in `src/data/site.ts` (`resumes.en = '/resume/Deniz-Karci-CV-EN.pdf'`).

---

## ☁️ Cloudflare Pages Deployment

1. Push this repository to GitHub / GitLab.
2. In Cloudflare Dashboard, go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select this repository and configure:
   - **Framework preset:** `None` (or `Vite`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:**
     - `VITE_SITE_URL`: `https://your-domain.com`
     - `NODE_VERSION`: `22` (or `20`)
4. Click **Save and Deploy**. Cloudflare Pages will serve the pre-rendered SPA with sub-second performance.

---

## 📜 License & Ownership
Designed and developed for **Coşkun Deniz Karcı**. All project media and branding rights belong to the respective projects.
