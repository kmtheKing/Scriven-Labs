# Scrivenlabs — Agency Landing Template (Demo 2 Standalone)

A high-performance, editorial agency landing page built on **Next.js 15 (App Router)**, **Tailwind CSS**, and **Framer Motion**, designed following Swiss editorial principles (Hirael design system) with a signature black, off-white, and crimson color scheme.

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the page.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🎨 Features & Interactive Sections

1. **Floating Pill Navigation**:
   - Pinned island with circular brand emblem.
   - Smooth navigation anchor links (`#how-it-works`, `#features`, `#pricing`, `#connect`).
   - Real-time availability indicator (`● Taking on teams for Q1 2026`).
   - Light/Dark mode toggle with system/document level synchronization.
   - Hirael Rolling Button (`Join waitlist`) with text flip and spinning arrow badge.

2. **Full-Viewport Hero (`h-dvh`)**:
   - Fluid chromatic silk wave simulation in HTML5 Canvas.
   - Bottom-anchored editorial headline (`text-[clamp(2.2rem,6vw,4.5rem)]`).
   - Primary rolling CTA + Certified Partner trust badge.

3. **"The Problem" Section**:
   - Numbered pill badge indicator (`[1] Introducing Scriven`).
   - Streaming AI Typewriter animation revealing problem copy word-by-word.
   - Terminal memory mockup displaying live PR synthesis, commit diff, and decision records.

4. **Product Showcase & Expandable Cards**:
   - Interactive prompt search mockup.
   - 3 Expandable Cards with the signature Hirael expanding hover arrow pill (`w-9 group-hover:w-[130px]`).

5. **Capabilities Spiderweb (Pin & Reveal)**:
   - Sticky locked viewport with central hub node.
   - Dynamic SVG dashed paths drawing outward to illuminate 6 capability nodes on vertical scroll.

6. **Packages Timeline (Horizontal Scroll Hijack)**:
   - Translates vertical scrolling into horizontal translation across 3 tiers (`Solo`, `Paired`, `The whole room`).
   - Dynamic top progress bar tracking scroll progression.

7. **Pricing Tier Cards**:
   - 3 clean side-by-side editorial cards with crimson featured badge.

8. **Giant Typography Watermark Footer**:
   - Clean multi-column links + `18vw` translucent brand watermark: `Scrivenlabs`.

---

## 🚀 One-Click Deploy to Vercel

This repository is ready for zero-configuration deployment on [Vercel](https://vercel.com):

1. Push this folder to a GitHub repository.
2. Import the project into Vercel.
3. Deploy! Next.js App Router and Tailwind CSS will automatically build and optimize.

---

## 📁 Project Structure

```
demo-2-standalone/
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── README.md
└── src/
    └── app/
        ├── layout.tsx     # Global layout & metadata
        ├── globals.css    # Tailwind base styles
        └── page.tsx       # Standalone Scrivenlabs landing page
```
