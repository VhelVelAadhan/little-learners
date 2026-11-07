import { defineClass, explore, find, match, memory, order, peekaboo, q, quiz, rhyme, sort, steps, story, subject, swatches, trace } from "./helpers";

export const preKg = defineClass({
  id: "pre-kg", title: "Pre-KG", dashboardName: "Pre-KG", concept: "First letters, numbers and rhymes.",
  eyebrow: "HELLO, PRE-KG FRIEND!", welcome: "What shall we", welcomeAccent: "learn today?",
  instruction: "Pick a subject and tap to play.", accent: "#66b7d4", world: "sensory",
}, [
  subject("english", "English", "type", "coral", [
    explore("Letters A to Z", "Tap a letter and say it!", [["A for Apple", "🍎"], ["B for Ball", "⚽"], ["C for Cat", "🐱"], ["D for Dog", "🐶"], ["E for Elephant", "🐘"], ["F for Fish", "🐟"], ["G for Grapes", "🍇"], ["H for Hat", "🎩"], ["I for Ice cream", "🍦"], ["J for Jug", "🏺"], ["K for Key", "🔑"], ["L for Lion", "🦁"], ["M for Monkey", "🐵"], ["N for Nose", "👃"], ["O for Orange", "🍊"], ["P for Parrot", "🦜"], ["Q for Queen", "👸"], ["R for Rabbit", "🐰"], ["S for Sun", "☀️"], ["T for Tiger", "🐯"], ["U for Umbrella", "☂️"], ["V for Van", "🚐"], ["W for Watch", "⌚"], ["X for Xylophone", "🎵"], ["Y for Yak", "🐂"], ["Z for Zebra", "🦓"]]),
    find("Find the Letter", "Find each letter!", [["A", "🍎"], ["B", "⚽"], ["C", "🐱"]]),
    match("Letter and Picture", "Tap a letter, then its picture.", [["A", "🍎"], ["B", "⚽"], ["C", "🐱"], ["D", "🐶"]]),
    memory("Picture Pairs", "Find the matching pairs.", [["Apple", "🍎"], ["Ball", "⚽"], ["Cat", "🐱"], ["Dog", "🐶"]]),
    quiz("First Letter", "Listen and choose the first letter.", [
      q("Which letter does Apple start with?", "A", ["B", "C"], "🍎"),
      q("Which letter does Ball start with?", "B", ["D", "A"], "⚽"),
      q("Which letter does Dog start with?", "D", ["C", "F"], "🐶"),
      q("Which letter does Sun start with?", "S", ["T", "M"], "☀️"),
    ]),
    trace("Trace the Letter A", "A", "A"),
    trace("Trace the Letter B", "B", "B"),
  ]),
  subject("maths", "Mathematics / Numeracy", "calculator", "blue", [
    explore("Numbers 1 to 5", "Tap a number and count!", [["1 One", "⭐"], ["2 Two", "⭐⭐"], ["3 Three", "🍎🍎🍎"], ["4 Four", "🐥🐥🐥🐥"], ["5 Five", "🌸🌸🌸🌸🌸"]], 5),
    explore("Numbers 6 to 10", "Tap a number and say it!", [["Six", "6"], ["Seven", "7"], ["Eight", "8"], ["Nine", "9"], ["Ten", "10"]], 5),
    order("Count in Order", "Tap the numbers from 1 to 5.", [["One", "1"], ["Two", "2"], ["Three", "3"], ["Four", "4"], ["Five", "5"]]),
    match("Number and Objects", "Tap a number, then the same many things.", [["1", "🍎"], ["2", "🐶🐶"], ["3", "⭐⭐⭐"], ["4", "🌸🌸🌸🌸"]]),
    quiz("How Many?", "Count and choose.", [
      q("How many stars?", "2", ["1", "3"], "⭐⭐"),
      q("How many apples?", "3", ["2", "5"], "🍎🍎🍎"),
      q("How many ducks?", "1", ["2", "4"], "🦆"),
      q("How many balloons?", "4", ["3", "5"], "🎈🎈🎈🎈"),
    ]),
    explore("Shapes", "Tap a shape and say its name!", [["Circle", "●"], ["Square", "■"], ["Triangle", "▲"], ["Star", "★"], ["Heart", "♥"], ["Rectangle", "▬"]]),
    quiz("Big and Small", "Look carefully and choose.", [
      q("Which is big?", "Elephant", ["Ant"], "🐘 🐜"),
      q("Which is small?", "Mouse", ["Cow"], "🐄 🐭"),
      q("Which is tall?", "Giraffe", ["Hen"], "🦒 🐔"),
    ]),
    trace("Trace the Number 1", "One", "1"),
  ]),
  subject("general-awareness", "General Awareness", "lightbulb", "green", [
    swatches("Colours", "Tap a colour and say its name!", [["Red", "#e5484d"], ["Blue", "#3b82d6"], ["Yellow", "#e9b308"], ["Green", "#3f9f5f"], ["Orange", "#f08a2c"], ["Pink", "#e873a6"], ["Purple", "#8460cc"], ["Brown", "#9b6a45"]]),
    explore("Animal Friends", "Tap an animal and hear it!", [["Dog", "🐶", "Dog says woof woof!"], ["Cat", "🐱", "Cat says meow!"], ["Cow", "🐮", "Cow says moo!"], ["Duck", "🦆", "Duck says quack quack!"], ["Lion", "🦁", "Lion says roar!"], ["Hen", "🐔", "Hen says cluck cluck!"], ["Sheep", "🐑", "Sheep says baa baa!"], ["Frog", "🐸", "Frog says ribbit!"]]),
    explore("Yummy Fruits", "Tap a fruit and say its name!", [["Apple", "🍎"], ["Banana", "🍌"], ["Mango", "🥭"], ["Orange", "🍊"], ["Grapes", "🍇"], ["Watermelon", "🍉"], ["Pineapple", "🍍"], ["Strawberry", "🍓"]]),
    explore("My Body", "Tap, say and touch!", [["Eyes", "👀", "These are my eyes."], ["Ears", "👂", "These are my ears."], ["Nose", "👃", "This is my nose."], ["Mouth", "👄", "This is my mouth."], ["Hands", "🙌", "These are my hands."], ["Feet", "🦶", "These are my feet."]]),
    explore("My Family", "Tap and say who it is!", [["Mother", "👩"], ["Father", "👨"], ["Sister", "👧"], ["Brother", "👦"], ["Grandmother", "👵"], ["Grandfather", "👴"]]),
    peekaboo("Peekaboo Animals", "Tap a cloud. Who is hiding?", [["Dog", "🐶"], ["Cat", "🐱"], ["Cow", "🐮"], ["Monkey", "🐵"]]),
    sort("Fruit or Animal?", "Tap a picture, then its basket.", { Fruit: [["Apple", "🍎"], ["Banana", "🍌"]], Animal: [["Dog", "🐶"], ["Cat", "🐱"]] }),
    quiz("Who Says It?", "Listen and choose.", [
      q("Who says moo?", "Cow", ["Dog", "Cat"], "🐮"),
      q("Who says meow?", "Cat", ["Duck", "Lion"], "🐱"),
      q("What do we see with?", "Eyes", ["Ears", "Feet"], "👀"),
      q("What colour is a banana?", "Yellow", ["Blue", "Red"], "🍌"),
    ]),
  ]),
  subject("rhymes", "Rhymes", "music", "yellow", [
    rhyme("Twinkle, Twinkle", [["Little star", "⭐", "Twinkle, twinkle, little star, how I wonder what you are!"], ["Up so high", "🌌", "Up above the world so high, like a diamond in the sky."], ["Once again", "✨", "Twinkle, twinkle, little star, how I wonder what you are!"]]),
    rhyme("Baa, Baa, Black Sheep", [["Black sheep", "🐑", "Baa, baa, black sheep, have you any wool?"], ["Three bags", "🛍️", "Yes sir, yes sir, three bags full."], ["For everyone", "👦", "One for the master, one for the dame, and one for the little boy who lives down the lane."]]),
    rhyme("Johny, Johny", [["Sugar", "🍬", "Johny, Johny. Yes, Papa. Eating sugar? No, Papa."], ["Telling lies", "🤥", "Telling lies? No, Papa."], ["Ha ha ha", "😄", "Open your mouth. Ha, ha, ha!"]]),
    rhyme("Rain, Rain, Go Away", [["Rain", "🌧️", "Rain, rain, go away."], ["Another day", "📅", "Come again another day."], ["Let us play", "🧒", "Little children want to play."]]),
    rhyme("Humpty Dumpty", [["On the wall", "🥚", "Humpty Dumpty sat on a wall."], ["Great fall", "💥", "Humpty Dumpty had a great fall."], ["King's men", "🐴", "All the king's horses and all the king's men couldn't put Humpty together again."]]),
    rhyme("Head, Shoulders, Knees and Toes", [["Touch and sing", "🙆", "Head, shoulders, knees and toes, knees and toes."], ["Once more", "🦵", "Head, shoulders, knees and toes, knees and toes."], ["Face", "👀", "Eyes and ears and mouth and nose. Head, shoulders, knees and toes, knees and toes."]]),
  ]),
  subject("stories", "Stories", "book", "purple", [
    story("The Thirsty Crow", [["Thirsty", "🐦", "A crow was very thirsty on a hot day."], ["A pot", "🏺", "He found a pot with a little water at the bottom."], ["Pebbles", "⚫", "He dropped pebbles in, one by one. The water came up."], ["Clever crow", "💧", "The crow drank the water and flew away happy. Think, and you can solve it!"]]),
    story("The Hare and the Tortoise", [["The race", "🐢", "A fast hare laughed at a slow tortoise, so they had a race."], ["A nap", "🐇", "The hare ran far ahead and took a nap under a tree."], ["Slow and steady", "🐢", "The tortoise kept walking, slowly, without stopping."], ["The winner", "🏆", "When the hare woke up, the tortoise had won. Slow and steady wins the race!"]]),
    story("The Lion and the Mouse", [["Let me go", "🦁", "A lion caught a little mouse. Please let me go, said the mouse. The lion was kind and let him go."], ["In a net", "🕸️", "One day, the lion was caught in a hunter's net."], ["Little helper", "🐭", "The mouse came and bit the net with his sharp teeth."], ["Friends", "❤️", "The lion was free! Even little friends can be a big help."]]),
    story("Goldy the Kind Hen", [["Goldy", "🐔", "Goldy the hen found a big, fat worm."], ["Hungry chick", "🐥", "She saw a tiny chick who had no food."], ["Sharing", "🤝", "Goldy shared her food with the tiny chick."], ["Happy", "😊", "Now they were both full and happy. Sharing makes us happy!"]]),
  ]),
  subject("art-craft", "Art & Craft", "paint", "coral", [
    steps("Finger Painting", "Ask a grown-up to help you.", [["Get ready", "🎨", "Put some paint on a plate and paper on the table."], ["Dip", "☝️", "Dip one finger in the paint."], ["Press", "🖐️", "Press your finger on the paper. Make many dots!"], ["Wash up", "🧼", "Wash your hands with soap. Well done!"]]),
    steps("Hand Print Tree", "Ask a grown-up to help you.", [["Brown line", "🟫", "Draw a brown line for the tree trunk."], ["Green hand", "✋", "Paint your hand green."], ["Press", "🌳", "Press your hand on top of the trunk."], ["Add fruit", "🍎", "Draw little red dots for apples."]]),
    steps("Paper Plate Sun", "Ask a grown-up to help you.", [["Plate", "🍽️", "Take a paper plate."], ["Colour", "🖍️", "Colour the plate yellow."], ["Rays", "☀️", "Stick yellow paper strips around it."], ["Smile", "😊", "Draw two eyes and a big smile!"]]),
    swatches("Crayon Box", "Which crayon do you like?", [["Red", "#e5484d"], ["Blue", "#3b82d6"], ["Yellow", "#e9b308"], ["Green", "#3f9f5f"]]),
    quiz("Colour Quiz", "Choose the right colour.", [
      q("What colour is the sun in your drawing?", "Yellow", ["Blue", "Black"], "☀️"),
      q("What colour are leaves?", "Green", ["Pink", "Red"], "🍃"),
      q("What colour is the sky?", "Blue", ["Brown", "Green"], "🌤️"),
    ]),
  ]),
  subject("physical", "Physical Activities", "move", "green", [
    steps("Animal Walks", "Stand up and move!", [["Bunny", "🐰", "Hop, hop, hop like a bunny."], ["Elephant", "🐘", "Walk slowly and swing your arm like a trunk."], ["Bird", "🐦", "Flap your arms and fly around."], ["Frog", "🐸", "Squat down and jump like a frog."]]),
    steps("Stretch and Reach", "Stand up and move!", [["Up", "🙌", "Reach up high to touch the sky."], ["Down", "🤸", "Bend down and touch your toes."], ["Side", "🧍", "Lean to one side, then the other."], ["Breathe", "😌", "Take a slow breath in and out."]]),
    steps("Clap and Stamp", "Stand up and move!", [["Clap", "👏", "Clap your hands three times."], ["Stamp", "🦶", "Stamp your feet three times."], ["Turn", "💃", "Turn around slowly once."], ["Jump", "⬆️", "Jump up and down three times."]]),
    steps("Ball Play", "Play with a soft ball and a grown-up.", [["Roll", "⚽", "Sit down and roll the ball to a friend."], ["Catch", "🙌", "Stop the ball with both hands."], ["Throw", "🤾", "Throw the ball gently with two hands."], ["Kick", "🦵", "Kick the ball softly."]]),
  ]),
]);
