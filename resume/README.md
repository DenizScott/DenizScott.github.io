# Public resume PDFs

The reference CVs (in `/references`) contain a home address and a phone number, so they are **not** published.

To publish a resume:

1. Export a copy of the CV **without** the home address and phone number.
2. Save it here, e.g. `Deniz-Karci-CV-EN.pdf` and `Deniz-Karci-CV-TR.pdf`.
3. Set the paths in `src/data/site.ts` → `resumes` (e.g. `'/resume/Deniz-Karci-CV-EN.pdf'`).

Until a path is set, the Resume section shows a "being prepared" card with a mailto request link.
This README is not linked from the site, but it is deployed with it — it contains no private data.
