---
version: "1.0"
name: Theaver-Design-System
description: Minimal gallery-style web interface, technical documentation portal, and stoat mascot brand identity for Theaver. Built on alternating light and dark full-bleed canvases, negative-tracked SF Pro / Inter display typography, a single Marine Blue interactive signal (#00558f / #4da6ff), and rare Stoat Gold accents (#ffb37f) anchored by the Prussian Navy (#002a49) brand mark.

colors:
  primary: "#00558f"
  primary-focus: "#006bb3"
  primary-hover: "#003f6b"
  primary-on-dark: "#4da6ff"
  brand-navy: "#002a49"
  brand-gold: "#ffb37f"
  brand-cream: "#f7ecca"
  badge-warm-bg-light: "rgba(255, 179, 127, 0.22)"
  badge-warm-text-light: "#8c3f0f"
  badge-warm-bg-dark: "rgba(255, 179, 127, 0.14)"
  badge-warm-text-dark: "#ffb37f"
  ink: "#1d1d1f"
  body: "#1d1d1f"
  body-secondary: "#424245"
  ink-muted-48: "#6e6e73"
  body-on-dark: "#f5f5f7"
  body-muted-on-dark: "#a1a1a6"
  ink-muted-on-dark: "#86868b"
  canvas: "#ffffff"
  canvas-parchment: "#f5f5f7"
  surface-pearl: "#fafafc"
  surface-raised: "#f0f0f5"
  surface-black: "#000000"
  surface-dark-alt: "#161618"
  surface-tile-1: "#1d1d1f"
  surface-tile-2: "#252527"
  surface-tile-3: "#272729"
  nav-obsidian: "rgba(12, 12, 14, 0.84)"
  hairline-light: "rgba(0, 0, 0, 0.08)"
  hairline-strong-light: "rgba(0, 0, 0, 0.16)"
  hairline-dark: "rgba(255, 255, 255, 0.10)"
  hairline-strong-dark: "rgba(255, 255, 255, 0.18)"
  positive: "#16a34a"
  positive-on-dark: "#4cc38a"
  warning: "#b45309"
  warning-on-dark: "#eab308"
  negative: "#dc2626"
  negative-on-dark: "#e5484d"
  on-primary: "#ffffff"

typography:
  hero-display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif"
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: -0.28px
  display-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.22px
  display-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif"
    fontSize: 34px
    fontWeight: 600
    lineHeight: 1.24
    letterSpacing: -0.374px
  lead:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0
  tagline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif"
    fontSize: 21px
    fontWeight: 600
    lineHeight: 1.19
    letterSpacing: -0.01em
  body-strong:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif"
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.24
    letterSpacing: -0.22px
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.47
    letterSpacing: -0.18px
  docs-body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: -0.01em
  dense-link:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 2.1
    letterSpacing: 0
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: -0.14px
  caption-strong:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.08px
  code-mono:
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  nav-link:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.12px
  fine-print:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: -0.06px

rounded:
  none: 0px
  xs: 5px
  sm: 8px
  md: 11px
  lg: 18px
  squircle-icon: 22.5%
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 80px

components:
  global-nav:
    backgroundColor: "{colors.nav-obsidian}"
    textColor: "{colors.body-on-dark}"
    typography: "{typography.nav-link}"
    height: 44px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: 11px 22px
  button-primary-active:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  button-secondary-pill:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: 11px 22px
  badge-stoat-warm:
    backgroundColor: "{colors.badge-warm-bg-light}"
    textColor: "{colors.badge-warm-text-light}"
    typography: "{typography.caption-strong}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
  product-tile-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 80px
  product-tile-parchment:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 80px
  product-tile-dark-contrast:
    backgroundColor: "{colors.surface-tile-1}"
    textColor: "{colors.body-on-dark}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.none}"
    padding: 80px
  utility-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.lg}"
    padding: 24px
  code-block:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink}"
    typography: "{typography.code-mono}"
    rounded: "{rounded.lg}"
    padding: 16px 20px
  search-dialog:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  preview-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 32px
  footer:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.body-secondary}"
    typography: "{typography.dense-link}"
    padding: 64px
---

# Theaver Design System & Brand Identity (`theaver.app`)

## Overview

Theaver's web experience (`theaver.app`) combines Apple's disciplined **product-first gallery aesthetic** with the warmth and engineering clarity of Theaver's **Stoat mascot brand identity**. Marketing pages stack as edge-to-edge full-bleed canvas tiles: centered display headlines with negative tracking, concise subcopy, two capsule pills, and uncrowded product frames resting cleanly on neutral surfaces. Interactive UI recedes behind the messenger, Bot API examples, and architecture diagrams.

Documentation (`/docs/*`), release downloads (`/downloads`), release history (`/changelog`), and deep-link preview cards (`/u/*`, `/c/*`, `/join/*`) share the exact same typographic ladder, hairline containers, and interactive color tokens while exposing utility controls (sidebar tree, Search `⌘K`, Language `EN`/`RU`, Theme `System`/`Light`/`Dark`).

**Key Principles:**
- **Alternating full-bleed tiles as dividers:** Light canvases (`#ffffff` ↔ `#f5f5f7`) and dark canvases (`#000000` ↔ `#161618` ↔ `#272729`) separate sections through surface polarity rather than heavy borders.
- **Single Marine Blue interactive signal:** All links, pill CTAs, focus rings, and technical flow highlights derive from the icon's deep sea tone (`#00558f` on light surfaces, `#4da6ff` on dark surfaces).
- **Rare Stoat Gold accents:** Warm `#ffb37f` and `#f7ecca` belong strictly to the stoat mascot mark and at most one or two flagship eyebrow badges (hero release pill, Bot Platform spotlight) — never on generic buttons or links.
- **Zero decorative chrome:** No backdrop gradients on cards, no button drop-shadows, no headline shadows, zero UI emojis (Iconoir outline SVG icons only).
- **Single signature product shadow:** `3px 5px 30px rgba(0, 0, 0, 0.22)` (light) / `0 22px 54px rgba(0, 0, 0, 0.60)` (dark) appears **only** on `ScreenshotFrame` product renders.

---

## Brand Mark & Mascot Identity

The official Theaver mark is an alert white-bellied **stoat (горностай)** looking upward in silhouette, anchored in maritime Prussian Navy and warm Stoat Gold.

### Brand Palette

| Role | Token | Hex | Usage |
|---|---|---|---|
| **Prussian Navy** | `{colors.brand-navy}` | `#002a49` | App icon canvas, splash background, OG social card canvas, monochrome print dark ink |
| **Stoat Gold** | `{colors.brand-gold}` | `#ffb37f` | Primary mascot silhouette, rare hero/platform eyebrow tint on dark |
| **Cream Ivory** | `{colors.brand-cream}` | `#f7ecca` | Throat, chest, back stripe, and tail highlight on the mascot |
| **Amber Ink** | `{colors.badge-warm-text-light}` | `#8c3f0f` | High-contrast warm eyebrow label text on light canvases |

### Lockup Variants

1. **Frameless Nav Silhouette (`BrandMark.astro`):**
   - Used inside the fixed 44px obsidian `{component.global-nav}` bar paired with the wordmark `Theaver`.
   - Renders the two-tone stoat (`#ffb37f` + `#f7ecca`) directly on the dark chrome with a **true transparent SVG `<mask>` cutout** for the eye — never boxed inside a contrasting square.
   - Minimum rendered height: `20px` (`22px` standard in `Header.astro`).
2. **Contained App Icon Badge:**
   - Used on desktop launchers, mobile home screens, browser favicons, and `og:image`.
   - Places the full mascot on `{colors.brand-navy}` (`#002a49`) at canonical `439×439` square framing (`16px` safe margin around ears and tail).
   - App squircle masks use `{rounded.squircle-icon}` (`22.5%`).
3. **Monochrome Cutout Icon:**
   - Solid `#000000` (Android status bar mask) or `currentColor` silhouette combining `#Front_Left_Paw` + `#Main_Silhouette` with transparent eye mask (`opacity: 1`). Zero background container.

### Cross-Platform Icon Asset Matrix

| Platform | Shape & Padding | Key Files |
|---|---|---|
| **Web (`theaver.app`)** | SVG rounded square (`rx="96"`), `16/32/48` ICO, `180×180` opaque PNG, `512×512` squircle, `1200×630` OG | `website/public/{favicon.svg,favicon.ico,apple-touch-icon.png,app-icon.png,og-image.png}` |
| **iOS / App Store** | Full-bleed opaque RGB `#002a49` (no alpha channel) across 16 Apple sizes | `frontend/ios/Runner/Assets.xcassets/AppIcon.appiconset/*.png` |
| **macOS** | HIG squircle (`824×824`, `rx="185"`) centered in `1024×1024` transparent frame with soft drop-shadow | `frontend/macos/Runner/Assets.xcassets/AppIcon.appiconset/app_icon_*.png` |
| **Android Adaptive** | `#002A49` solid background XML + transparent foreground scaled inside `66dp` safe zone + monochrome cutout + notification silhouette | `frontend/android/app/src/main/res/{values,mipmap-*,drawable*}/*`, `playstore-icon.png` |
| **Windows & Desktop Tray** | `16–256px` multi-layer `.ico` + `256px` RGBA PNG | `frontend/windows/runner/resources/app_icon.ico`, `frontend/assets/icons/{app_icon.ico,app_icon.png}` |
| **Flutter Web PWA** | `32px` favicon + `192/512` standard & `80%`-safe-zone maskable icons + `#002A49` theme color | `frontend/web/favicon.png`, `frontend/web/icons/*.png`, `frontend/web/manifest.json` |

### Mascot Don'ts
- Never recolor the eye into a filled dot inside frameless lockups — keep it transparent (`mask="url(#eye-mask)"`) or matching `#002a49`.
- Never stretch non-uniformly or crop the curved tail tip outside safe zones.
- Never place the full `#002a49` boxed icon on dark chrome headers where the frameless mark belongs.

---

## Colors & Theme Polarity

### Interactive Signal: Marine Blue

| Context | Token | Hex | Contrast Note |
|---|---|---|---|
| Light CTA Fill | `--accent-fill` | `#00558f` | White `#ffffff` text exceeds 7.5:1 WCAG AAA |
| Light CTA Hover | `--accent-fill-hover` | `#003f6b` | Shifts closer to `#002a49` on pointer hover |
| Light Inline Links & Badges | `--accent` | `#00558f` | High-contrast technical blue on `#ffffff` and `#f5f5f7` |
| Keyboard Focus Ring | `--accent-focus` | `#006bb3` (light) / `#4da6ff` (dark) | `outline: 2px solid var(--accent-focus)` |
| Dark Inline Links & Icons | `--accent` (on dark) | `#4da6ff` | Ensures crisp legibility on `#1d1d1f` and `#272729` tiles |

### Light Mode Surface Sequence (`html[data-theme="light"]`)
- **Global Nav (`Header.astro`):** Always obsidian translucent (`rgba(12, 12, 14, 0.84)`, `backdrop-filter: saturate(180%) blur(20px)`, `1px solid rgba(255, 255, 255, 0.08)` bottom hairline).
- **Homepage Tile Cadence:**
  1. Hero (`#ffffff` `{colors.canvas}`)
  2. Offline Sync & Channels (`#f5f5f7` `{colors.canvas-parchment}`)
  3. Calls & 1080p60 Streams (`#ffffff` `{colors.canvas}`)
  4. Desktop & Media Cards (`#f5f5f7` `{colors.canvas-parchment}`)
  5. Bot & Mini Apps Contrast Spotlight (`#1d1d1f` `{colors.surface-tile-1}` — permanent dark showcase tile in light mode!)
  6. Open Client & Verification (`#ffffff` `{colors.canvas}`)
  7. Footer (`#f5f5f7` `{colors.canvas-parchment}`)
- **Utility Pages (`/downloads`, `/changelog`, `/docs/*`, `/u/*`, `/c/*`, `/join/*`):** Default `#ffffff` / `#f5f5f7` canvases with `#ffffff` cards bounded by `{colors.hairline-light}` (`1px solid rgba(0, 0, 0, 0.08)`).

### Dark Mode Surface Sequence (`html[data-theme="dark"]`)
- **Homepage Tile Cadence:** Alternates `#000000` (`{colors.surface-black}`) ↔ `#161618` (`{colors.surface-dark-alt}`) ↔ `#252527` (`{colors.surface-tile-2}` contrast spotlight), ending in a `#161618` footer.
- **Utility & Docs Pages:** `#000000` / `#161618` backgrounds with `#1d1d1f` cards and `{colors.hairline-dark}` (`1px solid rgba(255, 255, 255, 0.10)`).

### Gradients
**Zero decorative CSS gradients.** Depth comes from surface polarity changes, product framing, and frosted glass blur on the sticky global navigation bar.

---

## Typography

- **Primary Sans:** `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter', system-ui, sans-serif` (with `font-feature-settings: "ss03"` enabled for curved letterforms matching SF Pro when falling back to Inter on Windows/Linux).
- **Monospace:** `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` for SHA-256 hashes, API endpoints, release versions, and code examples (`tabular-nums` applied on numeric badges and version numbers).
- **Weight Ladder:** **`300 / 400 / 600 / 700`** — weight `500` is deliberately omitted on marketing typography. Headlines sit at `600`, paragraphs at `400`.
- **Marketing Body Size:** `17px` (`line-height: 1.47`, negative display tracking `-0.28px → -0.374px`) on homepage/gallery sections; `16px` (`line-height: 1.62`) inside long-form `/docs/*` prose.
- **Bilingual Parity (EN & RU):** Russian copy averages ~15% wider than English. Homepage headlines cap at `48px`–`56px` with `min-w-0` wrapping safety, and nav items apply `whitespace-nowrap` at compact spacing (`12px`) so `/ru/` fits cleanly inside 1280px–1440px viewports on one line.

---

## Layout, Rhythm & Elevation

- **Full-Bleed Marketing Tiles:** Vertical padding `80px` (`py-20`) on desktop, `56px` (`py-14`) on mobile. Zero border-radius (`0px`), edge-to-edge full viewport width, separated solely by alternating background canvas colors.
- **Container Widths:**
  - Centered marketing headers: `max-w-3xl` (~768px)
  - Homepage galleries & diagrams: `max-w-5xl` (~1024px) to `1120px` (`.container-page`)
  - Documentation layout: `1200px` max width (`260px` sidebar + `minmax(0, 1fr)` prose `72ch` + `210px` right TOC)
- **Elevation Hierarchy:**
  1. **Flat Tile / Card (`box-shadow: none`):** Gallery sections and utility cards (`.ink-card`: `18px` radius + `1px` hairline).
  2. **Frosted Global Nav:** `backdrop-filter: saturate(180%) blur(20px)` on translucent obsidian.
  3. **Signature Product Shadow:** `3px 5px 30px 0 rgba(0, 0, 0, 0.22)` (light) / `0 22px 54px rgba(0, 0, 0, 0.60)` (dark) — applied **only** to `ScreenshotFrame.astro`.

---

## Components

### Global Nav (`Header.astro`)
- Fixed sticky `h-11` (`44px`) obsidian bar (`{component.global-nav}`), single-row horizontal navigation on `md+`, collapsible `<dialog closedby="any">` drawer on `< 768px` (with outside-click fallback for browsers without `closedby`).
- Contains `<BrandMark size={22} />` + `Theaver`, 5 top-level links (`Features`, `Downloads`, `Docs`, `Changelog`, `GitHub`), Search `⌘K`, Language switch, Theme toggle, `Open Web`, and pill `Download` button.

### Buttons
- **Primary CTA (`.btn-primary`):** `{colors.primary}` (`#00558f`), `#ffffff` label, `border-radius: 9999px`, `padding: 11px 22px`, `min-height: 44px`, press micro-interaction `transform: scale(0.95)`.
- **Secondary Ghost Pill (`.btn-secondary`):** `transparent` fill, `{colors.primary}` text & `1px solid` border (`#4da6ff` on dark tiles), `border-radius: 9999px`, hover wash `var(--accent-soft)`, press `transform: scale(0.95)`.

### Gallery Tiles & Utility Cards
- Homepage hero & feature blocks stack top-to-bottom vertically centered before rendering large `ScreenshotFrame` previews or focused architectural diagrams (`SyncFlowDiagram`, `CallMediaDiagram`, `BotPlatformDiagram`, `SignatureVerifyDiagram`).
- Utility grids (`/downloads`, desktop 3-up feature cards) use `{component.utility-card}` (`18px` radius, `24px–28px` padding, hairline border, `0` shadow).

---

## Do's and Don'ts

### Do
- Keep `{colors.primary}` (`#00558f`) and `{colors.primary-on-dark}` (`#4da6ff`) as the universal interactive click/link signal.
- Use `{colors.brand-gold}` (`#ffb37f`) only on the mascot mark and rare `.badge-warm` highlight tags.
- Alternate light/parchment/dark canvases across homepage sections without adding horizontal divider lines between tiles.
- Keep `44×44px` minimum touch targets on mobile controls and primary pills.
- Preserve `fetchpriority="high"` (without `loading="lazy"`) strictly on the above-the-fold hero desktop screenshot, and `loading="lazy"` on below-the-fold product frames.

### Don't
- Don't add `box-shadow` to `.ink-card`, `.btn-primary`, `.btn-secondary`, or headlines.
- Don't introduce decorative CSS background gradients anywhere on the site.
- Don't render UI emojis inside navigation, headings, changelog items, or documentation callouts (use `Icon.astro` Iconoir-style stroke SVGs).
- Don't wrap homepage full-bleed sections in `rounded-[18px]` cards — tiles span edge-to-edge (`0px` radius).
- Don't set marketing headlines or body copy in weight `500`.

---

## Responsive Breakpoints & Touch Targets

| Breakpoint | Width | Key Layout Changes |
|---|---|---|
| Mobile | `≤ 640px` | Single-column grids, `36px` hero `h1`, `16px` container gutter, `py-14` tile padding, slide-over `<dialog>` mobile menu |
| Tablet | `641px – 1023px` | 2-column `/downloads` matrix, collapsible docs `<details>` navigation above article |
| Desktop | `1024px – 1279px` | Full `44px` horizontal global nav, `56px` hero `h1`, 2-column docs (`260px` sidebar + article) |
| Wide Desktop | `≥ 1280px` | 3-column docs (`260px` sidebar + `72ch` prose + `210px` right TOC), `py-20` gallery tiles, `1120px` max centered content |

---

## Iteration Guide

1. Modify semantic CSS custom properties first in `src/styles/tokens.css`, keeping `DESIGN.md` YAML values synchronized.
2. Reference tokens via CSS custom properties (`var(--accent)`, `var(--bg-alt)`) — never hardcode one-off hex colors inside page templates unless scoping `.tile-contrast-dark`.
3. Never apply `loading="lazy"` and `fetchpriority="high"` together on the same `<img>`.
4. Always run `npm run check && npm run build` and verify both Light and Dark themes on `1440px` desktop and `375px` mobile (especially `/ru/` header fitting) before shipping.
