import { StemStatus } from "./types";

export const palette = {
  background: "#F2F7F3",
  surface: "#FFFFFF",
  primary: "#3E6F52",
  primaryDark: "#2F5A42",
  secondary: "#6F8C77",
  muted: "#7C8D82",
  border: "#D5E1D8",
  text: "#1E2A22",
  textMuted: "#56655B",
  success: "#4D9A6E",
  warning: "#C89B3C",
  danger: "#B34F4F",
  skeleton: "#DFE8E1",
};

export const statusColors: Record<StemStatus, string> = {
  immatured: palette.warning,
  matured: palette.success,
  overmatured: palette.danger,
  invalid: palette.muted,
};
