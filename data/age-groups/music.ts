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
      line("bee", "Bee & tree", "🐝", "#f0c653", "A busy bee buzzes by the tree."),
      line("duck", "Duck & truck", "🐥", "#70b7df", "A little duck rides in a bright red truck."),
      line("mouse", "Mouse & house", "🐭", "#8a82d2", "A tiny mouse tiptoes through the house."),
      line("goat", "Goat & boat", "🐐", "#72b985", "A goat in a boat wears a warm little coat."),
      line("fox", "Fox & box", "🦊", "#ef9b70", "A fox found socks inside a box."),
      line("snail", "Snail & trail", "🐌", "#bd8b63", "A slow little snail follows a shiny trail."),
      line("moon", "Moon & spoon", "🌙", "#70b7df", "The moon holds a spoon and hums a tune."),
    ],
    songTitle: "Move With Me",
    songItems: [
      line("clap", "Clap", "👏", "#ef7f7a", "Clap your hands, one, two, three. Come and move along with me."),
      line("stomp", "Stomp", "🦶", "#f0c553", "Stomp your feet, not too fast. Spin around and laugh at last."),
      line("wave", "Wave", "🙌", "#72b9df", "Wave up high and bend down low. Move your body, go, go, go."),
      line("jump", "Jump", "🐰", "#72b985", "Jump up high like a bunny. Land down softly, bright and sunny."),
      line("turn", "Turn", "🔄", "#8a82d2", "Turn around and touch the ground. Listen to the happy sound."),
      line("rest", "Rest", "😌", "#ef9b70", "Breathe in slowly, breathe out light. Rest your hands and sit just right."),
      line("march", "March", "🥁", "#ef777b", "March, march, lift your knees. Move together if you please."),
      line("tiptoe", "Tiptoe", "🩰", "#ef8fa8", "Tiptoe softly, quiet and slow. Little feet are on the go."),
      line("shake", "Shake", "🪇", "#efc451", "Shake your hands from side to side. Feel the rhythm, smile with pride."),
      line("freeze", "Freeze", "🧊", "#70b7df", "Dance and wiggle, then freeze still. Start again when music will."),
    ],
  },
  "2-3": {
    rhymeTitle: "Colors Can Rhyme",
    rhymeItems: [
      line("red", "Red", "🔴", "#ef7075", "Red by the bed nods its head."),
      line("blue", "Blue", "🔵", "#68b2df", "Blue little shoe says how do you do?"),
      line("green", "Green", "🟢", "#70b782", "Green little bean is dancing on the screen."),
      line("yellow", "Yellow", "🟡", "#f0c653", "Yellow says hello with a sunny glow."),
      line("pink", "Pink", "🌸", "#ef8fa8", "Pink by the sink gives us a wink."),
      line("brown", "Brown", "🟤", "#bd8b63", "Brown little crown rolls through the town."),
      line("orange", "Orange", "🟠", "#ef9a50", "Orange by the door rolls on the floor."),
      line("purple", "Purple", "🟣", "#8a82d2", "Purple in a circle gives a twirl."),
      line("white", "White", "⚪", "#9ab7c9", "White little kite flies light and bright."),
      line("black", "Black", "⚫", "#48586a", "Black little track loops out and back."),
    ],
    songTitle: "Count and Sing",
    songItems: [
      line("one", "One drum", "🥁", "#ef8273", "One little drum goes boom, boom, boom."),
      line("two", "Two bells", "🔔", "#efc653", "Two little bells go ding, ding, ding."),
      line("three", "Three stars", "⭐", "#847bd2", "Three happy stars all sing, sing, sing."),
      line("four", "Four birds", "🐦", "#70b7df", "Four little birds sing tweet, tweet, tweet."),
      line("five", "Five frogs", "🐸", "#72b985", "Five green frogs bounce to the beat."),
      line("finish", "Count again", "🔢", "#ef9b70", "One to five, we counted well. Clap your hands and ring the bell."),
      line("six", "Six fish", "🐟", "#70b7df", "Six little fish swish, swish, swish."),
      line("seven", "Seven clouds", "☁️", "#8aaec8", "Seven soft clouds float up to heaven."),
      line("eight", "Eight ducks", "🐥", "#efc451", "Eight yellow ducks waddle through the gate."),
      line("nine-ten", "Nine and ten", "⭐", "#8a82d2", "Nine bright stars, then number ten. Count them all and sing again."),
    ],
  },
  "3-4": {
    rhymeTitle: "Find the Rhyme",
    rhymeItems: [
      line("cat-hat", "Cat & hat", "🐱", "#ef8478", "Cat and hat are a rhyming pair."),
      line("frog-log", "Frog & log", "🐸", "#72b984", "Frog and log rhyme everywhere."),
      line("star-car", "Star & car", "⭐", "#7c83d2", "Star and car sound the same from afar."),
      line("bee-tree", "Bee & tree", "🐝", "#efc653", "Bee and tree rhyme happily."),
      line("cake-snake", "Cake & snake", "🍰", "#ef8fa8", "Cake and snake rhyme by the lake."),
      line("boat-goat", "Boat & goat", "⛵", "#70b7df", "Boat and goat rhyme as they float."),
      line("mouse-house", "Mouse & house", "🐭", "#bd8b63", "Mouse and house share sounds we know."),
      line("blue-shoe", "Blue & shoe", "👟", "#70b7df", "Blue and shoe rhyme through and through."),
      line("king-ring", "King & ring", "👑", "#efc451", "King and ring are fun to sing."),
      line("light-kite", "Light & kite", "🪁", "#8a82d2", "Light and kite sound just right."),
    ],
    songTitle: "Weather Song",
    songItems: [
      line("sun", "Sunny", "☀️", "#efc653", "Sun is shining, warm and bright. Stretch your arms into the light."),
      line("rain", "Rainy", "🌧️", "#70b7df", "Raindrops tap a gentle beat. Pitter-patter, dancing feet."),
      line("wind", "Breezy", "🍃", "#72b987", "Breezy wind goes whoosh today. Wave your hands and sway, sway, sway."),
      line("cloud", "Cloudy", "☁️", "#8aaec8", "Clouds drift softly, white and gray. Floating gently on their way."),
      line("rainbow", "Rainbow", "🌈", "#ef8fa8", "After rain, the colors show. Point and name the rainbow glow."),
      line("snow", "Snowy", "❄️", "#8a82d2", "Snowflakes twirl without a sound. Soft and bright upon the ground."),
      line("storm", "Stormy", "⛈️", "#596b85", "Thunder rumbles, lightning glows. Safe inside, the storm cloud goes."),
      line("fog", "Foggy", "🌫️", "#9ab7c9", "Fog rolls softly, low and white. Walk together, hold on tight."),
      line("warm", "Warm", "🌤️", "#ef9b70", "Warm air tickles cheeks and nose. Off the gentle sunshine goes."),
      line("cold", "Cold", "🧣", "#70b7df", "Cold wind whispers, zip your coat. Wrap a scarf around your throat."),
    ],
  },
  "4-5": {
    rhymeTitle: "Rhyme Builders",
    rhymeItems: [
      line("light", "Light words", "🪁", "#efc653", "Light, bright, kite. These words rhyme just right."),
      line("day", "Day words", "☀️", "#ef8478", "Play, day, say. Add a rhyme along the way."),
      line("moon", "Moon words", "🌙", "#7b82d2", "Moon, tune, soon. Sing the rhyme this afternoon."),
      line("ring", "Ring words", "💍", "#70b7df", "Ring, sing, wing. Name another rhyming thing."),
      line("cake", "Cake words", "🍰", "#ef8fa8", "Cake, lake, snake. Which new rhyme can you make?"),
      line("fun", "Fun words", "☀️", "#72b985", "Fun, sun, run. Three rhyming words make one."),
      line("boat", "Boat words", "⛵", "#70b7df", "Boat, coat, float. Read each rhyming note."),
      line("tree", "Tree words", "🌳", "#72b985", "Tree, bee, three. Build the rhyme with me."),
      line("play", "Play words", "🛝", "#ef9b70", "Play, stay, tray. Sort the rhymes today."),
      line("look", "Look words", "📖", "#8a82d2", "Look, book, cook. Find the words inside a book."),
    ],
    songTitle: "Alphabet Beat",
    songItems: [
      line("abc", "A B C", "🔤", "#ef7d78", "A, B, C, sing along with me."),
      line("def", "D E F", "🎵", "#70b7df", "D, E, F, tap the beat from left to right."),
      line("ghi", "G H I", "🎤", "#72b984", "G, H, I, raise your hands up high."),
      line("jkl", "J K L", "🎹", "#efc653", "J, K, L, ring the alphabet bell."),
      line("mno", "M N O", "🥁", "#8a82d2", "M, N, O, tap the drum and go, go, go."),
      line("pqr", "P Q R", "⭐", "#ef9b70", "P, Q, R, sing it like a shining star."),
      line("stu", "S T U", "🎸", "#72b985", "S, T, U, strum a happy tune."),
      line("vwx", "V W X", "🎤", "#70b7df", "V, W, X, sing the letters next."),
      line("yz", "Y and Z", "✨", "#efc451", "Y and Z, the alphabet is done for me."),
      line("again", "Sing again", "🔤", "#ef8fa8", "A to Z, clap the beat. Sing it faster on repeat."),
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
