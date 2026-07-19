// features/uilib/registry.js
// The renderable component registry — plain data, so adding a new specimen of
// any shape (atom, compound, or full section) doesn't require touching the
// console or the code generator.
import { DemoButton } from "@/components/uilib/blocks/atoms/DemoButton";
import { MUISwitch } from "@/components/uilib/blocks/atoms/MUISwitch";
import { DemoChild } from "@/components/uilib/blocks/atoms/DemoChild";
import { Badge } from "@/components/uilib/blocks/atoms/Badge";
import { Input } from "@/components/uilib/blocks/atoms/Input";
import { Alert } from "@/components/uilib/blocks/atoms/Alert";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/uilib/blocks/atoms/Card";

import { MotionRevealCard } from "@/components/uilib/blocks/MotionRevealCard";
import { GsapMarqueeBadge } from "@/components/uilib/blocks/GsapMarqueeBadge";
import { ThreeOrbAvatar } from "@/components/uilib/blocks/ThreeOrbAvatar";

import { AnimatedNavbar } from "@/components/uilib/blocks/sections/AnimatedNavbar";
import { AnimatedHero } from "@/components/uilib/blocks/sections/AnimatedHero";
import { AnimatedAboutSection } from "@/components/uilib/blocks/sections/AnimatedAboutSection";
import { AnimatedFooter } from "@/components/uilib/blocks/sections/AnimatedFooter";

export const AVAILABLE_COMPONENTS = {
  // --- Atoms + compound parts ---
  DemoButton,
  MUISwitch,
  DemoChild,
  Badge,
  Input,
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardFooter,

  // --- Animated (Motion / GSAP / Three.js specimens) ---
  MotionRevealCard,
  GsapMarqueeBadge,
  ThreeOrbAvatar,

  // --- Starter-kit sections ---
  AnimatedNavbar,
  AnimatedHero,
  AnimatedAboutSection,
  AnimatedFooter,
};

/* ------------------------- known enums for the console ------------------------- */
export const KNOWN_ENUMS = {
  variant: ["default", "primary", "danger", "outline"],
  rounded: ["none", "sm", "md", "lg", "full"],
  bgColor: ["black", "blue", "white"],
  tone: ["default", "info", "success", "warning", "danger"],
  padding: ["sm", "md", "lg"],
  type: ["text", "email", "password"],
  direction: ["up", "down", "left", "right"],
  align: ["left", "center"],
  engine: ["css", "gsap", "motion", "three"],
  layout: ["boxed", "full"],
};

export function inferFieldType(key, value) {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (KNOWN_ENUMS[key]) return "select";
  if (value && typeof value === "object") return "json";
  return "text";
}
