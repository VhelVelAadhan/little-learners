import type { ActivityDefinition, CategoryId, LearningItem } from "@/types/learning";

export const colors: LearningItem[] = [
  { id: "red", label: "Red", value: "#f45b69" },
  { id: "blue", label: "Blue", value: "#4d8ee8" },
  { id: "yellow", label: "Yellow", value: "#f6c84c" },
  { id: "green", label: "Green", value: "#62b87c" },
  { id: "orange", label: "Orange", value: "#f39a4b" },
  { id: "purple", label: "Purple", value: "#8b6fd6" },
  { id: "pink", label: "Pink", value: "#ef8eb5" },
];

export const categories: { id: CategoryId; label: string; icon: string; tone: string }[] = [
  { id: "colors", label: "Colors", icon: "palette", tone: "coral" },
  { id: "shapes", label: "Shapes", icon: "shapes", tone: "blue" },
  { id: "animals", label: "Animals", icon: "paw", tone: "green" },
  { id: "numbers", label: "Numbers", icon: "numbers", tone: "yellow" },
  { id: "alphabet", label: "ABC", icon: "letters", tone: "purple" },
];

export const colorActivities: ActivityDefinition[] = [
  { id: "colors-explore-01", title: "Explore Colors", category: "colors", ageGroups: ["2-3"], type: "explore", difficulty: 1, prompt: "Tap a color!", items: colors },
  { id: "colors-find-01", title: "Find the Color", category: "colors", ageGroups: ["2-3"], type: "find", difficulty: 1, prompt: "Can you find", items: colors.slice(0, 4) },
  { id: "colors-match-01", title: "Match Colors", category: "colors", ageGroups: ["2-3"], type: "matching", difficulty: 1, prompt: "Match the same colors", items: colors.slice(0, 3) },
  { id: "colors-sort-01", title: "Sort Colors", category: "colors", ageGroups: ["2-3"], type: "sorting", difficulty: 1, prompt: "Put it in the matching basket", items: colors.slice(0, 3) },
  { id: "colors-memory-01", title: "Color Memory", category: "colors", ageGroups: ["2-3"], type: "memory", difficulty: 1, prompt: "Find the matching pair", items: colors.slice(0, 2) },
];

export const ageGroups = [
  { id: "0-1", title: "Baby", subtitle: "Explore", accent: "#78c8e8" },
  { id: "1-2", title: "Toddler", subtitle: "Discover", accent: "#f0a35c" },
  { id: "2-3", title: "Little Explorer", subtitle: "Learn", accent: "#f46f72" },
  { id: "3-4", title: "Early Learner", subtitle: "Play & Learn", accent: "#7e77d8" },
  { id: "4-5", title: "School Ready", subtitle: "Get Ready", accent: "#58aa78" },
] as const;
