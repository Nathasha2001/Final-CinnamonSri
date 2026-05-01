// ─── Cinnamon Theme ───────────────────────────────────────────────
// Warm spice palette: deep bark browns, burnt sienna, golden honey,
// cream parchment, smoky charcoal — like peeling fresh cinnamon bark

export const C = {
  // Backgrounds
  bg:          "#FFFFFF",   // Clean white
  bgMid:       "#F8FAFC",   // Light gray
  surface:     "#FFFFFF",   // Surface white
  surfaceHigh: "#FFFFFF",   // High surface
  card:        "#FFFFFF",   // Card background

  // Borders
  border:      "#F4EAE4",   // Soft border
  borderLight: "#FAF6F4",   // Lighter border

  // Primary accent — dark green
  spice:       "#D47024",   // Caramel
  spiceLight:  "#EDAA82",   // Light Caramel
  spiceDim:    "#A65D37",   // Dark Caramel

  // Secondary accent — light green
  honey:       "#EDAA82",   // Light Caramel
  honeyLight:  "#F4EAE4",   // Soft Beige
  honeyDim:    "#D47024",   // Caramel

  // Text
  cream:       "#FFFFFF",   // White text background
  text:        "#2B1D16",   // Coffee Dark
  muted:       "#8D7B70",   // Muted Coffee

  // Status colors
  green:       "#D47024",   // Caramel as success
  greenDim:    "#065F46",   // Dim sage
  red:         "#EF4444",   // Red
  redDim:      "#7F1D1D",   // Dim red
  blue:        "#3B82F6",   // Blue

  // Gradients
  gradSpice:   ["#D47024", "#A65D37"] as [string, string],
  gradHoney:   ["#EDAA82", "#D47024"] as [string, string],
  gradBark:    ["#FFFFFF", "#F8FAFC"] as [string, string],
};

export const FONTS = {
  display: "Georgia",           // System default
  body:    "Georgia",           // System default
  mono:    "Courier New",       // Monospace for values
};

export const SHADOWS = {
  spice: {
    shadowColor:   C.spice,
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius:  12,
    elevation:     8,
  },
  honey: {
    shadowColor:   C.honey,
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius:  10,
    elevation:     6,
  },
  card: {
    shadowColor:   "#000",
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius:  10,
    elevation:     4,
  },
};
