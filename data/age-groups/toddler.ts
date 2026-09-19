import type { AgeGroupDefinition } from "@/types/learning";
import { category, colors } from "./shared";
import { buildLearningCatalog } from "./catalog";
import { buildMusicActivities } from "./music";

const toddlerCategories = [
  category("animals", "Animals", "paw", "green"), category("colors", "Colors", "palette", "coral"),
  category("shapes", "Shapes", "shapes", "blue"), category("fruits", "Fruits", "apple", "yellow"),
  category("vehicles", "Vehicles", "car", "purple"), category("body", "My Body", "person", "coral"),
  category("numbers", "Numbers", "numbers", "blue"), category("music", "Music", "music", "green"),
];

export const toddler: AgeGroupDefinition = {
  id: "1-2", title: "Little Discoverer", dashboardName: "Little Discoverer", concept: "Little hands. Curious minds.",
  eyebrow: "HELLO, LITTLE DISCOVERER!", welcome: "What can we", welcomeAccent: "find today?",
  instruction: "Choose a discovery and play.", accent: "#f0a35c", world: "discovery",
  categories: toddlerCategories,
  activities: [
    { id: "toddler-animals-01", title: "Meet the Animals", category: "animals", ageGroups: ["1-2"], type: "explore", difficulty: 1, prompt: "Tap an animal!", completionThreshold: 3, objective: { skill: "Vocabulary", description: "Name familiar animals." }, items: [{ id: "cat", label: "Cat", value: "#f4c58b", visual: "🐱", secondary: "Meow!" }, { id: "dog", label: "Dog", value: "#9ed5ec", visual: "🐶", secondary: "Woof!" }, { id: "cow", label: "Cow", value: "#a9d6b4", visual: "🐮", secondary: "Moo!" }] },
    { id: "toddler-colors-01", title: "Find Blue", category: "colors", ageGroups: ["1-2"], type: "find", difficulty: 1, prompt: "Find BLUE.", objective: { skill: "Color recognition", description: "Recognize primary colors." }, items: [colors[1], colors[0], colors[2]] },
    { id: "toddler-shapes-01", title: "Find the Circle", category: "shapes", ageGroups: ["1-2"], type: "choice", difficulty: 1, prompt: "Can you find the circle?", objective: { skill: "Shape recognition", description: "Recognize a circle among simple shapes." }, items: [{ id: "circle", label: "Circle", value: "#67b9e3", visual: "●", correct: true }, { id: "square", label: "Square", value: "#f27978", visual: "■" }, { id: "triangle", label: "Triangle", value: "#f3c458", visual: "▲" }] },
    { id: "toddler-fruit-01", title: "Match the Fruit", category: "fruits", ageGroups: ["1-2"], type: "matching", difficulty: 1, prompt: "Match the same fruit.", objective: { skill: "Visual matching", description: "Match familiar objects." }, items: [{ id: "apple", label: "Apple", value: "#f06f70", visual: "🍎" }, { id: "banana", label: "Banana", value: "#f4ce55", visual: "🍌" }] },
    { id: "toddler-vehicles-01", title: "Who Goes Beep?", category: "vehicles", ageGroups: ["1-2"], type: "choice", difficulty: 1, prompt: "Which one goes beep beep?", objective: { skill: "Sound recognition", description: "Connect a vehicle with its sound." }, items: [{ id: "car", label: "Car", value: "#8fc9e7", visual: "🚗", correct: true }, { id: "boat", label: "Boat", value: "#9ed9bf", visual: "⛵" }] },
    ...buildMusicActivities("1-2"),
    ...buildLearningCatalog("1-2", toddlerCategories.filter((item) => item.id !== "music"), 1),
  ],
};
