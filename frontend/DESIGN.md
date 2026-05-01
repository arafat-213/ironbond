---
name: Adrenaline Neon
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#ebb2ff'
  on-secondary: '#520072'
  secondary-container: '#b600f8'
  on-secondary-container: '#fff6fc'
  tertiary: '#ffffff'
  on-tertiary: '#67001d'
  tertiary-container: '#ffdadb'
  on-tertiary-container: '#c90041'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#f8d8ff'
  secondary-fixed-dim: '#ebb2ff'
  on-secondary-fixed: '#320047'
  on-secondary-fixed-variant: '#74009f'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b8'
  on-tertiary-fixed: '#40000f'
  on-tertiary-fixed-variant: '#91002d'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-xl:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  stats-number:
    fontFamily: Lexend
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 20px
  stack-gap: 16px
  grid-gutter: 12px
  card-padding: 24px
---

## Brand & Style

The design system is built to evoke the high-energy atmosphere of a late-night, premium fitness club. It centers on a "Competitive Glassmorphism" style—blending the sleek, futuristic transparency of glass layers with the aggressive, high-contrast energy of neon accents. 

The target audience consists of couples who thrive on mutual motivation and gamified competition. The UI should feel fast, responsive, and indestructible. It prioritizes high-impact visuals and immediate data legibility to ensure the interface remains functional under the duress of a heavy workout and low-light gym conditions.

## Colors

The palette is anchored in a deep midnight foundation to maximize the "pop" of the neon accents. 
- **Electric Lime (#ccff00)**: Used for primary actions and "Partner A" identifiers. It represents growth and energy.
- **Neon Purple (#bc13fe)**: Used for secondary features and "Partner B" identifiers. It represents focus and depth.
- **Radium Pink (#ff0055)**: Reserved for competitive elements, shared milestones, and "Versus" states.
- **Intensity Red (#ff0000)**: A specialized functional color dedicated exclusively to muscle heatmaps to indicate maximum physical exertion.

All colors are applied at 100% saturation against the neutral background to ensure they "glow" visually.

## Typography

The design system utilizes **Lexend** for headlines and data points to leverage its athletic, ultra-readable character shapes. Large numeric values (reps, sets, timers) use the `stats-number` style to ensure they are legible from several feet away during a workout.

**Inter** is used for body copy and descriptions to provide a neutral, functional balance to the expressive headlines. Uppercase labels with slight tracking are used for navigational elements and metadata to reinforce the technical, "performance-tracking" feel.

## Layout & Spacing

The layout follows a **fluid grid** model optimized for mobile devices. It utilizes an 8px base unit to maintain a tight, rhythmic structure. 

A 2-column "versus" layout is the primary configuration for comparing partner stats. Side-by-side muscle heatmaps should occupy the full width of the container with a minimal gutter to allow for direct visual comparison. Elements are stacked vertically with generous padding within cards to ensure touch targets remain large and accessible during movement.

## Elevation & Depth

This design system uses **Glassmorphism** as its primary method of establishing hierarchy. 
1. **Base Layer:** The solid #0a0a0c background.
2. **Surface Layer:** Semi-transparent containers (rgba(255, 255, 255, 0.05)) with a 20px backdrop blur and 1px "glass" borders (rgba(255, 255, 255, 0.1)).
3. **Accent Layer:** Neon glows are used as "behind-glass" blobs of color to highlight active states or winner status.

Depth is communicated through the intensity of the backdrop blur and the vibrance of the inner glow rather than traditional drop shadows.

## Shapes

The design system uses a **Rounded** (Level 2) shape language. Standard components utilize a 0.5rem (8px) corner radius to strike a balance between aggressive performance and modern friendliness. Larger card containers and modal sheets use `rounded-xl` (24px) to create a distinct frame for glass effects. Heatmap silhouettes should use organic, rounded-polygon shapes to represent muscle groups naturally.

## Components

- **Glassmorphic Cards:** The core container. Features a subtle top-left to bottom-right gradient on the 1px border to simulate a light source.
- **Neon Action Buttons:** High-saturation fills using Electric Lime or Neon Purple. Text must be black (#000000) for maximum contrast on Lime, and White for Purple/Pink.
- **Status Indicators:** 
    - *Flames:* Animated neon gradients indicating "streaks."
    - *Crowns:* Glowing Electric Lime icons for the partner currently leading in volume or reps.
- **Muscle Heatmaps:** Anatomical silhouettes using a multi-step scale from dark grey (inactive) to Intensity Red (#ff0000) for high-strain areas.
- **Side-by-Side Comparison Toggles:** A custom segmented control that shifts between Partner A (Lime) and Partner B (Purple) aesthetics based on the active selection.
- **Progress Bars:** Dual-track bars showing both partners' progress simultaneously, using transparency to show where paths overlap.