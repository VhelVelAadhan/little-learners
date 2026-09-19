import type { AgeGroupDefinition } from "@/types/learning";
import { category, colors } from "./shared";
import { buildLearningCatalog, learningCatalog } from "./catalog";
import { buildMusicActivities } from "./music";

const explorerCategories = [category("colors", "Colors", "palette", "coral"), category("shapes", "Shapes", "shapes", "blue"), category("animals", "Animals", "paw", "green"), category("numbers", "Numbers", "numbers", "yellow"), category("alphabet", "ABC", "letters", "purple"), category("music", "Music", "music", "coral")];

export const explorer: AgeGroupDefinition = {
  id: "2-3", title: "Little Adventurers", dashboardName: "Little Adventurers", concept: "Play, learn and grow.",
  eyebrow: "HELLO, LITTLE ADVENTURER!", welcome: "What shall we", welcomeAccent: "discover today?",
  instruction: "Pick something fun and let’s play.", accent: "#f46f72", world: "learning",
  categories: explorerCategories,
  activities: [
    { id: "colors-explore-01", title: "Explore Colors", category: "colors", ageGroups: ["2-3"], type: "explore", difficulty: 1, prompt: "Tap a color!", items: colors },
    { id: "colors-find-01", title: "Find the Color", category: "colors", ageGroups: ["2-3"], type: "find", difficulty: 1, prompt: "Can you find", items: colors.slice(0, 4) },
    { id: "colors-match-01", title: "Match Colors", category: "colors", ageGroups: ["2-3"], type: "matching", difficulty: 1, prompt: "Match the same colors", items: colors.slice(0, 3) },
    { id: "colors-sort-01", title: "Sort Colors", category: "colors", ageGroups: ["2-3"], type: "sorting", difficulty: 1, prompt: "Put it in the matching basket", items: colors.slice(0, 3) },
    { id: "colors-memory-01", title: "Color Memory", category: "colors", ageGroups: ["2-3"], type: "memory", difficulty: 1, prompt: "Find the matching pair", items: colors.slice(0, 2) },
    { id: "adventure-animals-01", title: "Animal Sound Safari", category: "animals", ageGroups: ["2-3"], type: "explore", difficulty: 1, prompt: "Tap each animal and hear its sound!", completionThreshold: 5, objective: { skill: "Animal vocabulary", description: "Name animals and connect them with familiar sounds." }, items: learningCatalog.animals.items },
    { id: "adventure-count-01", title: "Counting Steps", category: "numbers", ageGroups: ["2-3"], type: "sequence", difficulty: 1, prompt: "Put 1, 2, 3, 4 and 5 in order.", objective: { skill: "Number order", description: "Sequence the numbers one through five." }, items: [{ id: "one", label: "1", value: "#ef777b", visual: "1", secondary: "1" }, { id: "two", label: "2", value: "#efc451", visual: "2", secondary: "2" }, { id: "three", label: "3", value: "#70b784", visual: "3", secondary: "3" }, { id: "four", label: "4", value: "#70b7df", visual: "4", secondary: "4" }, { id: "five", label: "5", value: "#887bd2", visual: "5", secondary: "5" }] },
    { id: "adventure-letter-b-01", title: "Find Letter B", category: "alphabet", ageGroups: ["2-3"], type: "choice", difficulty: 1, prompt: "Can you find letter B?", objective: { skill: "Letter recognition", description: "Recognize the uppercase letter B." }, items: [{ id: "a", label: "A", value: "#ef777b", visual: "A" }, { id: "b", label: "B", value: "#70b7df", visual: "B", correct: true }, { id: "c", label: "C", value: "#70b784", visual: "C" }] },
    { id: "adventure-shape-order-01", title: "Shape Path", category: "shapes", ageGroups: ["2-3"], type: "sequence", difficulty: 1, prompt: "Follow the path: circle, square, triangle.", objective: { skill: "Following a sequence", description: "Arrange three familiar shapes in order." }, items: [{ id: "circle", label: "Circle", value: "#70b7df", visual: "●", secondary: "1" }, { id: "square", label: "Square", value: "#ef777b", visual: "■", secondary: "2" }, { id: "triangle", label: "Triangle", value: "#efc451", visual: "▲", secondary: "3" }] },
    ...buildMusicActivities("2-3"),
    ...buildLearningCatalog("2-3", explorerCategories.filter((item) => item.id !== "music"), 1),
  ],
};
