---
name: Ethereal Velocity Light
colors:
  surface: '#f4fcef'
  surface-dim: '#d4dcd0'
  surface-bright: '#f4fcef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef6e9'
  surface-container: '#e8f0e3'
  surface-container-high: '#e2ebde'
  surface-container-highest: '#dde5d8'
  on-surface: '#161d16'
  on-surface-variant: '#3d4a3d'
  inverse-surface: '#2b322a'
  inverse-on-surface: '#ebf3e6'
  outline: '#6d7b6c'
  outline-variant: '#bccbb9'
  surface-tint: '#006e2e'
  primary: '#006e2e'
  on-primary: '#ffffff'
  primary-container: '#00b14f'
  on-primary-container: '#003a15'
  inverse-primary: '#52e078'
  secondary: '#5c5f5e'
  on-secondary: '#ffffff'
  secondary-container: '#dee0df'
  on-secondary-container: '#606363'
  tertiary: '#af294c'
  on-tertiary: '#ffffff'
  tertiary-container: '#fd6584'
  on-tertiary-container: '#680024'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#71fe91'
  primary-fixed-dim: '#52e078'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#e1e3e2'
  secondary-fixed-dim: '#c4c7c6'
  on-secondary-fixed: '#191c1c'
  on-secondary-fixed-variant: '#444747'
  tertiary-fixed: '#ffd9dd'
  tertiary-fixed-dim: '#ffb2bc'
  on-tertiary-fixed: '#400013'
  on-tertiary-fixed-variant: '#8e0b36'
  background: '#f4fcef'
  on-background: '#161d16'
  surface-variant: '#dde5d8'
  text-primary: '#091009'
  text-secondary: '#4B5563'
  surface-pure: '#FFFFFF'
  glass-fill: rgba(255, 255, 255, 0.2)
  glass-stroke: rgba(0, 0, 0, 0.08)
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
  bento-gap: 24px
---

## Brand & Style

This design system is a high-tech, premium evolution of the superapp experience, translated into a luminous and airy light mode. It shifts from the "dark mode" luxury of its predecessor into a **Light Glassmorphism** aesthetic that feels like frosted glass on a bright, misty morning. It targets urban professionals who demand speed and efficiency but appreciate a sophisticated, calm, and high-end digital environment.

The visual narrative is defined by:
- **Ethereal Transparency:** Soft, white-tinted glass layers that create depth without visual weight.
- **Vibrant Precision:** The "Grab Green" primary color acts as a high-performance accent, signifying action and growth against a pristine backdrop.
- **Clean Professionalism:** A mix of minimalism and glassmorphism, utilizing wide whitespace and soft mint-tinted secondary surfaces to reduce eye strain and provide a refreshing user experience.
- **Modern Tactility:** Using physics-based motion and subtle light-source borders to make digital elements feel like physical high-end glass hardware.

## Colors

The palette is anchored by **Pure White** and **Soft Mint White**, creating a multi-layered light environment that feels expansive.

- **Primary (Grab Green):** The core brand driver. Used for call-to-actions, primary icons, and success states. It provides the "Velocity" in the design narrative.
- **Secondary Surface (#F8FAF9):** A cooling, mint-tinted white used for large background sections or container grouping to distinguish from the #FFFFFF base.
- **Text System:** High-contrast **Deep Dark Green/Black** (#091009) ensures maximum readability for primary headings, while **Muted Gray** (#4B5563) is used for secondary metadata and body descriptions.
- **Light Glass:** Components use a 20% opacity white fill with a 20px+ backdrop blur. This allows the subtle background colors to bleed through while maintaining a distinct interactive layer.

## Typography

The system utilizes **Plus Jakarta Sans** for its geometric friendliness and **Inter** for technical precision.

- **Headlines:** Use ExtraBold and Bold weights. Tighten the tracking on larger sizes to maintain a sleek, editorial feel. 
- **Body:** Regular weight with a 1.6 line-height is mandatory to maintain an "airy" feel in light mode.
- **System Labels:** Use Inter for buttons and micro-copy. This provides a functional "utility" aesthetic that balances the high-fashion look of Jakarta Sans.
- **Color Application:** Headings should always use the Primary Text color (#091009) to anchor the page.

## Layout & Spacing

The layout is built on a **Bento Grid** philosophy, creating a structured yet dynamic modularity.

- **Grid:** A 12-column fluid system for desktop. Use the "Bento Gap" of 24px for all grid-based component spacing.
- **Sectioning:** Vertical breathing room is critical. Use 120px gaps between major content blocks to emphasize the light, ethereal nature of the system.
- **Rhythm:** All internal padding and small-scale positioning should adhere to the 8px base unit.
- **Mobile:** Transition to a 1-column layout for readability, but maintain 2-column small bento tiles for quick-action icons.

## Elevation & Depth

In light mode, hierarchy is achieved through transparency and soft "inner" light rather than traditional heavy drop shadows.

- **The Glass Layer:** Use a `backdrop-filter: blur(24px)` combined with a `white/20` fill. This creates the signature "frosted" effect.
- **Borders:** Instead of shadows, use 1px solid borders at `8% black` or `12% white` (depending on the background) to define the edges of glass containers.
- **Floating Depth:** For popovers and high-level navigation, use a very large, soft ambient shadow: `0 20px 40px rgba(0, 0, 0, 0.04)`.
- **Glows:** Active states use a soft Grab Green glow (`0 0 20px rgba(0, 177, 79, 0.15)`) to signal interactivity without breaking the clean aesthetic.

## Shapes

The "Round Eight" philosophy ensures an approachable, modern feel.

- **Standard (rounded-md):** 0.75rem (12px) for input fields and smaller buttons.
- **Large (rounded-lg):** 1rem (16px) for standard service cards and bento blocks.
- **Extra Large (rounded-xl):** 1.5rem (24px) for hero containers and main app wrappers.
- **Pills:** Full roundedness is reserved for high-priority action buttons and status badges.

## Components

### Glass Action Buttons
Primary buttons are solid Grab Green (#00B14F) with white text. Secondary buttons use the "Light Glass" style: `white/20` background, `black/8` border, and background blur. This allows the button to feel integrated into the misty environment.

### Bento Service Cards
These are the hero elements of the UI. Each card should have:
- A soft gradient background (from White to Soft Mint).
- A 1px subtle border.
- 1.02x scale on hover with a soft green outer glow.

### Interactive Inputs
Fields should use the `Soft Mint White` as a subtle fill. On focus, the border transitions to `Grab Green` and the background becomes `Pure White`.

### Chips & Badges
Use the pill shape with a `white/40` fill and `Grab Green` text for active states. This maintains the high-contrast readability required for functional labels.

### Driver Calculator
A clean, minimalist slider. The track is `black/5`. The thumb is a solid `Grab Green` circle with a subtle `white/20` ring around it to signify "hardware-level" precision.