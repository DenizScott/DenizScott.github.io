# NEXT STEPS & ROADMAP — Coşkun Deniz Karcı Portfolio

## 1. Public Resume Files (Action Required by Owner)
- **Status:** The reference CV files contain a private home address and personal phone number. For safety, these are excluded from deployment.
- **Action:**
  1. Open the CV source documents and export public-safe versions without the street address or phone number (e.g. keeping city "İstanbul / Türkiye" and email/LinkedIn).
  2. Save them to `public/resume/Deniz-Karci-CV-EN.pdf` and `public/resume/Deniz-Karci-CV-TR.pdf`.
  3. Open `src/data/site.ts` and set:
     ```ts
     resumes: {
       en: '/resume/Deniz-Karci-CV-EN.pdf',
       tr: '/resume/Deniz-Karci-CV-TR.pdf',
     }
     ```
  4. Run `npm run verify` to rebuild.

---

## 2. Production Domain & Deployment to Cloudflare Pages
- **Environment Variable:**
  When connecting to Cloudflare Pages, set the environment variable:
  ```
  VITE_SITE_URL=https://your-custom-domain.com
  ```
- **Build Settings on Cloudflare Pages:**
  - **Framework preset:** None (or Vite)
  - **Build command:** `npm run build`
  - **Build output directory:** `dist`
  - **Node.js version:** `20` or `22` (e.g. `NODE_VERSION=22`)
- **Single Page Application (SPA) Routing:**
  The project generates `dist/404.html` and static route shells (`/en/index.html`, `/tr/index.html`, etc.). Cloudflare Pages automatically serves `404.html` for unknown paths and the route directories directly.

---

## 3. Media & Content Additions (When Available)
- **Underwake Gameplay Video:**
  Once an official gameplay clip is recorded, add the video file to `public/media/underwake-preview.mp4` and update `video` in `src/data/projects.ts`.
- **LudenOS Visuals:**
  When screenshots or a live URL for LudenOS become available:
  1. Place screenshots in `src/assets/projects/ludenos/`.
  2. Register them in `src/lib/media.ts`.
  3. Update `projects.ts` (`cover`, `gallery`, `links`).
- **GitHub Profile:**
  When ready to display a public GitHub profile on the site, add the URL in `src/data/site.ts` under `github`.

---

## 4. How to Add a New Project in the Future
1. Open `src/data/projects.ts`.
2. Add a new project object to the `projects` array with:
   - `id`, `slug`, `featuredOrder`
   - Bilingual `title`, `category`, `summary`, and `detail`
   - Verified `technologies` and `status`
3. Add images to `src/assets/projects/<slug>/` and register them in `src/lib/media.ts`.
4. Run `npm run verify`. The build automatically:
   - Prerenders `/en/projects/<slug>/index.html` and `/tr/projects/<slug>/index.html`.
   - Adds the new pages to `sitemap.xml`.
   - Links previous and next project pagination seamlessly.
