import type { AgeGroupDefinition } from "@/types/learning";
import { category } from "./shared";
import { buildSensoryCatalog } from "./catalog";

const animals = [
  { id: "dog", label: "Dog", value: "#f6cf8b", visual: "🐶", secondary: "Woof woof!" },
  { id: "cat", label: "Cat", value: "#b8d8f4", visual: "🐱", secondary: "Meow!" },
  { id: "duck", label: "Duck", value: "#f7df73", visual: "🐥", secondary: "Quack quack!" },
];

const babyCategories = [
  category("colors", "Colors", "palette", "coral"), category("shapes", "Shapes", "shapes", "blue"),
  category("animals", "Animals", "paw", "green"), category("sounds", "Sounds", "sound", "yellow"),
  category("faces", "Faces", "smile", "purple"), category("nature", "Nature", "leaf", "green"),
  category("explore", "Explore", "sparkles", "blue"), category("music", "Music", "music", "coral"),
];

export const baby: AgeGroupDefinition = {
  id: "0-1", title: "Baby Explorer", dashboardName: "Baby Explorer", concept: "Tiny hands. Big discoveries.",
  eyebrow: "HELLO, BABY EXPLORER!", welcome: "Touch, listen &", welcomeAccent: "discover!",
  instruction: "Tap something big and bright.", accent: "#78c8e8", world: "sensory",
  categories: babyCategories,
  activities: [
    { id: "baby-tap-01", title: "Tap & Discover", category: "explore", ageGroups: ["0-1"], type: "explore", difficulty: 1, prompt: "Tap!", completionThreshold: 3, celebration: false, objective: { skill: "Cause and effect", description: "Notice that a touch makes something happen." }, items: [{ id: "sun", label: "Sun", value: "#f8ce59", visual: "☀️" }, { id: "heart", label: "Heart", value: "#f59bab", visual: "💗" }, { id: "star", label: "Star", value: "#7fc9e8", visual: "⭐" }] },
    { id: "baby-peekaboo-01", title: "Peekaboo", category: "faces", ageGroups: ["0-1"], type: "peekaboo", difficulty: 1, prompt: "Peekaboo!", completionThreshold: 3, celebration: false, objective: { skill: "Object permanence", description: "Discover friendly faces behind soft clouds." }, items: [{ id: "happy", label: "Happy", value: "#ffd787", visual: "😊" }, { id: "silly", label: "Silly", value: "#aadcf0", visual: "😜" }, { id: "love", label: "Love", value: "#f7b5c0", visual: "🥰" }] },
    { id: "baby-animals-01", title: "Animal Sounds", category: "animals", ageGroups: ["0-1"], type: "explore", difficulty: 1, prompt: "Listen!", completionThreshold: 3, celebration: false, objective: { skill: "Sound recognition", description: "Connect familiar animals with their sounds." }, items: animals },
    { id: "baby-music-01", title: "Baby Music", category: "music", ageGroups: ["0-1"], type: "explore", difficulty: 1, prompt: "Tap for music!", completionThreshold: 3, celebration: false, objective: { skill: "Rhythm", description: "Explore rhythm through simple musical sounds." }, items: [{ id: "drum", label: "Boom", value: "#f39775", visual: "🥁" }, { id: "bell", label: "Ding", value: "#f4cf60", visual: "🔔" }, { id: "notes", label: "La la", value: "#8bc9b1", visual: "🎵" }] },
    ...buildSensoryCatalog("0-1", babyCategories),
  ],
};
