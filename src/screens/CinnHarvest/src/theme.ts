import { StemStatus } from "./types";

export const palette = {
  background: "#FFFFFF",
  surface: "#FFFFFF",
  primary: "#D47024",
  primaryDark: "#A65D37",
  secondary: "#EDAA82",
  muted: "#D7CCC8",
  border: "#F4EAE4", // Soft warm border
  text: "#2B1D16",
  textMuted: "#8D7B70",
  success: "#D47024",
  warning: "#F59E0B",
  danger: "#EF4444",
  skeleton: "#E2E8F0",
};

export const statusColors: Record<StemStatus, string> = {
  immatured: palette.warning,
  matured: palette.success,
  overmatured: palette.danger,
  invalid: palette.muted,
};
