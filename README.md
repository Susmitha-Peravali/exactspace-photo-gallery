# Modern React Photo Gallery with Infinite Scrolling

A high-performance, responsive single-column Photo Gallery web application built with **React 18**, **Vite**, and the **Picsum Photos REST API**. Features seamless infinite scrolling via the **Intersection Observer API**, independent reactive like/unlike toggle, an animated particle canvas with ambient auroras, creative photographer profiles with illustrated avatars and EXIF metadata, and a fullscreen lightbox modal.

Built for the Frontend / UI Developer internship selection assignment.

---

## 🌟 Key Features & Innovations

### 🌌 1. Full-Screen Ambient Particle Canvas & Auroras
- **Canvas-Driven Particle Field**: Gentle floating particles with depth-based 3D parallax responsive to mouse movement.
- **Theme-Adaptive Palettes**:
  - **Dark Mode**: Soft cyan, indigo, light sky blue, and pure star white.
  - **Light Mode**: High-contrast deep cerulean, rich indigo, teal, and vivid violet so particles remain clearly visible.
- **Constellation Lines**: Soft connection threads drawn between proximate particles.
- **Atmospheric Auroras & Vignette**: Multi-layered floating light clouds and analog fine-art film grain.

### 🎨 2. Creative Photographer Profile & Card Design
- **Illustrated DiceBear Avatars**: Unique SVG adventurer avatar generated for each photographer with animated gradient fallback rings.
- **Branded Photographer Identity**:
  - Photographer name with a verified checkmark badge (✓).
  - Clean `@handle` generated per artist.
  - Genre category pill (Landscape, Architecture, Aerial, etc.).
- **Camera EXIF Metadata**: Camera body (`Sony α7 IV`, `Canon EOS R5`, etc.), aperture (`f/2.8`), and focal length (`50mm`).
- **Interactive Action Bar**:
  - 🔖 **Bookmark**: Instant save/bookmark toggle.
  - ↗ **Share**: Copies direct image URL with animated "Copied" feedback.
  - 👍 **Like Pill**: Independent count, colorful confetti burst, tactile spring bounce, and floating `+1` / `-1` indicators.
- **Hover Overlays & Double-Tap**: Image zoom with resolution info badge and double-click to like with floating thumbs-up burst.

### ♾️ 3. Infinite Scrolling via Intersection Observer
- Continuous pagination starting from `page=1` up to 50 continuous pages (300+ authentic photographs).
- Efficient native `IntersectionObserver` observing a sentinel element below the feed.
- Loading shimmer skeletons during data fetch.
- Duplicate prevention and request deduplication.
- End-of-feed notification ("You’re All Caught Up") with a "Back to Top" shortcut.

### ⚡ 4. High-Resilience Fast Probe Delivery
- Resilient probe mechanism to guarantee sub-100ms image delivery even across restricted campus/enterprise firewalls or CORS blocks.
- Native `loading="lazy"` on all photographs.

### 🌗 5. Theme & View Customization
- **Dark Mode & Light Mode**: Seamless theme toggle with instant particle palette adaptation and `localStorage` persistence.
- **Spacious & Compact Layout**: Switch between `920px` and `740px` widths.
- **Community Stats Bar**: Real-time counters for loaded photos, total likes, and a live pulse beacon.
- **Reading Progress & FAB**: Top progress bar tracking scroll depth and a floating Back-to-Top action button.
- **Fullscreen Lightbox**: Full-resolution viewing modal with author metadata, dimensions, and external source link.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
cd photo-gallery
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

---

## 📁 Project Architecture

```
photo-gallery/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx                      # App root state & observer coordinator
    ├── App.css                      # Gallery layout, profile strip, actions, auroras
    ├── index.css                    # Design tokens & color system
    ├── components/
    │   ├── AnimatedBackground.jsx   # Interactive canvas particle field & auroras
    │   ├── Header.jsx               # Header, title, theme switcher, live stats
    │   ├── PhotoCard.jsx            # Card, profile strip, actions, double-tap
    │   ├── PhotoList.jsx            # Single-column feed list container
    │   ├── Lightbox.jsx             # Fullscreen photography modal
    │   └── Loader.jsx               # Shimmer skeleton loading cards
    ├── hooks/
    │   └── useInfinitePhotos.js     # Infinite scrolling & fast probe hook
    └── data/
        └── picsumData.js            # 50-page photography stream (300+ items)
```

---

## 📄 License
MIT
