import type { AgeGroupDefinition } from "@/types/learning";
import { category } from "./shared";
import { buildSensoryCatalog } from "./catalog";
import { buildMusicActivities } from "./music";

const animals = [
  { id: "dog", label: "Dog", value: "#f6cf8b", visual: "🐶", secondary: "Woof woof!" },
  { id: "cat", label: "Cat", value: "#b8d8f4", visual: "🐱", secondary: "Meow!" },
  { id: "duck", label: "Duck", value: "#f7df73", visual: "🐥", secondary: "Quack quack!" },
  { id: "cow", label: "Cow", value: "#b9c9b4", visual: "🐮", secondary: "Moo!" },
  { id: "lion", label: "Lion", value: "#efca64", visual: "🦁", secondary: "Roar!" },
  { id: "frog", label: "Frog", value: "#71b982", visual: "🐸", secondary: "Ribbit!" },
  { id: "elephant", label: "Elephant", value: "#8bbbd7", visual: "🐘", secondary: "Trumpet!" },
  { id: "monkey", label: "Monkey", value: "#c99664", visual: "🐵", secondary: "Ooh ooh!" },
];

const faces = [
  { id: "happy", label: "Happy", value: "#ffd787", visual: "😊" }, { id: "silly", label: "Silly", value: "#aadcf0", visual: "😜" },
  { id: "love", label: "Love", value: "#f7b5c0", visual: "🥰" }, { id: "sleepy", label: "Sleepy", value: "#9b91dc", visual: "😴" },
  { id: "sad", label: "Sad", value: "#8bc6e5", visual: "😢" }, { id: "surprised", label: "Surprised", value: "#f2a078", visual: "😮" },
  { id: "excited", label: "Excited", value: "#f3cf63", visual: "🤩" }, { id: "calm", label: "Calm", value: "#8bc9a0", visual: "😌" },
];

const discoveries = [
  { id: "sun", label: "Sun", value: "#f8ce59", visual: "☀️" }, { id: "heart", label: "Heart", value: "#f59bab", visual: "💗" },
  { id: "star", label: "Star", value: "#7fc9e8", visual: "⭐" }, { id: "balloon", label: "Balloon", value: "#ef777b", visual: "🎈" },
  { id: "bubble", label: "Bubble", value: "#8ad4e8", visual: "🫧" }, { id: "ball", label: "Ball", value: "#77bc8b", visual: "⚽" },
  { id: "teddy", label: "Teddy", value: "#c79467", visual: "🧸" }, { id: "rainbow", label: "Rainbow", value: "#8c80d5", visual: "🌈" },
];

const instruments = [
  { id: "drum", label: "Drum", value: "#f39775", visual: "🥁", secondary: "Boom boom!" }, { id: "bell", label: "Bell", value: "#f4cf60", visual: "🔔", secondary: "Ding ding!" },
  { id: "notes", label: "Song", value: "#8bc9b1", visual: "🎵", secondary: "La la la!" }, { id: "piano", label: "Piano", value: "#8c80d5", visual: "🎹", secondary: "Plink plonk!" },
  { id: "maraca", label: "Maraca", value: "#ef9a70", visual: "🪇", secondary: "Shake shake!" }, { id: "guitar", label: "Guitar", value: "#bd8b63", visual: "🎸", secondary: "Strum strum!" },
  { id: "xylophone", label: "Xylophone", value: "#70b6df", visual: "🎶", secondary: "Ting ting!" }, { id: "microphone", label: "Microphone", value: "#867bd0", visual: "🎤", secondary: "Sing along!" },
];

const babyCategories = [
  category("colors", "Colors", "palette", "coral"), category("shapes", "Shapes", "shapes", "blue"),
  category("animals", "Animals", "paw", "green"), category("sounds", "Sounds", "sound", "yellow"),
  category("faces", "Faces", "smile", "purple"), category("nature", "Nature", "leaf", "green"),
  category("explore", "Explore", "sparkles", "blue"), category("music", "Music", "music", "coral"),
];

export const baby: AgeGroupDefinition = {
  id: "0-1", title: "Baby Bloomers", dashboardName: "Baby Bloomers", concept: "Tiny hands. Big discoveries.",
  eyebrow: "HELLO, BABY BLOOMER!", welcome: "Touch, listen &", welcomeAccent: "discover!",
  instruction: "Tap something big and bright.", accent: "#78c8e8", world: "sensory",
  categories: babyCategories,
  activities: [
    { id: "baby-tap-01", title: "Tap & Discover", category: "explore", ageGroups: ["0-1"], type: "explore", difficulty: 1, prompt: "Tap!", completionThreshold: 3, celebration: false, objective: { skill: "Cause and effect", description: "Notice that a touch makes something happen." }, items: discoveries },
    { id: "baby-peekaboo-01", title: "Peekaboo", category: "faces", ageGroups: ["0-1"], type: "peekaboo", difficulty: 1, prompt: "Peekaboo!", completionThreshold: 3, celebration: false, objective: { skill: "Object permanence", description: "Discover friendly faces behind soft clouds." }, items: faces },
    { id: "baby-animals-01", title: "Animal Sounds", category: "animals", ageGroups: ["0-1"], type: "explore", difficulty: 1, prompt: "Listen!", completionThreshold: 3, celebration: false, objective: { skill: "Sound recognition", description: "Connect familiar animals with their sounds." }, items: animals },
    { id: "baby-music-01", title: "Baby Music", category: "music", ageGroups: ["0-1"], type: "explore", difficulty: 1, prompt: "Tap for music!", completionThreshold: 3, celebration: false, objective: { skill: "Rhythm", description: "Explore rhythm through simple musical sounds." }, items: instruments },
    { id: "baby-music-peekaboo-01", title: "Instrument Peekaboo", category: "music", ageGroups: ["0-1"], type: "peekaboo", difficulty: 1, prompt: "Find the instruments!", completionThreshold: 3, celebration: false, objective: { skill: "Instrument recognition", description: "Reveal and name familiar instruments." }, items: instruments },
    ...buildMusicActivities("0-1"),
    ...buildSensoryCatalog("0-1", babyCategories.filter((item) => item.id !== "music")),
  ],
};
