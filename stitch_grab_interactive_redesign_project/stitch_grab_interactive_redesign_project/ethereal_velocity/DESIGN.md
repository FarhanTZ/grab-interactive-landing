---
name: Ethereal Velocity
colors:
  surface: '#0e150e'
  surface-dim: '#0e150e'
  surface-bright: '#333b33'
  surface-container-lowest: '#091009'
  surface-container-low: '#161d16'
  surface-container: '#1a211a'
  surface-container-high: '#242c24'
  surface-container-highest: '#2f372f'
  on-surface: '#dde5d9'
  on-surface-variant: '#bccbb9'
  inverse-surface: '#dde5d9'
  inverse-on-surface: '#2b322a'
  outline: '#869585'
  outline-variant: '#3d4a3d'
  surface-tint: '#52e078'
  primary: '#52e078'
  on-primary: '#003915'
  primary-container: '#00b14f'
  on-primary-container: '#003a15'
  inverse-primary: '#006e2e'
  secondary: '#c5c7c3'
  on-secondary: '#2e312f'
  secondary-container: '#474a47'
  on-secondary-container: '#b7b9b5'
  tertiary: '#c3c8c3'
  on-tertiary: '#2c322e'
  tertiary-container: '#969b96'
  on-tertiary-container: '#2e332f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#71fe91'
  primary-fixed-dim: '#52e078'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#e1e3df'
  secondary-fixed-dim: '#c5c7c3'
  on-secondary-fixed: '#191c1a'
  on-secondary-fixed-variant: '#454745'
  tertiary-fixed: '#dfe4de'
  tertiary-fixed-dim: '#c3c8c3'
  on-tertiary-fixed: '#181d1a'
  on-tertiary-fixed-variant: '#434844'
  background: '#0e150e'
  on-background: '#dde5d9'
  surface-variant: '#2f372f'
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
  section-gap: 120px
  bento-gap: 24px
  container-max: 1280px
  edge-margin-desktop: 64px
  edge-margin-mobile: 20px
---

## Brand & Style

The design system is engineered for a premium, high-tech evolution of the superapp experience. It moves away from the utilitarian aesthetic into a world of **Dark Glassmorphism** and **Ethereal Depth**. The target audience comprises urban professionals and tech-savvy users who value efficiency but desire a luxury digital environment.

The visual narrative is defined by:
- **Depth through Transparency:** Layers of frosted surfaces that feel lightweight and sophisticated.
- **Dynamic Luminance:** High-contrast accents (Grab Green, Tangerine, Cyan) that appear to glow against deep, ink-like surfaces.
- **Precision Engineering:** Sharp geometric layouts balanced by physics-based motion and subtle 3D tilt effects on interactive cards.
- **Atmospheric Immersion:** The use of subtle background blurs and tinted gradients to create a sense of infinite digital space.

## Colors

This design system utilizes a **High-Contrast Dark** palette. The foundation is a "Deep Surface Dark" (#0A0D0B) which provides a near-black canvas that makes vibrant brand colors pop with neon-like intensity.

- **Primary (Grab Green):** Reserved for core actions, branding, and success states. It should feel like a light source.
- **Secondary (Surface Tier):** Use #141916 for container backgrounds to create subtle separation from the base.
- **Service Accents:** Use the specific service colors (Tangerine, Cyan, Purple) for category-specific navigation, badges, and glow-shadows to provide immediate visual wayfinding.
- **Glass System:** Use semi-transparent fills with backdrop blurs (20px+) for elevated components like navigation bars and floating service cards.

## Typography

The typography system relies on **Plus Jakarta Sans** for its modern, geometric clarity and friendly yet professional apertures. 

**Key Rules:**
- **Headlines:** Use "ExtraBold" for displays and "Bold" for headlines. Maintain tight letter-spacing (-2% to -4%) to create a high-fashion, editorial impact.
- **Body:** Use "Regular" weight with generous line height (1.6) to ensure readability against dark backgrounds.
- **Labels:** Use **Inter** for functional labels, buttons, and micro-copy. Its systematic nature provides a technical "UI" feel that complements the lushness of the display type.
- **Contrast:** Always use pure white (#FFFFFF) for primary text on dark surfaces, and 60% opacity white for secondary/meta text.

## Layout & Spacing

The layout follows a **Bento Grid** philosophy, organizing diverse services into a cohesive, tiled structure.

- **Grid System:** A 12-column fluid grid for desktop with 24px gutters. Elements should snap to "blocks" of 3, 4, or 6 columns.
- **Sectioning:** Use generous vertical whitespace (120px+) between major landing page sections to allow the glass effects and gradients "room to breathe."
- **Bento Patterns:** Group service features (Food, Mart, Transport) into cards of varying aspect ratios. Use an 8px base unit for all internal padding.
- **Responsive Adaption:** On mobile, collapse the 12-column grid into a single column with a 2-column "mini-bento" for quick-access service icons.

## Elevation & Depth

This design system uses **Backdrop Blurs** and **Tonal Glows** instead of traditional shadows to define hierarchy.

- **Surface 0 (Base):** #0A0D0B (Deepest layer).
- **Surface 1 (Cards):** #141916 with a 1px solid border at 8% opacity white. Use a `backdrop-filter: blur(20px)`.
- **Surface 2 (Popovers/Nav):** Semi-transparent white (4% opacity) with a 40px blur, creating a "frosted" look.
- **Glow Effects:** Interactive elements (like active cards) should feature a subtle outer glow using their respective service color (e.g., a soft #00B14F glow for transport cards) with a blur radius of 32px and 20% opacity.
- **3D Tilt:** On hover, primary cards should utilize a subtle 5-degree perspective tilt to reinforce the tactile tech feel.

## Shapes

The shape language is **Rounded and Organic**, balancing the technical dark theme with the approachability of a lifestyle app.

- **Standard Radius:** 16px (1rem) for all service cards and large containers.
- **Large Radius:** 24px (1.5rem) for main hero containers and bento-grid blocks.
- **Component Radius:** 12px for input fields and smaller buttons.
- **Pill Shapes:** Reserved exclusively for tags, badges, and the primary "Request" buttons to denote maximum interactivity.

## Components

### Dynamic Glass Buttons
Primary buttons use a solid Grab Green (#00B14F) with a subtle inner highlight. Secondary buttons use the "Glass" style: a transparent background with a 1px white-border (15% opacity) and a heavy background blur.

### Service Badges
Small, pill-shaped indicators. They should use a "Dark Glass" background with the service's accent color used for the text and a small leading icon.

### Bento Service Cards
The core of the landing page. Each card features:
- A high-resolution 3D asset or icon.
- A 1px top-left "light leak" border to simulate depth.
- Hover state: The card scales by 1.02x and gains a soft color-matched glow.

### Driver Calculator Slider
A precision input component. The track is a thin, dark line (#141916). The thumb is a large, Grab Green circle that "pulses" when dragged. The value display uses the **Display-LG** typography for high impact.

### Interactive Input Fields
Fields should have no fill (transparent) but a 1px border. Upon focus, the border animates to Grab Green, and the background gains a 5% green tint.