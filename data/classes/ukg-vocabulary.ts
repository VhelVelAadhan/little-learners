import { explore, match, order, q, quiz, sort, steps, subject } from "./helpers";

/**
 * UKG Vocabulary, following the topic order of the class's picture vocabulary book.
 * Words and topics come from the book; questions, facts and pictures are our own.
 * The book's rhyme lyrics, story text and illustrations are not reproduced here.
 */
export const ukgVocabulary = subject("vocabulary", "Vocabulary", "sparkles", "green", [
  // Pictures
  explore("Birds", "Tap a bird to hear about it.", [["Eagle", "🦅", "An eagle has very sharp eyes and flies high."], ["Bulbul", "🐦", "A bulbul is a small bird that sings sweetly."], ["Pelican", "🐦", "A pelican has a big pouch under its beak."], ["Koel", "🐦", "A koel sings loudly in summer."], ["Hornbill", "🐦", "A hornbill has a huge curved beak."], ["Woodpecker", "🐦", "A woodpecker pecks holes in trees."]], 6),
  explore("Aquatic Animals", "Tap an animal to hear about it.", [["Dolphin", "🐬", "A dolphin is clever and comes up to breathe air."], ["Prawn", "🍤", "A prawn has long feelers and many legs."], ["Oyster", "🦪", "An oyster lives in a shell and can make a pearl."], ["Starfish", "⭐", "A starfish usually has five arms."], ["Seahorse", "🐠", "A seahorse swims upright and has a curly tail."], ["Coral", "🌊", "Coral is made by tiny sea animals."]], 6),
  sort("Bird or Aquatic Animal?", "Tap a word, then its basket.", { Bird: [["Eagle", "🦅"], ["Koel", ""], ["Pelican", ""]], "Aquatic animal": [["Dolphin", "🐬"], ["Oyster", "🦪"], ["Starfish", "⭐"]] }),
  quiz("Birds and Sea Quiz", "Listen and choose.", [
    q("Which bird pecks holes in trees?", "Woodpecker", ["Pelican", "Koel"]),
    q("Which bird has a big pouch under its beak?", "Pelican", ["Bulbul", "Eagle"]),
    q("Which bird sings loudly in summer?", "Koel", ["Eagle", "Hornbill"]),
    q("Which sea animal can make a pearl?", "Oyster", ["Prawn", "Dolphin"]),
    q("Which sea animal swims upright with a curly tail?", "Seahorse", ["Coral", "Starfish"]),
  ]),
  explore("Transport", "Tap and say its name!", [["Ambulance", "🚑"], ["Bus", "🚌"], ["Truck", "🚚"], ["Autorickshaw", "🛺"], ["Ship", "🚢"], ["Rowboat", "🚣"], ["Yacht", "🛥️"], ["Sailboat", "⛵"], ["Aeroplane", "✈️"], ["Helicopter", "🚁"], ["Spacecraft", "🚀"], ["Cable car", "🚡"]], 6),
  sort("Land, Water or Air?", "How does it travel?", { Land: [["Truck", "🚚"], ["Autorickshaw", "🛺"]], Water: [["Yacht", "🛥️"], ["Rowboat", "🚣"]], Air: [["Helicopter", "🚁"], ["Spacecraft", "🚀"]] }),
  match("Transport Words", "Tap a word, then its picture.", [["Yacht", "🛥️"], ["Cable car", "🚡"], ["Spacecraft", "🚀"], ["Ambulance", "🚑"]]),
  quiz("Transport Quiz", "Listen and choose.", [
    q("Which one takes sick people to hospital?", "Ambulance", ["Yacht", "Truck"], "🏥"),
    q("Which one uses the wind to move?", "Sailboat", ["Bus", "Helicopter"], "🌬️"),
    q("Which one travels to space?", "Spacecraft", ["Cable car", "Ship"], "🌌"),
    q("Which one do we move with oars?", "Rowboat", ["Autorickshaw", "Aeroplane"], "🌊"),
    q("Which one hangs from a strong wire?", "Cable car", ["Truck", "Bus"], "⛰️"),
  ]),
  explore("Professions", "Tap to hear what they do.", [["Farmer", "👨‍🌾", "A farmer grows our food."], ["Baker", "🍰", "A baker makes bread and cakes."], ["Grocer", "🛒", "A grocer sells food in a shop."], ["Chef", "👨‍🍳", "A chef cooks food in a kitchen."], ["Choreographer", "💃", "A choreographer teaches people how to dance."], ["Singer", "🎤", "A singer sings songs."], ["Actor", "🎬", "An actor plays roles in films and plays."], ["Painter", "🎨", "A painter makes pictures with paint."], ["Footballer", "⚽", "A footballer plays football."], ["Coach", "📋", "A coach trains players."], ["Cricketer", "🏏", "A cricketer plays cricket."], ["Boxer", "🥊", "A boxer fights in a ring with gloves."]], 6),
  match("Who Uses This?", "Tap a person, then what they use.", [["Painter", "🎨"], ["Boxer", "🥊"], ["Singer", "🎤"], ["Cricketer", "🏏"]]),
  quiz("Professions Quiz", "Listen and choose.", [
    q("Who bakes bread and cakes?", "Baker", ["Boxer", "Coach"], "🍰"),
    q("Who sells food in a shop?", "Grocer", ["Actor", "Footballer"], "🛒"),
    q("Who teaches people how to dance?", "Choreographer", ["Farmer", "Grocer"], "💃"),
    q("Who trains players?", "Coach", ["Chef", "Singer"], "📋"),
    q("Who plays roles in films?", "Actor", ["Baker", "Cricketer"], "🎬"),
  ]),

  // Rhymes: words and actions from the rhymes in the book
  explore("Body Words", "Tap, say and touch!", [["Head", "🙂"], ["Shoulders", "🤷"], ["Knees", "🦵"], ["Toes", "🦶"], ["Eyes", "👀"], ["Ears", "👂"], ["Mouth", "👄"], ["Nose", "👃"], ["Arms", "💪"], ["Fingers", "🖐️"], ["Lips", "💋"], ["Tummy", "🧍"]], 6),
  explore("Nature Words", "Tap and say it!", [["Flower", "🌸"], ["Bird", "🐦"], ["Mountain", "⛰️"], ["River", "🏞️"], ["Sunset", "🌇"], ["Morning", "🌅"], ["Wind", "🌬️"], ["Stars", "✨"]]),
  match("Rhyme Partners 1", "Tap a number, then the word that rhymes.", [["One", "👍 thumb"], ["Two", "👞 shoe"], ["Three", "🦵 knee"], ["Four", "🚪 door"]]),
  match("Rhyme Partners 2", "Tap a number, then the word that rhymes.", [["Five", "🐝 hive"], ["Six", "🥢 sticks"], ["Eight", "🚧 gate"], ["Nine", "🍇 vine"]]),
  quiz("Counting Ducks", "Count and choose.", [
    q("Five ducks went out. One stayed away. How many came back?", "4", ["3", "5"], "🦆🦆🦆🦆🦆"),
    q("Four ducks went out. One stayed away. How many came back?", "3", ["2", "4"], "🦆🦆🦆🦆"),
    q("Two ducks went out. One stayed away. How many came back?", "1", ["2", "0"], "🦆🦆"),
    q("What sound does a duck make?", "Quack", ["Moo", "Roar"], "🦆"),
  ]),
  match("Parts of a Bus", "Tap a part, then what it does.", [["Wheels", "round and round"], ["Wipers", "swish"], ["Doors", "open and shut"], ["Horn", "beep"]]),
  order("Spell the Dog's Name", "Tap the letters to spell BINGO.", [["B", "B"], ["I", "I"], ["N", "N"], ["G", "G"], ["O", "O"]]),
  match("Opposite Actions", "Tap a word, then its opposite.", [["Up", "down"], ["In", "out"], ["Left", "right"], ["Fast", "slow"]]),
  match("More Opposites", "Tap a word, then its opposite.", [["High", "low"], ["Early", "late"], ["Loud", "soft"], ["Big", "small"]]),

  // Scenes
  explore("In the Village", "Tap and say what you see.", [["Hut", "🏡"], ["Cow", "🐄"], ["Farmer", "👨‍🌾"], ["Potter", "🏺"], ["Bicycle", "🚲"], ["Hen", "🐔"], ["Vegetables", "🥕"], ["School", "🏫"], ["Hospital", "🏥"], ["Panchayat office", "🏛️"], ["Hills", "⛰️"]]),
  explore("In the City", "Tap and say what you see.", [["Tall building", "🏢"], ["Factory", "🏭"], ["Bus", "🚌"], ["Taxi", "🚕"], ["Autorickshaw", "🛺"], ["Ambulance", "🚑"], ["Pharmacy", "💊"], ["Supermarket", "🛒"], ["Library", "📚"], ["Coffee shop", "☕"], ["Office", "🏢"], ["Street lamp", "💡"]]),
  explore("At the Railway Station", "Tap and say what you see.", [["Train", "🚆"], ["Platform", "🚉"], ["Ticket counter", "🎫"], ["Porter", "🧳"], ["Passenger", "🚶"], ["Tea stall", "☕"], ["Clock", "🕛"], ["Footbridge", "🌉"]]),
  explore("At the Shopping Mall", "Tap and say what you see.", [["Escalator", "⬆️"], ["Jewellery", "💍"], ["Clothes", "👕"], ["Toys", "🧸"], ["Television", "📺"], ["Trolley", "🛒"], ["ATM", "🏧"], ["Washing machine", "🧺"]]),
  explore("At the Beach", "Tap and say what you see.", [["Sun", "☀️"], ["Ship", "🚢"], ["Sailboat", "⛵"], ["Beach umbrella", "⛱️"], ["Coconut", "🥥"], ["Ice cream", "🍦"], ["Popcorn", "🍿"], ["Volleyball", "🏐"], ["Palm tree", "🌴"], ["Balloons", "🎈"]]),
  explore("In the Park", "Tap and say what you see.", [["Fountain", "⛲"], ["Bicycle", "🚲"], ["Skateboard", "🛹"], ["Badminton", "🏸"], ["Kite", "🪁"], ["Dog", "🐕"], ["Bench", "🪑"], ["Balloons", "🎈"]]),
  explore("At the Airport", "Tap and say what you see.", [["Aeroplane", "✈️"], ["Pilot", "👨‍✈️"], ["Suitcase", "🧳"], ["Ticket", "🎫"], ["Security officer", "👮"], ["Departure", "🛫"], ["Arrival", "🛬"], ["Coffee", "☕"]]),
  explore("On the Farm", "Tap and say what you see.", [["Horse", "🐎"], ["Cow", "🐄"], ["Sheep", "🐑"], ["Pig", "🐖"], ["Goat", "🐐"], ["Rabbit", "🐇"], ["Duck", "🦆"], ["Hen", "🐔"], ["Hay", "🌾"], ["Farmer", "👨‍🌾"]]),
  explore("In the Jungle", "Tap and say what you see.", [["Monkey", "🐒"], ["Snake", "🐍"], ["Parrot", "🦜"], ["Owl", "🦉"], ["Bear", "🐻"], ["Tiger", "🐅"], ["Lion", "🦁"], ["Elephant", "🐘"], ["Giraffe", "🦒"], ["Zebra", "🦓"], ["Crocodile", "🐊"], ["Peacock", "🦚"]]),
  explore("Under the Ocean", "Tap and say what you see.", [["Whale", "🐋"], ["Shark", "🦈"], ["Fish", "🐟"], ["Clownfish", "🐠"], ["Squid", "🦑"], ["Octopus", "🐙"], ["Seaweed", "🌿"], ["Waves", "🌊"]]),
  sort("Village or City?", "Where would you see it most?", { Village: [["Potter", "🏺"], ["Hut", "🏡"], ["Bullock", "🐂"]], City: [["Tall building", "🏢"], ["Taxi", "🚕"], ["Factory", "🏭"]] }),
  sort("Farm or Jungle?", "Where does it live?", { Farm: [["Hen", "🐔"], ["Sheep", "🐑"], ["Pig", "🐖"]], Jungle: [["Tiger", "🐅"], ["Giraffe", "🦒"], ["Crocodile", "🐊"]] }),
  quiz("Where Do You See It?", "Listen and choose.", [
    q("Where do you see a ticket counter and a platform?", "Railway station", ["Park", "Jungle"], "🎫"),
    q("Where do you see a pilot and a suitcase?", "Airport", ["Farm", "Village"], "👨‍✈️"),
    q("Where do you see an escalator and many shops?", "Shopping mall", ["Beach", "Farm"], "🛍️"),
    q("Where do you build with sand?", "Beach", ["Airport", "Library"], "🏖️"),
    q("Where do you see a whale and an octopus?", "Ocean", ["Park", "City"], "🐙"),
    q("Where do you see a slide and swings?", "Park", ["Railway station", "Ocean"], "🧒"),
  ]),

  // Stories: comprehension to use alongside the book
  quiz("Where Is Nandini?", "Read the story in your book, then answer.", [
    q("Who is the youngest of the four children?", "Nandini", ["Malini", "Shankar"]),
    q("Who takes the cows out to graze?", "Malini", ["Ganesh", "Nandini"], "🐄"),
    q("What does Nandini want to make with the flowers?", "A garland", ["A cake", "A kite"], "🌸"),
    q("What helps the children look for Nandini?", "Footprints in the mud", ["A map", "A phone"], "👣"),
    q("How do they find Nandini?", "Fast asleep", ["Crying on a bus", "At the school"], "😴"),
  ]),
  explore("Winter Words", "Tap and say it!", [["Sweater", "🧥"], ["Gloves", "🧤"], ["Scarf", "🧣"], ["Hot tea", "☕"], ["Snowman", "⛄"], ["Snowflake", "❄️"], ["Groundnuts", "🥜"], ["Camel", "🐫"]]),
  quiz("Hot Tea and Warm Rugs", "Read the story in your book, then answer.", [
    q("Which season is this story about?", "Winter", ["Summer", "Rainy season"], "❄️"),
    q("What are heaped up at the fair?", "Groundnuts", ["Mangoes", "Toys"], "🥜"),
    q("Where does her friend Rajni live?", "Shimla", ["Chennai", "Jaisalmer"], "🏔️"),
    q("What does she want to ride in Jaisalmer?", "A camel", ["A boat", "A train"], "🐫"),
    q("What does she want to buy for her grandmother?", "A warm shawl", ["A cricket bat", "A toy car"], "🧣"),
  ]),

  // Let's talk: topics from the book's planned conversation pages
  sort("Inside or Outside My Body?", "Tap a word, then its basket.", { Inside: [["Heart", "❤️"], ["Brain", "🧠"], ["Stomach", ""]], Outside: [["Eyes", "👀"], ["Ears", "👂"], ["Nose", "👃"]] }),
  steps("Let's Talk: All About Me", "Talk about each card with a grown-up.", [["My family", "👨‍👩‍👧", "Who is in your family?"], ["My morning", "🌅", "What do you do before school?"], ["My games", "⚽", "What do you play with your friends?"], ["Clean home", "🧹", "How can you help keep your home clean?"], ["When I am sad", "😢", "What makes you feel better when you are sad?"], ["When I am happy", "😄", "What do you like to do when you are happy?"]]),
  sort("Food Groups", "Tap a food, then its basket.", { Grains: [["Rice", "🍚"], ["Wheat", "🌾"]], Dairy: [["Milk", "🥛"], ["Cheese", "🧀"]], "Fruit and vegetables": [["Apple", "🍎"], ["Carrot", "🥕"]] }),
  quiz("Food and Nutrition", "Listen and choose.", [
    q("What should you do after eating something very spicy?", "Drink milk or water", ["Eat more chilli", "Run around"], "🌶️"),
    q("Which is a dairy product?", "Curd", ["Rice", "Mango"], "🥛"),
    q("Which is a spice?", "Cardamom", ["Carrot", "Banana"]),
    q("Which is a fried food?", "Samosa", ["Apple", "Curd"]),
    q("A balanced meal has...", "Many kinds of food", ["Only sweets", "Only chips"], "🍽️"),
  ]),
  sort("Emergency or Building Vehicle?", "Tap a vehicle, then its basket.", { Emergency: [["Ambulance", "🚑"], ["Fire engine", "🚒"], ["Police car", "🚓"]], Building: [["Crane", "🏗️"], ["Digger", "🚧"], ["Tractor", "🚜"]] }),
  quiz("Transportation Talk", "Listen and choose.", [
    q("Who helps us at road crossings?", "Traffic police", ["Baker", "Singer"], "🚦"),
    q("Which animal can carry goods?", "Bullock", ["Rabbit", "Parrot"], "🐂"),
    q("Which is a part of a car?", "Steering wheel", ["Oar", "Sail"], "🚗"),
    q("Which one goes to space?", "Space shuttle", ["Bullock cart", "Fire engine"], "🚀"),
    q("Where do buses go at night?", "Depot", ["Beach", "Library"], "🚌"),
  ]),
  quiz("Animal Kingdom Talk", "Listen and choose.", [
    q("Which comes from a dairy farm?", "Milk", ["Wool", "Honey"], "🐄"),
    q("Which is an insect?", "Butterfly", ["Cow", "Parrot"], "🦋"),
    q("How can we help birds in hot weather?", "Keep out a bowl of water", ["Chase them", "Make loud noise"], "🐦"),
    q("What does a bird use to fly?", "Wings", ["Beak", "Claws"], "🕊️"),
    q("What can living things do?", "Grow and breathe", ["Nothing at all", "Stay the same forever"], "🌱"),
  ]),
  quiz("Plant Kingdom Talk", "Listen and choose.", [
    q("Which vegetable grows under the ground?", "Beetroot", ["Tomato", "Cabbage"]),
    q("Can some plants grow under water?", "Yes", ["No"], "🌊"),
    q("What do plants need to grow?", "Water, air and sunlight", ["Toys and books", "Only darkness"], "🌱"),
    q("Which part of a cabbage do we eat?", "Leaves", ["Roots", "Flowers"], "🥬"),
    q("Which classroom thing is made from trees?", "Paper", ["Glass", "Plastic ruler"], "📄"),
  ]),
  quiz("Professions and Work Talk", "Listen and choose.", [
    q("Who makes necklaces and earrings?", "Jewellery designer", ["Pilot", "Farmer"], "💍"),
    q("Who reads the news on TV?", "Newsreader", ["Boxer", "Grocer"], "📺"),
    q("Where do we go to take out money?", "Bank", ["Park", "Jungle"], "🏦"),
    q("Why do we have rules?", "To keep everyone safe", ["To make people sad", "To stop all games"], "⚖️"),
  ]),
  quiz("Earth and Nature Talk", "Listen and choose.", [
    q("Which one makes the air dirty?", "Smoke from factories", ["Planting trees", "Riding a bicycle"], "🏭"),
    q("Which one makes water dirty?", "Throwing waste in rivers", ["Rain", "Fish swimming"], "🏞️"),
    q("Which is a natural calamity?", "Flood", ["Picnic", "Birthday"], "🌊"),
    q("Why do we need forests?", "They give us clean air and homes for animals", ["They make noise", "They make smoke"], "🌳"),
    q("How can we help keep the Earth clean?", "Use the dustbin", ["Burn the waste", "Litter the road"], "🌍"),
  ]),
  quiz("Culture and Monuments", "Listen and choose.", [
    q("Where is the Taj Mahal?", "Agra", ["Chennai", "Goa"], "🕌"),
    q("Which monument is in Delhi?", "Qutub Minar", ["Colosseum", "Eiffel Tower"]),
    q("In which country is the Colosseum?", "Italy", ["India", "Japan"]),
    q("In which country is the Christ the Redeemer statue?", "Brazil", ["Egypt", "Nepal"]),
    q("Which are the colours of our flag?", "Saffron, white and green", ["Red, blue and pink", "Black and yellow"]),
    q("Why should we look after monuments?", "They tell us about our history", ["They are for climbing", "They are for writing on"]),
  ]),
]);
