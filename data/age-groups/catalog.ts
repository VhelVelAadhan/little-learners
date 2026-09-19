import type { ActivityDefinition, AgeGroup, CategoryDefinition, CategoryId, Difficulty, LearningItem } from "@/types/learning";
import { colors } from "./shared";

type CatalogEntry = { label: string; items: LearningItem[] };

const bank = (label: string, items: Array<[string, string, string, string?, string?]>): CatalogEntry => ({
  label,
  items: items.map(([id, itemLabel, value, visual, secondary]) => ({ id, label: itemLabel, value, visual, secondary })),
});

export const learningCatalog: Record<CategoryId, CatalogEntry> = {
  colors: { label: "Colors", items: colors.map((item) => ({ ...item, visual: "●" })) },
  shapes: bank("Shapes", [["circle", "Circle", "#65b8df", "●"], ["square", "Square", "#ef7478", "■"], ["triangle", "Triangle", "#f0c64e", "▲"], ["star", "Star", "#78b985", "★"], ["heart", "Heart", "#ef8fa8", "♥"], ["diamond", "Diamond", "#8a82d2", "◆"], ["oval", "Oval", "#ef9c72", "⬭"], ["rectangle", "Rectangle", "#74b6d9", "▬"]]),
  animals: bank("Animals", [["dog", "Dog", "#eeb875", "🐶", "Woof woof!"], ["cat", "Cat", "#86c5e5", "🐱", "Meow!"], ["lion", "Lion", "#efca64", "🦁", "Roar!"], ["frog", "Frog", "#71b982", "🐸", "Ribbit!"], ["cow", "Cow", "#b9c9b4", "🐮", "Moo!"], ["duck", "Duck", "#f1d55b", "🐥", "Quack quack!"], ["elephant", "Elephant", "#8bbbd7", "🐘", "Trumpet!"], ["monkey", "Monkey", "#c99664", "🐵", "Ooh ooh!" ]]),
  sounds: bank("Sounds", [["bell", "Bell", "#f0ca58", "🔔", "Ding ding!"], ["drum", "Drum", "#ed8273", "🥁", "Boom boom!"], ["horn", "Horn", "#74b5df", "📯", "Toot toot!"], ["rain", "Rain", "#82c6d9", "🌧️", "Pitter patter!"], ["clap", "Clapping", "#ef9c79", "👏", "Clap clap!"], ["clock", "Clock", "#8a82d2", "⏰", "Tick tock!"], ["bird", "Bird", "#71b984", "🐦", "Tweet tweet!"], ["train", "Train", "#6eb5dd", "🚂", "Choo choo!"]]),
  faces: bank("Faces", [["happy", "Happy", "#f2c85b", "😊"], ["silly", "Silly", "#78bce1", "😜"], ["sleepy", "Sleepy", "#9086d8", "😴"], ["love", "Love", "#ef92aa", "🥰"], ["sad", "Sad", "#71b6df", "😢"], ["surprised", "Surprised", "#ef9a72", "😮"], ["excited", "Excited", "#efc64f", "🤩"], ["calm", "Calm", "#72b989", "😌"]]),
  nature: bank("Nature", [["sun", "Sun", "#f2c653", "☀️"], ["flower", "Flower", "#ef8fa8", "🌸"], ["tree", "Tree", "#6fb580", "🌳"], ["cloud", "Cloud", "#80bedf", "☁️"], ["moon", "Moon", "#7d82cd", "🌙"], ["butterfly", "Butterfly", "#ef9d72", "🦋"], ["leaf", "Leaf", "#75b886", "🍃"], ["rainbow", "Rainbow", "#72b7df", "🌈"]]),
  explore: bank("Discovery", [["star", "Star", "#f0c44d", "⭐"], ["balloon", "Balloon", "#ef777b", "🎈"], ["bubble", "Bubble", "#7fc5df", "🫧"], ["heart", "Heart", "#ef93ad", "💗"], ["ball", "Ball", "#73b785", "⚽"], ["blocks", "Blocks", "#ef9b70", "🧱"], ["teddy", "Teddy", "#bd8b62", "🧸"], ["kite", "Kite", "#7c82d1", "🪁"]]),
  music: bank("Music", [["drum", "Drum", "#ed8273", "🥁", "Boom boom!"], ["bell", "Bell", "#f1ca56", "🔔", "Ding ding!"], ["piano", "Piano", "#8680d5", "🎹", "Plink plonk!"], ["notes", "Song", "#70b886", "🎵", "La la la!"], ["maraca", "Maraca", "#ef9a70", "🪇", "Shake shake!"], ["guitar", "Guitar", "#bc8b63", "🎸", "Strum strum!"], ["xylophone", "Xylophone", "#70b6df", "🎶", "Ting ting!"], ["microphone", "Microphone", "#8b7bd1", "🎤", "Sing along!"]]),
  fruits: bank("Fruits", [["apple", "Apple", "#ed7374", "🍎"], ["banana", "Banana", "#f1cd58", "🍌"], ["orange", "Orange", "#ec9955", "🍊"], ["grapes", "Grapes", "#8b77ce", "🍇"], ["strawberry", "Strawberry", "#ef7e86", "🍓"], ["pear", "Pear", "#91bd68", "🍐"], ["watermelon", "Watermelon", "#72b985", "🍉"], ["pineapple", "Pineapple", "#efc653", "🍍"]]),
  vehicles: bank("Vehicles", [["car", "Car", "#ed7374", "🚗"], ["bus", "Bus", "#efc954", "🚌"], ["train", "Train", "#72b983", "🚂"], ["boat", "Boat", "#70b6df", "⛵"], ["bicycle", "Bicycle", "#ef9b70", "🚲"], ["airplane", "Airplane", "#8a82d2", "✈️"], ["truck", "Truck", "#77b78a", "🚚"], ["tractor", "Tractor", "#bd8b63", "🚜"]]),
  body: bank("My Body", [["eyes", "Eyes", "#72b8df", "👀"], ["ears", "Ears", "#efa08e", "👂"], ["hands", "Hands", "#f0c45b", "🙌"], ["feet", "Feet", "#75b888", "🦶"], ["nose", "Nose", "#ef9a82", "👃"], ["mouth", "Mouth", "#ef7b87", "👄"], ["arm", "Arm", "#80b8dc", "💪"], ["legs", "Legs", "#8a82d2", "🦵"]]),
  numbers: bank("Numbers", [["one", "One", "#ed7378", "1"], ["two", "Two", "#f0c451", "2"], ["three", "Three", "#6fb783", "3"], ["four", "Four", "#71b7df", "4"], ["five", "Five", "#887bd1", "5"], ["six", "Six", "#ef9b70", "6"], ["seven", "Seven", "#70b6df", "7"], ["eight", "Eight", "#72b985", "8"], ["nine", "Nine", "#ef8fa8", "9"], ["ten", "Ten", "#bd8b63", "10"]]),
  songs: bank("Songs", [["star", "Star Song", "#f0c550", "⭐"], ["spider", "Spider Song", "#7d8a9b", "🕷️"], ["wheels", "Bus Song", "#efbf52", "🚌"], ["farm", "Farm Song", "#72b785", "🐮"], ["rain", "Rain Song", "#70b6df", "🌧️"], ["hello", "Hello Song", "#ef8fa8", "👋"], ["numbers", "Counting Song", "#8a82d2", "🔢"], ["dance", "Dance Song", "#ef9b70", "💃"]]),
  alphabet: bank("ABC", [["a", "A", "#ed7378", "A"], ["b", "B", "#70b6df", "B"], ["c", "C", "#72b886", "C"], ["d", "D", "#f0c552", "D"], ["e", "E", "#897bd2", "E"], ["f", "F", "#ef9b70", "F"], ["g", "G", "#73b785", "G"], ["h", "H", "#70b6df", "H"], ["i", "I", "#ef8fa8", "I"], ["j", "J", "#bd8b63", "J"]]),
  phonics: bank("Phonics", [["apple", "A — Apple", "#ed7378", "🍎"], ["ball", "B — Ball", "#71b7df", "⚽"], ["cat", "C — Cat", "#f0bd62", "🐱"], ["dog", "D — Dog", "#72b785", "🐶"], ["egg", "E — Egg", "#efc653", "🥚"], ["fish", "F — Fish", "#70b6df", "🐟"], ["goat", "G — Goat", "#bd8b63", "🐐"], ["hat", "H — Hat", "#8a82d2", "🎩"]]),
  puzzles: bank("Puzzles", [["corner", "Corner", "#ed777b", "◩"], ["edge", "Edge", "#71b8df", "▤"], ["middle", "Middle", "#f0c655", "▦"], ["finish", "Complete", "#72b984", "🧩"], ["rotate", "Turn", "#8a82d2", "↻"], ["connect", "Connect", "#ef9b70", "🔗"]]),
  memory: bank("Memory", [["sun", "Sun", "#f0c44f", "☀️"], ["moon", "Moon", "#7e83cf", "🌙"], ["star", "Star", "#ed9f55", "⭐"], ["cloud", "Cloud", "#75badf", "☁️"], ["flower", "Flower", "#ef8fa8", "🌸"], ["tree", "Tree", "#72b985", "🌳"], ["rainbow", "Rainbow", "#70b6df", "🌈"], ["butterfly", "Butterfly", "#ef9b70", "🦋"]]),
  patterns: bank("Patterns", [["red-dot", "Red Dot", "#ed7478", "●"], ["blue-dot", "Blue Dot", "#70b6df", "●"], ["yellow-star", "Yellow Star", "#efc650", "★"], ["green-star", "Green Star", "#70b782", "★"], ["purple-square", "Purple Square", "#8a82d2", "■"], ["orange-triangle", "Orange Triangle", "#ef9b70", "▲"]]),
  stories: bank("Stories", [["bear", "Bear", "#dca66b", "🐻"], ["forest", "Forest", "#70b27d", "🌲"], ["castle", "Castle", "#8a7ed3", "🏰"], ["moon", "Moon", "#6e83c8", "🌙"], ["dragon", "Dragon", "#72b985", "🐉"], ["boat", "Boat", "#70b6df", "⛵"], ["garden", "Garden", "#ef8fa8", "🌻"], ["treasure", "Treasure", "#efc653", "💎"]]),
  rhymes: bank("Rhymes", [["cat", "Cat", "#ed8b76", "🐱"], ["hat", "Hat", "#887bd1", "🎩"], ["log", "Log", "#af875f", "🪵"], ["frog", "Frog", "#6fb782", "🐸"], ["star", "Star", "#efc653", "⭐"], ["car", "Car", "#ed7374", "🚗"], ["bee", "Bee", "#f0c451", "🐝"], ["tree", "Tree", "#72b985", "🌳"]]),
  reading: bank("Reading", [["cat", "CAT", "#ed7779", "🐱"], ["sun", "SUN", "#f0c54f", "☀️"], ["dog", "DOG", "#73b785", "🐶"], ["hat", "HAT", "#7b85ce", "🎩"], ["pig", "PIG", "#ef8fa8", "🐷"], ["bus", "BUS", "#efc653", "🚌"], ["fox", "FOX", "#ef9b70", "🦊"], ["cup", "CUP", "#70b6df", "🥤"]]),
  math: bank("Math", [["one", "1", "#ed7478", "🍎"], ["two", "2", "#f0c34f", "🍎🍎"], ["three", "3", "#71b680", "🍎🍎🍎"], ["four", "4", "#70b5dc", "🍎🍎🍎🍎"], ["five", "5", "#8a82d2", "⭐⭐⭐⭐⭐"], ["zero", "0", "#ef9b70", "○"]]),
  logic: bank("Logic", [["fruit", "Fruit", "#ed7478", "🍎"], ["animal", "Animal", "#efbf60", "🐶"], ["vehicle", "Vehicle", "#71b7df", "🚗"], ["clothes", "Clothes", "#8b7cd0", "👕"], ["food", "Food", "#ef9b70", "🥪"], ["toy", "Toy", "#ef8fa8", "🧸"], ["plant", "Plant", "#72b985", "🌻"], ["tool", "Tool", "#70b6df", "🔨"]]),
  prewriting: bank("Pre-Writing", [["line", "Straight Line", "#6eb6dd", "│"], ["across", "Across", "#ed7478", "—"], ["curve", "Curve", "#72b683", "∪"], ["zigzag", "Zigzag", "#efc34f", "〽"], ["circle", "Circle", "#8a82d2", "○"], ["wave", "Wave", "#70b6df", "〰"], ["loop", "Loop", "#ef8fa8", "➰"], ["spiral", "Spiral", "#ef9b70", "🌀"]]),
  world: bank("Our World", [["home", "Home", "#ed8a78", "🏠"], ["school", "School", "#efc758", "🏫"], ["park", "Park", "#70b681", "🌳"], ["shop", "Shop", "#74b5dc", "🏪"], ["hospital", "Hospital", "#ef8fa8", "🏥"], ["library", "Library", "#8a82d2", "📚"], ["farm", "Farm", "#bd8b63", "🚜"], ["beach", "Beach", "#70b6df", "🏖️"]]),
  creativity: bank("Creativity", [["paint", "Paint", "#ed7478", "🎨"], ["build", "Build", "#efc451", "🧱"], ["music", "Make Music", "#867bd0", "🎵"], ["imagine", "Imagine", "#70b7df", "✨"], ["dance", "Dance", "#ef8fa8", "💃"], ["draw", "Draw", "#72b985", "✏️"], ["craft", "Craft", "#ef9b70", "✂️"], ["pretend", "Pretend", "#70b6df", "🎭"]]),
};

const normalize = (items: LearningItem[]) => items.map((item) => ({ ...item, visual: item.visual ?? "●" }));

export function buildSensoryCatalog(age: AgeGroup, categories: CategoryDefinition[]): ActivityDefinition[] {
  const expandedCategories = new Set<CategoryId>(["animals", "sounds", "faces", "nature", "explore"]);
  return categories.flatMap(({ id }) => {
    const { label, items } = learningCatalog[id];
    const safeItems = normalize(items.slice(0, id === "colors" ? 12 : expandedCategories.has(id) ? 8 : 4));
    const showAllPeekabooItems = id === "colors" || expandedCategories.has(id);
    return [
      { id: `${age}-${id}-sensory-tap`, title: `Touch ${label}`, category: id, ageGroups: [age], type: "explore", difficulty: 1, prompt: "Tap and listen!", items: safeItems, completionThreshold: 3, celebration: false, objective: { skill: "Sensory exploration", description: `Explore ${label.toLowerCase()} through touch and sound.` } },
      { id: `${age}-${id}-sensory-peek`, title: `${label} Peekaboo`, category: id, ageGroups: [age], type: "peekaboo", difficulty: 1, prompt: "Peekaboo!", items: showAllPeekabooItems ? safeItems : safeItems.slice(0, 3), completionThreshold: 3, celebration: false, objective: { skill: "Cause and effect", description: `Reveal familiar ${label.toLowerCase()}.` } },
    ];
  });
}

export function buildLearningCatalog(age: AgeGroup, categories: CategoryDefinition[], difficulty: Difficulty): ActivityDefinition[] {
  return categories.flatMap(({ id }) => {
    const { label, items } = learningCatalog[id];
    const allItems = normalize(items);
    const safeItems = allItems.slice(0, difficulty >= 3 ? 4 : 3);
    const target = safeItems[0];
    return [
      { id: `${age}-${id}-explore`, title: `Explore ${label}`, category: id, ageGroups: [age], type: "explore", difficulty, prompt: `Tap to explore ${label.toLowerCase()}!`, items: allItems, completionThreshold: Math.min(5, allItems.length), objective: { skill: "Recognition", description: `Build familiarity with ${label.toLowerCase()}.` } },
      { id: `${age}-${id}-find`, title: `Find ${target.label}`, category: id, ageGroups: [age], type: "find", difficulty, prompt: `Can you find ${target.label}?`, items: safeItems, objective: { skill: "Recall", description: `Recognize and name ${label.toLowerCase()}.` } },
      { id: `${age}-${id}-match`, title: `Match ${label}`, category: id, ageGroups: [age], type: "matching", difficulty, prompt: `Match the same ${label.toLowerCase()}.`, items: safeItems.slice(0, 3), objective: { skill: "Visual matching", description: `Compare and match ${label.toLowerCase()}.` } },
      { id: `${age}-${id}-sort`, title: `Sort ${label}`, category: id, ageGroups: [age], type: "sorting", difficulty, prompt: `Put each ${label.toLowerCase()} card in its matching basket.`, items: safeItems.slice(0, 3), objective: { skill: "Sorting", description: `Sort and classify ${label.toLowerCase()}.` } },
      { id: `${age}-${id}-memory`, title: `${label} Memory`, category: id, ageGroups: [age], type: "memory", difficulty, prompt: "Find every matching pair.", items: safeItems.slice(0, 3), objective: { skill: "Working memory", description: `Remember the location of ${label.toLowerCase()}.` } },
    ];
  });
}
