import type { ClassDefinition, ClassLevel } from "@/types/learning";
import { preKg } from "./pre-kg";
import { lkg } from "./lkg";
import { ukg } from "./ukg";
import { class1 } from "./class-1";
import { class2 } from "./class-2";

export const classConfigs: Record<ClassLevel, ClassDefinition> = {
  "pre-kg": preKg,
  lkg,
  ukg,
  "class-1": class1,
  "class-2": class2,
};

export const classes = Object.values(classConfigs);
