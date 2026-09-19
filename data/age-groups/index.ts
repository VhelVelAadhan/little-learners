import type { AgeGroup, AgeGroupDefinition } from "@/types/learning";
import { baby } from "./baby";
import { toddler } from "./toddler";
import { explorer } from "./explorer";
import { earlyLearner } from "./early-learner";
import { schoolReady } from "./school-ready";

export const ageGroupConfigs: Record<AgeGroup, AgeGroupDefinition> = {
  "0-1": baby,
  "1-2": toddler,
  "2-3": explorer,
  "3-4": earlyLearner,
  "4-5": schoolReady,
};

export const ageGroups = Object.values(ageGroupConfigs);

export const getAgeGroup = (id: AgeGroup) => ageGroupConfigs[id];
