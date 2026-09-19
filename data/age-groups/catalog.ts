import type { ActivityDefinition, AgeGroup, CategoryDefinition, CategoryId, Difficulty, LearningItem } from "@/types/learning";
import { colors } from "./shared";

type CatalogEntry = { label: string; items: LearningItem[] };

const bank = (label: string, items: Array<[string, string, string, string?]>): CatalogEntry => ({
  label,
  items: items.map(([id, itemLabel, value, visual]) => ({ id, label: itemLabel, value, visual })),
});

export const learningCatalog: Record<CategoryId, CatalogEntry> = {
  colors: { label: "Colors", items: colors.map((item) => ({ ...item, visual: "●" })) },
  shapes: bank("Shapes", [["circle", "Circle", "#65b8df", "●"], ["square", "Square", "#ef7478", "■"], ["triangle", "Triangle", "#f0c64e", "▲"], ["star", "Star", "#78b985", "★"]]),
  animals: bank("Animals", [["dog", "Dog", "#eeb875", "🐶"], ["cat", "Cat", "#86c5e5", "🐱"], ["lion", "Lion", "#efca64", "🦁"], ["frog", "Frog", "#71b982", "🐸"]]),
  sounds: bank("Sounds", [["bell", "Bell", "#f0ca58", "🔔"], ["drum", "Drum", "#ed8273", "🥁"], ["horn", "Horn", "#74b5df", "📯"], ["rain", "Rain", "#82c6d9", "🌧️"]]),
  faces: bank("Faces", [["happy", "Happy", "#f2c85b", "😊"], ["silly", "Silly", "#78bce1", "😜"], ["sleepy", "Sleepy", "#9086d8", "😴"], ["love", "Love", "#ef92aa", "🥰"]]),
  nature: bank("Nature", [["sun", "Sun", "#f2c653", "☀️"], ["flower", "Flower", "#ef8fa8", "🌸"], ["tree", "Tree", "#6fb580", "🌳"], ["cloud", "Cloud", "#80bedf", "☁️"]]),
  explore: bank("Discovery", [["star", "Star", "#f0c44d", "⭐"], ["balloon", "Balloon", "#ef777b", "🎈"], ["bubble", "Bubble", "#7fc5df", "🫧"], ["heart", "Heart", "#ef93ad", "💗"]]),
  music: bank("Music", [["drum", "Drum", "#ed8273", "🥁"], ["bell", "Bell", "#f1ca56", "🔔"], ["piano", "Piano", "#8680d5", "🎹"], ["notes", "Song", "#70b886", "🎵"]]),
  fruits: bank("Fruits", [["apple", "Apple", "#ed7374", "🍎"], ["banana", "Banana", "#f1cd58", "🍌"], ["orange", "Orange", "#ec9955", "🍊"], ["grapes", "Grapes", "#8b77ce", "🍇"]]),
  vehicles: bank("Vehicles", [["car", "Car", "#ed7374", "🚗"], ["bus", "Bus", "#efc954", "🚌"], ["train", "Train", "#72b983", "🚂"], ["boat", "Boat", "#70b6df", "⛵"]]),
  body: bank("My Body", [["eyes", "Eyes", "#72b8df", "👀"], ["ears", "Ears", "#efa08e", "👂"], ["hands", "Hands", "#f0c45b", "🙌"], ["feet", "Feet", "#75b888", "🦶"]]),
  numbers: bank("Numbers", [["one", "One", "#ed7378", "1"], ["two", "Two", "#f0c451", "2"], ["three", "Three", "#6fb783", "3"], ["four", "Four", "#71b7df", "4"], ["five", "Five", "#887bd1", "5"]]),
  songs: bank("Songs", [["star", "Twinkle Star", "#f0c550", "⭐"], ["spider", "Little Spider", "#7d8a9b", "🕷️"], ["wheels", "Bus Song", "#efbf52", "🚌"], ["farm", "Farm Song", "#72b785", "🐮"]]),
  alphabet: bank("ABC", [["a", "A", "#ed7378", "A"], ["b", "B", "#70b6df", "B"], ["c", "C", "#72b886", "C"], ["d", "D", "#f0c552", "D"], ["e", "E", "#897bd2", "E"]]),
  phonics: bank("Phonics", [["apple", "A — Apple", "#ed7378", "🍎"], ["ball", "B — Ball", "#71b7df", "⚽"], ["cat", "C — Cat", "#f0bd62", "🐱"], ["dog", "D — Dog", "#72b785", "🐶"]]),
  puzzles: bank("Puzzles", [["corner", "Corner", "#ed777b", "◩"], ["edge", "Edge", "#71b8df", "▤"], ["middle", "Middle", "#f0c655", "▦"], ["finish", "Complete", "#72b984", "🧩"]]),
  memory: bank("Memory", [["sun", "Sun", "#f0c44f", "☀️"], ["moon", "Moon", "#7e83cf", "🌙"], ["star", "Star", "#ed9f55", "⭐"], ["cloud", "Cloud", "#75badf", "☁️"]]),
  patterns: bank("Patterns", [["red-dot", "Red", "#ed7478", "●"], ["blue-dot", "Blue", "#70b6df", "●"], ["yellow-star", "Yellow", "#efc650", "★"], ["green-star", "Green", "#70b782", "★"]]),
  stories: bank("Stories", [["bear", "Bear", "#dca66b", "🐻"], ["forest", "Forest", "#70b27d", "🌲"], ["castle", "Castle", "#8a7ed3", "🏰"], ["moon", "Moon", "#6e83c8", "🌙"]]),
  rhymes: bank("Rhymes", [["cat", "Cat", "#ed8b76", "🐱"], ["hat", "Hat", "#887bd1", "🎩"], ["log", "Log", "#af875f", "🪵"], ["frog", "Frog", "#6fb782", "🐸"]]),
  reading: bank("Reading", [["cat", "CAT", "#ed7779", "🐱"], ["sun", "SUN", "#f0c54f", "☀️"], ["dog", "DOG", "#73b785", "🐶"], ["hat", "HAT", "#7b85ce", "🎩"]]),
  math: bank("Math", [["one", "1", "#ed7478", "🍎"], ["two", "2", "#f0c34f", "🍎🍎"], ["three", "3", "#71b680", "🍎🍎🍎"], ["four", "4", "#70b5dc", "🍎🍎🍎🍎"]]),
  logic: bank("Logic", [["fruit", "Fruit", "#ed7478", "🍎"], ["animal", "Animal", "#efbf60", "🐶"], ["vehicle", "Vehicle", "#71b7df", "🚗"], ["clothes", "Clothes", "#8b7cd0", "👕"]]),
  prewriting: bank("Pre-Writing", [["line", "Straight Line", "#6eb6dd", "│"], ["across", "Across", "#ed7478", "—"], ["curve", "Curve", "#72b683", "∪"], ["zigzag", "Zigzag", "#efc34f", "〽" ]]),
  world: bank("Our World", [["home", "Home", "#ed8a78", "🏠"], ["school", "School", "#efc758", "🏫"], ["park", "Park", "#70b681", "🌳"], ["shop", "Shop", "#74b5dc", "🏪"]]),
  creativity: bank("Creativity", [["paint", "Paint", "#ed7478", "🎨"], ["build", "Build", "#efc451", "🧱"], ["music", "Make Music", "#867bd0", "🎵"], ["imagine", "Imagine", "#70b7df", "✨"]]),
};

const normalize = (items: LearningItem[]) => items.map((item) => ({ ...item, visual: item.visual ?? "●" }));

export function buildSensoryCatalog(age: AgeGroup, categories: CategoryDefinition[]): ActivityDefinition[] {
  return categories.flatMap(({ id }) => {
    const { label, items } = learningCatalog[id];
    const safeItems = normalize(items.slice(0, id === "colors" ? 8 : 4));
    return [
      { id: `${age}-${id}-sensory-tap`, title: `Touch ${label}`, category: id, ageGroups: [age], type: "explore", difficulty: 1, prompt: "Tap and listen!", items: safeItems, completionThreshold: 3, celebration: false, objective: { skill: "Sensory exploration", description: `Explore ${label.toLowerCase()} through touch and sound.` } },
      { id: `${age}-${id}-sensory-peek`, title: `${label} Peekaboo`, category: id, ageGroups: [age], type: "peekaboo", difficulty: 1, prompt: "Peekaboo!", items: safeItems.slice(0, 3), completionThreshold: 3, celebration: false, objective: { skill: "Cause and effect", description: `Reveal familiar ${label.toLowerCase()}.` } },
    ];
  });
}

export function buildLearningCatalog(age: AgeGroup, categories: CategoryDefinition[], difficulty: Difficulty): ActivityDefinition[] {
  return categories.flatMap(({ id }) => {
    const { label, items } = learningCatalog[id];
    const safeItems = normalize(items.slice(0, difficulty >= 3 ? 4 : 3));
    const target = safeItems[0];
    return [
      { id: `${age}-${id}-explore`, title: `Explore ${label}`, category: id, ageGroups: [age], type: "explore", difficulty, prompt: `Tap to explore ${label.toLowerCase()}!`, items: safeItems, completionThreshold: Math.min(3, safeItems.length), objective: { skill: "Recognition", description: `Build familiarity with ${label.toLowerCase()}.` } },
      { id: `${age}-${id}-find`, title: `Find ${target.label}`, category: id, ageGroups: [age], type: "find", difficulty, prompt: `Can you find ${target.label}?`, items: safeItems, objective: { skill: "Recall", description: `Recognize and name ${label.toLowerCase()}.` } },
      { id: `${age}-${id}-match`, title: `Match ${label}`, category: id, ageGroups: [age], type: "matching", difficulty, prompt: `Match the same ${label.toLowerCase()}.`, items: safeItems.slice(0, 3), objective: { skill: "Visual matching", description: `Compare and match ${label.toLowerCase()}.` } },
      { id: `${age}-${id}-sort`, title: `Sort ${label}`, category: id, ageGroups: [age], type: "sorting", difficulty, prompt: `Put each ${label.toLowerCase()} card in its matching basket.`, items: safeItems.slice(0, 3), objective: { skill: "Sorting", description: `Sort and classify ${label.toLowerCase()}.` } },
      { id: `${age}-${id}-memory`, title: `${label} Memory`, category: id, ageGroups: [age], type: "memory", difficulty, prompt: "Find every matching pair.", items: safeItems.slice(0, 3), objective: { skill: "Working memory", description: `Remember the location of ${label.toLowerCase()}.` } },
    ];
  });
}
