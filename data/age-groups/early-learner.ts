import type { AgeGroupDefinition } from "@/types/learning";
import { category } from "./shared";
import { buildLearningCatalog } from "./catalog";
import { buildMusicActivities } from "./music";

const earlyCategories = [
  category("alphabet", "ABC", "letters", "purple"), category("phonics", "Phonics", "sound", "blue"), category("numbers", "Numbers", "numbers", "yellow"),
  category("colors", "Colors", "palette", "coral"), category("shapes", "Shapes", "shapes", "blue"), category("animals", "Animals", "paw", "green"),
  category("puzzles", "Puzzles", "puzzle", "yellow"), category("memory", "Memory", "brain", "purple"), category("patterns", "Patterns", "pattern", "coral"),
  category("stories", "Stories", "book", "green"), category("music", "Music", "music", "coral"),
];

export const earlyLearner: AgeGroupDefinition = {
  id: "3-4", title: "Early Learner", dashboardName: "Early Learner", concept: "Let’s think, play & learn!",
  eyebrow: "HELLO, EARLY LEARNER!", welcome: "Let’s think, play &", welcomeAccent: "learn!",
  instruction: "Pick a challenge for your clever mind.", accent: "#7e77d8", world: "thinking",
  categories: earlyCategories,
  activities: [
    { id: "early-letter-01", title: "Find Letter A", category: "alphabet", ageGroups: ["3-4"], type: "choice", difficulty: 2, prompt: "Can you find letter A?", objective: { skill: "Letter recognition", description: "Recognize the uppercase letter A." }, items: [{ id: "a", label: "A", value: "#ef777b", visual: "A", correct: true }, { id: "b", label: "B", value: "#6eafe0", visual: "B" }, { id: "c", label: "C", value: "#74bd8b", visual: "C" }] },
    { id: "early-phonics-01", title: "A is for Apple", category: "phonics", ageGroups: ["3-4"], type: "choice", difficulty: 2, prompt: "Which word begins with A?", objective: { skill: "Beginning sounds", description: "Connect A with the /a/ sound." }, items: [{ id: "apple", label: "Apple", value: "#f17b74", visual: "🍎", correct: true }, { id: "ball", label: "Ball", value: "#77b8e2", visual: "⚽" }, { id: "sun", label: "Sun", value: "#f0c950", visual: "☀️" }] },
    { id: "early-count-01", title: "Count the Apples", category: "numbers", ageGroups: ["3-4"], type: "choice", difficulty: 2, prompt: "How many apples? 🍎 🍎 🍎", objective: { skill: "Counting", description: "Count a group of three objects." }, items: [{ id: "two", label: "2", value: "#7fc2e0", visual: "2" }, { id: "three", label: "3", value: "#71b98a", visual: "3", correct: true }, { id: "four", label: "4", value: "#f0a36b", visual: "4" }] },
    { id: "early-pattern-01", title: "What Comes Next?", category: "patterns", ageGroups: ["3-4"], type: "pattern", difficulty: 2, prompt: "Red, blue, red, blue… what comes next?", objective: { skill: "Patterns", description: "Complete an AB pattern." }, items: [{ id: "red", label: "Red", value: "#ef7075", visual: "●", correct: true }, { id: "blue", label: "Blue", value: "#65aee0", visual: "●" }, { id: "yellow", label: "Yellow", value: "#efc954", visual: "●" }] },
    { id: "early-memory-01", title: "Animal Memory", category: "memory", ageGroups: ["3-4"], type: "memory", difficulty: 2, prompt: "Find the matching animals.", objective: { skill: "Working memory", description: "Remember and match animal cards." }, items: [{ id: "lion", label: "Lion", value: "#efbf61", visual: "🦁" }, { id: "frog", label: "Frog", value: "#75bc86", visual: "🐸" }, { id: "fish", label: "Fish", value: "#71b8df", visual: "🐟" }] },
    { id: "early-abc-order-01", title: "ABC Train", category: "alphabet", ageGroups: ["3-4"], type: "sequence", difficulty: 2, prompt: "Put A, B and C in order.", objective: { skill: "Letter sequencing", description: "Order the first three letters of the alphabet." }, items: [{ id: "a", label: "A", value: "#ef777b", visual: "A", secondary: "1" }, { id: "b", label: "B", value: "#70b7df", visual: "B", secondary: "2" }, { id: "c", label: "C", value: "#70b784", visual: "C", secondary: "3" }] },
    { id: "early-number-order-01", title: "Counting Train", category: "numbers", ageGroups: ["3-4"], type: "sequence", difficulty: 2, prompt: "Put 1, 2, 3 and 4 in order.", objective: { skill: "Number ordering", description: "Sequence the numbers one through four." }, items: [{ id: "one", label: "1", value: "#ef777b", visual: "1", secondary: "1" }, { id: "two", label: "2", value: "#efc351", visual: "2", secondary: "2" }, { id: "three", label: "3", value: "#70b784", visual: "3", secondary: "3" }, { id: "four", label: "4", value: "#70b7df", visual: "4", secondary: "4" }] },
    ...buildMusicActivities("3-4"),
    ...buildLearningCatalog("3-4", earlyCategories.filter((item) => item.id !== "music"), 2),
  ],
};
