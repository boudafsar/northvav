## NorthVave — Agency Portfolio Website

A futuristic, dark, alive portfolio site for a custom software & web design agency. Single-page experience with a neural-network hero, 13 live portfolio previews, and rich micro-interactions.

### Design System
- **Background** `#050508` · **Secondary** `#0C0C14` · **Cards** `#10101A`
- **Primary** `#2563EB` electric blue · **Cyan** `#06B6D4` · **Purple** `#8B5CF6`
- **Text** `#F8FAFC` · **Muted** `#64748B`
- Blue/cyan glows throughout, frosted glass on scroll, soft cursor glow
- Fonts: Space Grotesk (headings, ExtraBold) + Inter (body)
- All tokens defined as HSL in `index.css` and wired into `tailwind.config.ts`

### Sections (single page, `/`)

1. **Navbar** — Pure `#050508` → frosted glass on scroll. Logo left, links + "Start Project" button right. Mobile hamburger → full-screen dark drawer.
2. **Hero (Three.js neural network)**
   - Animated nodes + connecting lines, slow reorganization, pulsing nodes, sparks along edges
   - Mouse warps the field toward cursor
   - Animated badge: `CUSTOM SOFTWARE · WEB · AUTOMATION`
   - 88px word-by-word drop-in headline: *"We Build Digital That Performs."*
   - Sub-copy + two CTAs (gradient pulse + ghost)
   - Pulsing scroll indicator
3. **Portfolio — "Work That Speaks."**
   - 13 cards in a masonry / staggered 3-col grid (responsive: 1 / 2 / 3 cols)
   - Each card: live screenshot via `https://api.microlink.io/?url={URL}&screenshot=true&meta=false&embed=screenshot.url` (no Lovable branding)
   - Hover: screenshot zoom 1.05, gradient overlay, "View Live Site →" button rises
   - Filter pills: All · Healthcare · E-Commerce · SaaS · Real Estate · Fashion · Community · Coaching (Framer Motion `layout` for smooth reshuffle)
   - Staggered scroll-in (0.08s delay each)
   - **Preview modal**: full-screen iframe with custom NorthVave browser bar (`northvave.studio/preview`) so the Lovable URL is hidden below the bar
   - All 13 projects hardcoded exactly as provided
4. **Services** — 3 cards (Web, Custom Software/SaaS, AI Integration) with 3D mouse-tracking tilt, blue top border, glow + 12px lift on hover
5. **Stats Strip** — Count-up on scroll: `13+ Projects · 9 Industries · 100% Custom · 0 Templates`
6. **Process** — Animated SVG line drawing on scroll, 4 nodes (Discovery → Design → Build → Launch) pulsing blue as reached
7. **Contact** — Three.js blue particle field background, form (Name, Email, Need-type dropdown, Message) with zod validation, gradient submit button. Below: `@northvave · hello@northvave.studio`
8. **Footer** — Logo, tagline, social links, copyright

### Micro-interactions
Neural-net mouse warp · card hover zoom + overlay · 3D tilt service cards · Framer Motion layout filtering · count-up stats · SVG draw-on-scroll process line · blue shimmer on CTA hover · top scroll-progress bar · 40px fade-up section entrances · soft blue cursor glow with 150ms lag.

### Technical Notes
- Stack: React + TS + Tailwind + Framer Motion + Three.js (`three` + `@react-three/fiber@^8.18` + `@react-three/drei@^9.122.0`)
- Microlink screenshot URLs are public, no API key needed
- Contact form: client-side only (zod validation + sonner toast). No backend wired — let me know if you want Lovable Cloud + email later
- Mobile: neural network reduced node count for perf; cards stack; modal full-screen
- Files: `src/pages/Index.tsx` composes sections from `src/components/northvave/*` (Navbar, Hero, NeuralNetwork, Portfolio, PortfolioCard, PreviewModal, Services, Stats, Process, Contact, Footer, CursorGlow, ScrollProgress)

### Note on Admin Credentials
You shared an admin email/password, but the brief doesn't include an admin area or auth. I'll **ignore those credentials** and build the public marketing site only. If you want an admin dashboard later (to manage projects from the DB instead of hardcoding), we can add Lovable Cloud auth in a follow-up.

### Out of scope (this build)
- Backend / database / auth / admin panel
- Email sending on contact form (UI + validation only)
- Separate routes beyond `/` and 404
