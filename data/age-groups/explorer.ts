import type { AgeGroupDefinition } from "@/types/learning";
import { category, colors } from "./shared";
import { buildLearningCatalog } from "./catalog";
import { buildMusicActivities } from "./music";

const explorerCategories = [category("colors", "Colors", "palette", "coral"), category("shapes", "Shapes", "shapes", "blue"), category("animals", "Animals", "paw", "green"), category("numbers", "Numbers", "numbers", "yellow"), category("alphabet", "ABC", "letters", "purple"), category("music", "Music", "music", "coral")];

export const explorer: AgeGroupDefinition = {
  id: "2-3", title: "Little Explorer", dashboardName: "Little Explorer", concept: "Play, learn and grow.",
  eyebrow: "HELLO, LITTLE EXPLORER!", welcome: "What shall we", welcomeAccent: "discover today?",
  instruction: "Pick something fun and let’s play.", accent: "#f46f72", world: "learning",
  categories: explorerCategories,
  activities: [
    { id: "colors-explore-01", title: "Explore Colors", category: "colors", ageGroups: ["2-3"], type: "explore", difficulty: 1, prompt: "Tap a color!", items: colors },
    { id: "colors-find-01", title: "Find the Color", category: "colors", ageGroups: ["2-3"], type: "find", difficulty: 1, prompt: "Can you find", items: colors.slice(0, 4) },
    { id: "colors-match-01", title: "Match Colors", category: "colors", ageGroups: ["2-3"], type: "matching", difficulty: 1, prompt: "Match the same colors", items: colors.slice(0, 3) },
    { id: "colors-sort-01", title: "Sort Colors", category: "colors", ageGroups: ["2-3"], type: "sorting", difficulty: 1, prompt: "Put it in the matching basket", items: colors.slice(0, 3) },
    { id: "colors-memory-01", title: "Color Memory", category: "colors", ageGroups: ["2-3"], type: "memory", difficulty: 1, prompt: "Find the matching pair", items: colors.slice(0, 2) },
    ...buildMusicActivities("2-3"),
    ...buildLearningCatalog("2-3", explorerCategories.filter((item) => item.id !== "music"), 1),
  ],
};
