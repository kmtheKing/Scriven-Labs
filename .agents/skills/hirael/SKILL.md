---
name: hirael
description: Swiss-style editorial agency design system and landing template based on Hirael (https://hirael.com/embed/templates/agency-landing). Activate whenever the user mentions "Hirael", "Hieael", "agency-landing", or asks for editorial agency aesthetic with rolling buttons and expandable cards.
---

# Hirael Design System & Agency Landing Template

This skill captures the exact visual style, typography rules, component patterns, and animations from the **Hirael Agency Landing** template:
**Primary Source URL**: `https://hirael.com/embed/templates/agency-landing`

Whenever the user says **"Hirael"**, **"Hieael"**, or asks for this agency format, build according to the specifications below.

---

## 1. Visual Foundation & Design Tokens

### Color Palette
- **Light Theme Surface**: `#EFEFEF` (light gray hero canvas) or `#F4F2EC` (warm studio stone).
- **Secondary Surfaces**: `#FFFFFF` for floating navigation and badges; `bg-muted` for project showcases.
- **Dark Theme Surface**: `#0D1117` / `#080808` with subtle borders `border-white/5` or `border-white/10`.
- **Text & Foreground**: Pure `#000000` / `text-black` (light) and `#FFFFFF` / `text-white` (dark) with tight letter-spacing.
- **Accents**: Monochromatic black/white core with a small energetic indicator (e.g., green/emerald availability dot).

### Typography
- **Font Stack**: Clean geometric / neo-grotesque sans-serif (`ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`).
- **Hero Display**: Fluid size `text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)]`, line-height `leading-[1.08]`, font weight `font-medium`, tight tracking `tracking-[-0.03em]`.
- **Section Headers**: Fluid `text-[clamp(1.5rem,4vw,3.2rem)] leading-[1.12] tracking-[-0.02em] font-medium`.
- **Watermark Typography**: Massive background brand name `text-[18vw] leading-[0.8] font-medium tracking-[-0.05em] text-foreground/[0.06] select-none pointer-events-none`.

---

## 2. Signature Components & Micro-Interactions

### A. Rolling Text Action Button (Signature Hirael Button)
Dual-stacked label with overflow masking. On hover, the inner container translates up by 50% while the arrow icon in the circular badge rotates from -45° to 0°:

```tsx
export function RollingButton({
  label = "Start a project",
  onClick,
  dark = true,
}: {
  label?: string;
  onClick?: () => void;
  dark?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium outline-none transition-colors h-auto py-2 ps-5 pe-2 text-[13px] sm:ps-6 sm:text-[14px] ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <span className="block h-[20px] overflow-hidden">
        <span className="flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
          <span className="block h-[20px] leading-[20px]">{label}</span>
          <span className="block h-[20px] leading-[20px]" aria-hidden="true">{label}</span>
        </span>
      </span>
      <span className={`flex h-7 w-7 items-center justify-center rounded-full sm:h-8 sm:w-8 ${
        dark ? "bg-white text-black" : "bg-black text-white"
      }`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </button>
  );
}
```

### B. Floating Pill Navigation
- Floating header container: `max-w-[1440px] p-2 sm:p-3`
- Navigation bar: `rounded-full bg-white p-[5px] shadow-[0_2px_12px_rgba(0,0,0,0.06)]`
- Left: Circular brand emblem + Brand name
- Center: Editorial navigation links (`Projects`, `Studio`, `Journal`, `Connect`) with `hover:text-black/50 transition-colors`
- Right: Real-time availability pill (`Taking on projects for Q1 2026`) + Compact Rolling Button

### C. Bottom-Anchored Full-Viewport Hero
- Container: `relative flex h-dvh flex-col overflow-hidden bg-[#EFEFEF]`
- Content placement: `flex flex-1 flex-col justify-end` with `pb-14 sm:pb-16 lg:pb-20`
- Top-of-copy label: `text-[13px] sm:text-[14px] tracking-wide text-black`
- Big editorial headline: "We craft digital experiences for brands ready to dominate their category online."
- CTA row with Rolling Button + Certified Partner Badge:
  ```tsx
  <div className="flex items-center gap-2 rounded-[4px] bg-white px-2.5 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
    <span className="text-[13px] font-medium text-black sm:text-[14px]">Certified Partner</span>
    <span className="inline-flex items-center rounded bg-black px-1.5 py-0.5 text-[10px] text-white">Featured</span>
  </div>
  ```

### D. Numbered Section Badges
Precede major sections with an index circle and pill category:
```tsx
<div className="mb-6 flex items-center gap-3">
  <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-black text-[11px] sm:text-[12px] font-semibold text-white">
    1
  </span>
  <span className="inline-flex items-center rounded-full border border-black/15 px-3 py-1 text-[12px] sm:text-[13px] font-medium text-black">
    Introducing Studio
  </span>
</div>
```

### E. Asymmetric 3-Column Media Grid
For about/storytelling sections:
- Large screens: `grid-cols-[24%_minmax(0,1fr)_44%] items-end gap-6 xl:gap-8`
- Left: Tall editorial portrait (`aspect-[438/346] rounded-2xl object-cover`)
- Center: Editorial manifesto paragraph + Rolling Button
- Right: Wide landscape showcase (`aspect-[3/2] rounded-2xl object-cover`)

### F. Expandable Case Study Card
Video or photo card with an interactive action pill in the bottom-left corner that smoothly expands on hover:
```tsx
<div className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-[#1a1d2e]">
  <video src="..." autoPlay muted loop playsInline className="h-full w-full object-cover" />
  
  <div className="absolute start-4 bottom-4">
    <div className="flex h-9 w-9 items-center overflow-hidden rounded-full bg-white transition-all duration-300 ease-in-out group-hover:w-[150px]">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center text-black">
        <ArrowUpRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
      </span>
      <span className="text-[13px] font-medium whitespace-nowrap text-black opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100 pr-3">
        View Project
      </span>
    </div>
  </div>
</div>
```

### G. Translucent Giant Watermark Footer
- Multi-column footer navigation (`Studio`, `Work`, `Connect`) with subtle hover arrow reveals.
- Giant watermark spanning full width:
  ```tsx
  <div aria-hidden="true" className="pointer-events-none overflow-hidden border-t border-white/10 pt-10 select-none sm:pt-12">
    <span className="block text-[18vw] leading-[0.8] font-medium tracking-[-0.05em] text-white/[0.06]">
      Hirael
    </span>
  </div>
  ```

---

## 3. Workflow for New Demos using Hirael
When instructed to build Demo 2 or any page using the Hirael format:
1. Use off-white / neutral studio canvas base (`#EFEFEF` / `#F4F2EC`).
2. Integrate the floating pill navigation with availability badge.
3. Build the bottom-anchored hero lockup with fluid clamp headlines.
4. Implement the numbered section badges and asymmetric editorial grid.
5. Use the expanding bottom pill case study cards.
6. Cap with the giant typography watermark footer.
