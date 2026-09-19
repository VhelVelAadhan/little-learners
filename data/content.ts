// Compatibility exports for the original 2–3 experience. New screens should
// consume ageGroupConfigs so every age is rendered from the same architecture.
export { colors } from "./age-groups/shared";
export { ageGroups, ageGroupConfigs, getAgeGroup } from "./age-groups";

import { explorer } from "./age-groups/explorer";

export const categories = explorer.categories;
export const colorActivities = explorer.activities.filter((activity) => activity.category === "colors");
