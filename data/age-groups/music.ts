import type { ActivityDefinition, AgeGroup, Difficulty, LearningItem } from "@/types/learning";

type MusicSet = {
  rhymeTitle: string;
  rhymeItems: LearningItem[];
  songTitle: string;
  songItems: LearningItem[];
};

const line = (id: string, label: string, visual: string, value: string, words: string): LearningItem => ({
  id,
  label,
  visual,
  value,
  secondary: words,
});

const musicByAge: Record<AgeGroup, MusicSet> = {
  "0-1": {
    rhymeTitle: "Clap, Tap & Smile",
    rhymeItems: [
      line("clap", "Clap", "👏", "#f48a79", "Clap, clap, tiny hands. Tap, tap, tiny toes."),
      line("wave", "Wave", "👋", "#72b9df", "Wave hello and smile so bright. Wiggle, giggle, pure delight."),
      line("grow", "Grow", "🌱", "#72ba86", "Up we stretch, down we go. Little learner, grow and grow."),
      line("bounce", "Bounce", "⚽", "#efc653", "Bounce, bounce, little ball. Up it goes and down it falls."),
      line("wiggle", "Wiggle", "🪱", "#8d82d5", "Wiggle left and wiggle right. Tiny wiggles feel just right."),
      line("peek", "Peekaboo", "🙈", "#ef9a78", "Peekaboo, I see you. Smile and wave, hello to you."),
    ],
    songTitle: "Hello, Little Star",
    songItems: [
      line("star", "Little star", "⭐", "#f0c653", "Hello, little star, shining where you are."),
      line("blink", "Blink", "✨", "#8d82d5", "Blink your light and wave hello, softly, softly, to and fro."),
      line("dream", "Sweet dreams", "🌙", "#6e9bce", "Night is calm and dreams are near. Little star is always here."),
      line("cloud", "Cloud", "☁️", "#78b9df", "Clouds float softly through the sky. Wave to every cloud nearby."),
      line("hug", "Big hug", "🤗", "#ef9a78", "Open your arms, warm and wide. Share a happy hug inside."),
      line("goodnight", "Goodnight", "🧸", "#bc8b66", "Goodnight teddy, rest your head. Stars are glowing near your bed."),
    ],
  },
  "1-2": {
    rhymeTitle: "Animal Rhyme Time",
    rhymeItems: [
      line("cat", "Cat & hat", "🐱", "#f2a078", "A cat in a hat sits down on a mat."),
      line("frog", "Frog & log", "🐸", "#72b982", "A frog on a log says hop, hop, hop."),
      line("bear", "Bear & chair", "🐻", "#c79868", "A bear in a chair taps everywhere."),
    ],
    songTitle: "Move With Me",
    songItems: [
      line("clap", "Clap", "👏", "#ef7f7a", "Clap your hands, one, two, three. Come and move along with me."),
      line("stomp", "Stomp", "🦶", "#f0c553", "Stomp your feet, not too fast. Spin around and laugh at last."),
      line("wave", "Wave", "🙌", "#72b9df", "Wave up high and bend down low. Move your body, go, go, go."),
    ],
  },
  "2-3": {
    rhymeTitle: "Colors Can Rhyme",
    rhymeItems: [
      line("red", "Red", "🔴", "#ef7075", "Red by the bed nods its head."),
      line("blue", "Blue", "🔵", "#68b2df", "Blue little shoe says how do you do?"),
      line("green", "Green", "🟢", "#70b782", "Green little bean is dancing on the screen."),
    ],
    songTitle: "Count and Sing",
    songItems: [
      line("one", "One drum", "🥁", "#ef8273", "One little drum goes boom, boom, boom."),
      line("two", "Two bells", "🔔", "#efc653", "Two little bells go ding, ding, ding."),
      line("three", "Three stars", "⭐", "#847bd2", "Three happy stars all sing, sing, sing."),
    ],
  },
  "3-4": {
    rhymeTitle: "Find the Rhyme",
    rhymeItems: [
      line("cat-hat", "Cat & hat", "🐱", "#ef8478", "Cat and hat are a rhyming pair."),
      line("frog-log", "Frog & log", "🐸", "#72b984", "Frog and log rhyme everywhere."),
      line("star-car", "Star & car", "⭐", "#7c83d2", "Star and car sound the same from afar."),
    ],
    songTitle: "Weather Song",
    songItems: [
      line("sun", "Sunny", "☀️", "#efc653", "Sun is shining, warm and bright. Stretch your arms into the light."),
      line("rain", "Rainy", "🌧️", "#70b7df", "Raindrops tap a gentle beat. Pitter-patter, dancing feet."),
      line("wind", "Breezy", "🍃", "#72b987", "Breezy wind goes whoosh today. Wave your hands and sway, sway, sway."),
    ],
  },
  "4-5": {
    rhymeTitle: "Rhyme Builders",
    rhymeItems: [
      line("light", "Light words", "🪁", "#efc653", "Light, bright, kite. These words rhyme just right."),
      line("day", "Day words", "☀️", "#ef8478", "Play, day, say. Add a rhyme along the way."),
      line("moon", "Moon words", "🌙", "#7b82d2", "Moon, tune, soon. Sing the rhyme this afternoon."),
    ],
    songTitle: "Alphabet Beat",
    songItems: [
      line("abc", "A B C", "🔤", "#ef7d78", "A, B, C, sing along with me."),
      line("def", "D E F", "🎵", "#70b7df", "D, E, F, tap the beat from left to right."),
      line("ghi", "G H I", "🎤", "#72b984", "G, H, I, raise your hands up high."),
    ],
  },
};

const difficultyByAge: Record<AgeGroup, Difficulty> = { "0-1": 1, "1-2": 1, "2-3": 1, "3-4": 2, "4-5": 3 };

export function buildMusicActivities(age: AgeGroup): ActivityDefinition[] {
  const set = musicByAge[age];
  const shared = { category: "music" as const, ageGroups: [age], type: "music" as const, difficulty: difficultyByAge[age], celebration: age !== "0-1" };
  return [
    { ...shared, id: `${age}-music-rhyme`, title: set.rhymeTitle, prompt: "Tap each card to hear the rhyme.", items: set.rhymeItems, objective: { skill: "Rhyming", description: "Listen for words that sound alike." } },
    { ...shared, id: `${age}-music-song`, title: set.songTitle, prompt: "Tap each card and sing along.", items: set.songItems, objective: { skill: "Music and rhythm", description: "Join in with a simple age-appropriate song." } },
  ];
}
