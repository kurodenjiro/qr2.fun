# Design System Strategy: The Kinetic Override

## 1. Overview & Creative North Star
**Creative North Star: "The Neon Brutalist"**

This design system is a visceral reaction against the sanitized, rounded, and predictable world of modern web templates. It is designed to feel less like a "website" and more like a high-end Heads-Up Display (HUD) or a redacted digital dossier. We prioritize speed, rebellion, and high-frequency energy. 

To break the "template" look, designers must embrace **intentional asymmetry**. Layouts should feel "unstable" yet balanced, utilizing heavy typographic weights to anchor the eye while smaller, monospaced "data-noise" elements provide texture. Elements should overlap, breaking the grid to create a sense of depth and digital collage. This is not about being tidy; it is about being impactful.

## 2. Colors
Our palette is a high-contrast war between a void-like obsidian background and hyper-saturated neon pulses.

*   **The Primary Engine:** `primary` (#8ff5ff) and `secondary` (#2ff801) are your light sources. Use them sparingly as "lasers" that cut through the darkness.
*   **The "No-Line" Rule:** We do not use 1px solid borders to define sections. Layout boundaries are created through color-blocking with `surface-container-low` (#131313) against the `background` (#0e0e0e). Use vertical shifts in tonal value to dictate hierarchy.
*   **Surface Hierarchy & Nesting:** Treat the UI as a series of stacked obsidian plates. 
    *   **Level 0:** `surface_container_lowest` (#000000) for deep-set "well" areas.
    *   **Level 1:** `surface` (#0e0e0e) for the base canvas.
    *   **Level 2:** `surface_container_high` (#201f1f) for active interactive cards.
*   **The "Glass & Gradient" Rule:** To simulate HUD glass, use semi-transparent overlays of `surface_variant` with a heavy `backdrop-filter: blur(12px)`. For primary CTAs, use a subtle linear gradient from `primary` (#8ff5ff) to `primary_container` (#00eefc) at a 45-degree angle to provide a sense of "glow" and kinetic energy.
*   **Signature Textures:** Incorporate a 5% opacity "noise" or "grain" overlay across the `background` to achieve that gritty, high-fashion editorial texture.

## 3. Typography
Typography is the core of this system’s rebellious spirit. We mix high-precision technical fonts with aggressive, bold headlines.

*   **Display & Headline:** `spaceGrotesk` in Bold. These are your anchors. Use `display-lg` (3.5rem) for hero statements. Tighten the letter spacing (`-0.02em`) to make it feel dense and industrial.
*   **Body:** `spaceGrotesk` in Regular. Clear and legible, but with a distinct geometric personality.
*   **Labels & Metadata:** `inter` in Medium. This is used for "technical data" feel. All labels should be uppercase with wide letter spacing (`+0.1em`) to mimic digital readouts.
*   **The Glitch Effect:** For critical headlines, designers are encouraged to create a "double-stack" effect where a `secondary` (#2ff801) copy of the text sits 2px behind a `tertiary` (#ff6b9b) copy, slightly offset to simulate a chromatic aberration glitch.

## 4. Elevation & Depth
In this system, depth is not about soft lighting; it is about signal strength and physical layering.

*   **The Layering Principle:** Avoid shadows for structure. Instead, use the `surface-container` tiers. A `surface_container_highest` (#262626) element placed on a `background` (#0e0e0e) provides all the "lift" necessary.
*   **Ambient Shadows:** When a floating element (like a modal) is required, use an extra-diffused shadow. The shadow should not be black; it should be a tinted glow using a 10% opacity version of `primary` (#8ff5ff) with a 40px blur. This creates a "neon glow" rather than a traditional drop shadow.
*   **The "Ghost Border" Fallback:** If a container needs an edge (e.g., in complex HUD layouts), use a "Ghost Border." Apply `outline_variant` (#484847) at **15% opacity**. Never use 100% opaque borders.
*   **Sharp Corners:** Following the `0px` rounding scale, all containers must be sharp. This communicates a precision-engineered, high-tech aesthetic. The only exception is the occasional "Rounded Accent" for specific icon containers to provide a visual break.

## 5. Components

*   **Buttons:** 
    *   **Primary:** Solid `primary` (#8ff5ff) background with `on_primary` (#005d63) text. Sharp corners. Use a 2px "offset stroke" of `primary` that appears only on hover.
    *   **Secondary:** No background. 2px Ghost Border. Text in `secondary` (#2ff801).
*   **Input Fields:** 
    *   Use `surface_container_low` as the base. 
    *   Bottom-border only (2px) using `outline`. 
    *   On focus, the border transitions to `primary` (#8ff5ff) with a faint outer glow.
*   **Cards:** 
    *   No borders. No dividers. 
    *   Use `surface_container_high` (#201f1f). 
    *   Add a "Corner Data" element: A small monospaced label (`label-sm`) in the top right corner showing a "serial number" or "timestamp" in `primary` to enhance the HUD feel.
*   **Checkboxes & Radios:** 
    *   Custom sharp-edged boxes. 
    *   "Checked" state should use a "Glitch Fill"—a slight horizontal flicker animation when toggled.
*   **HUD Overlay Elements:** 
    *   Suggest adding "Decorative Brackets"—small L-shaped vectors in the corners of sections to "frame" the content like a camera viewfinder.

## 6. Do’s and Don’ts

**Do:**
*   **Do** use intentional white space. Let the obsidian background breathe to make the neons pop.
*   **Do** use "Data Noise." Small, non-functional monospaced text strings (e.g., "SYS_LOAD_78%") can be used as subtle background textures.
*   **Do** embrace asymmetry. If you have a two-column layout, make one column 60% and the other 40%.

**Don't:**
*   **Don't** use soft shadows. If it doesn't look like it's glowing or physically stacked, it doesn't belong.
*   **Don't** use rounded corners. The `0px` rule is absolute to maintain the aggressive, "Cyberfunk" edge.
*   **Don't** use standard 1px grey dividers. If you need to separate content, use a gap or a change in `surface-container` color.
*   **Don't** use "Safe" colors. Avoid mid-tone greys. Stick to the extremes of the obsidian and the neons.