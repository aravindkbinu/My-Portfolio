# Premium Graphic Design & Video Editing Portfolio

An editorial portfolio website engineered for graphic designers, art directors, and video editors. Built exclusively using **vanilla HTML5, CSS3, and JavaScript**, without external dependencies or build tools.

---

## ✦ Design Direction & Aesthetic

- **Warm Cream Canvas:** `#F5F3EE` paired with `#ECE8E0` surface layers.
- **Deep Charcoal Typography:** `#171717` providing editorial contrast.
- **Electric Lime Signature Accent:** `#D6FF3F` for kinetic focal points.
- **Dark Cinematic Video Realm:** `#0C0D10` background for showreels and film cuts.
- **Typography Pairing:** Avant-garde display (`Syne`), classic editorial serif (`Instrument Serif`), modern technical sans (`Space Grotesk`), and tabular data monospace (`Space Mono`).
- **Asymmetrical Editorial Layouts:** Dynamic 12-column grid with varied project hierarchies, full-width features, and generous negative space.

---

## ✦ File Structure

```text
Portfolio/
├── index.html              # Semantic HTML5 markup containing all portfolio sections
├── style.css               # Pure CSS3 styling, design tokens, and responsive layout
├── script.js               # Vanilla JavaScript ES6+ (Modals, filters, animations, cursor)
├── assets/
│   ├── images/             # Vector SVG posters, artwork, portraits, and showreels
│   │   ├── hero-composition.svg
│   │   ├── about-portrait.svg
│   │   ├── showreel-poster.svg
│   │   ├── project-1-hyperion.svg
│   │   ├── project-2-nocturne.svg
│   │   ├── project-3-chroma.svg
│   │   ├── project-4-velocity.svg
│   │   ├── project-5-aura.svg
│   │   ├── project-6-drift.svg
│   │   ├── project-7-monolith.svg
│   │   ├── project-8-synapse.svg
│   │   ├── project-9-obsidian.svg
│   │   └── project-10-echoes.svg
│   └── videos/             # Directory for your local .mp4 showreels or teaser clips
└── README.md               # Documentation & customization guide
```

---

## ✦ Features Included

1. **Editorial Hero Section:**
   - Staggered headline entrance animation: *DESIGN THAT MAKES YOU LOOK TWICE*.
   - Live availability badge (`AVAILABLE FOR SELECT COMMISSIONS — 2026`).
   - Layered artwork and video still composition with depth.
   - Smooth anchor buttons (`Explore My Work`, `Let's Collaborate`).
2. **Curated Portfolio Gallery (10 Sample Projects):**
   - Covers Graphic Design, Brand Identity, Poster Design, Video Editing, Commercial Films, Social Reels, and Motion Graphics.
   - Dynamic category filter buttons with project counts and smooth transition fades.
   - Contextual custom cursor showing `VIEW` for design projects or `PLAY` for video projects.
   - Interactive Case Study Lightbox Modal displaying expanded artwork, client, discipline, software tools, and color harmony swatches.
3. **Cinematic Dark Video Section:**
   - Headline: *EVERY FRAME TELLS A STORY*.
   - Featured Showreel Showcase card with pulsating play trigger.
   - Triad grid of secondary video works (Narrative Film, Fashion Commercial, 9:16 Kinetic Reel).
   - Functional native JavaScript video modal with procedural canvas audio visualizer, frame timecode, play/pause HUD controls, scrubber track, and zero-sound initial launch (never autoplays with sound).
4. **About Section:**
   - Creative director workspace visual and design philosophy.
   - Elegant text-based skill labels (Photoshop, Illustrator, Premiere Pro, After Effects, DaVinci Resolve, Figma, Cinema 4D).
   - Studio statistics (Years of Craft, Directed Projects, Video Impressions).
5. **Services Section:**
   - 4 bespoke disciplines: Graphic Design, Video Editing, Motion Graphics, Visual Identity.
   - Hover reveals with deliverables checklists.
6. **Creative Process:**
   - 4-step workflow: 01 Discover, 02 Concept, 03 Create, 04 Deliver.
7. **Contact & Commissions:**
   - 1-click "Copy Email" button with instant feedback.
   - Validated project inquiry form with service selectors.
   - Clearly marked social placeholders for Instagram, Behance, Vimeo, and LinkedIn.
8. **Accessibility & Performance:**
   - Zero framework overhead; loads instantly.
   - Supports `prefers-reduced-motion` to disable animations for accessibility.
   - Keyboard accessible modals (`Esc` to close, tab-friendly).
   - Fully responsive across desktop, laptop, tablet, and mobile.

---

## ✦ How to Run the Website

### Option A: Direct Browser Launch
Simply double-click `index.html` or open it with your web browser:
```bash
open index.html
```

### Option B: Local Development Server (Recommended)
You can run a lightweight local HTTP server directly from the terminal without installing npm or Node.js:

**Using Ruby (macOS Built-in):**
```bash
ruby -run -e httpd -- --port=8080 .
```
Then navigate to `http://localhost:8080` in your browser.

**Using Python (if installed):**
```bash
python3 -m http.server 8080
```

---

## ✦ How to Customize Your Content

All website content is organized cleanly and labeled with comments:

### 1. Change Your Name & Branding
Open `index.html` and search for `[YOUR NAME]`:
- Line 5: `<title>[YOUR NAME] — Graphic Designer & Video Editor</title>`
- Line 41: `<span class="brand-name">[YOUR NAME]</span>`
- Line 427: `<span class="portrait-name">[YOUR NAME]</span>`
- Line 578: `<span class="footer-copy">© 2026 [YOUR NAME]...`

### 2. Replace Project Artwork & Videos
- **Images:** Add your project screenshots or posters into `assets/images/`. Update the `src` attribute in `index.html` or in `script.js` under `PROJECTS_DATA`.
- **Videos:** Place your video file (e.g., `showreel.mp4`) into `assets/videos/`. You can also embed any YouTube or Vimeo iframe into `.player-aspect-box` in `index.html`.

### 3. Update Social & Email Links
In `index.html` under the `#contact` section:
- Replace `hello@yourname.design` with your real email.
- Replace `[YOUR_HANDLE]` in the Instagram, Behance, Vimeo, and LinkedIn links.

### 4. Customizing Project Details
Open `script.js` and modify the `PROJECTS_DATA` object at the top of the file to update client names, tools, color swatches, and case study briefs.
