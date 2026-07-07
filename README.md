# Together Support — Public Website

## What's new in this update

**New pages**
- `/about` — mission, values, and team structure, with a link through from the homepage
- `/faq` — accordion FAQs grouped for referrers/professionals, landlords, and residents/families
- Both are real routes (via `react-router-dom`), so they're linkable, shareable and indexable on their own — not just anchors on one long page

**SEO**
- Per-page `<title>` and meta description (see `src/components/SEO.tsx`)
- Open Graph + Twitter card tags, canonical URL, and an `Organization` JSON-LD block in `index.html`
- `public/robots.txt` and `public/sitemap.xml` (update the domain in both if you deploy somewhere other than `www.togsupport.co.uk`)

**Performance**
- Removed ~3,300 lines of unused CSS that had been carried over from the admin/back-office build (the public site never used it) — CSS payload dropped from ~62KB to ~21KB
- Added `loading="lazy"`, `decoding="async"`, and explicit width/height on non-hero images to reduce layout shift; the first hero slide loads eagerly since it's above the fold
- Added font `preconnect` hints

**Mobile & accessibility**
- Visible focus outlines on links/buttons/inputs (helps keyboard users, also a Lighthouse accessibility win)
- Respects `prefers-reduced-motion`
- New pages follow the same responsive breakpoints as the rest of the site

**Visual polish**
- Added a second, more characterful display typeface (Fraunces) for headings, paired with the existing Inter for body text — same navy/teal/gold identity, more personality in the type
- Removed a stray, non-functional "Admin Login" link from the mobile menu (there's no admin in this public-only build)

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
   (`react-router-dom` was added for the new pages — do a fresh `npm install`, not just reuse an old `node_modules`.)

2. **Supabase**
   - Create a project at supabase.com (or use your existing one).
   - Run `supabase/schema.sql` in the Supabase SQL editor.
   - Copy `.env.example` to `.env` and fill in your project's URL and anon key.

3. **Run locally**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```
   Output goes to `dist/`.

## Notes
- If your live domain isn't `www.togsupport.co.uk`, update the URL in `public/robots.txt`, `public/sitemap.xml`, `index.html` (canonical + OG tags), and `src/components/SEO.tsx`.
- The team section on `/about` uses role titles (e.g. "Registered Manager") rather than invented names or photos — swap in real names/photos when you're ready.
- This client-side SEO setup (per-page titles/meta via JS) works well for most cases, but if search ranking becomes a priority later, consider a static/SSR build (e.g. via a framework like Next.js or Astro) for the fastest, most reliable indexing.
