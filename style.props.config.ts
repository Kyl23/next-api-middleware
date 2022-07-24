import { ReactNode } from "react";

export interface LayoutType {
  width?: string;
  height?: string;
  backgroundColor?: string;
  fontSize?: string;
  color?: string;
  display?: string;
  margin?: string;
  padding?: string;
  children?: ReactNode;
}
