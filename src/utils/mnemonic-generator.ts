/**
 * Utility to generate mnemonic phrases from passwords.
 * Helps users remember complex passwords by creating memorable sentences.
 */

// Dictionary of common words for each character type
const characterDictionary: Record<string, string[]> = {
  // Lowercase letters
  'a': ['apple', 'anger', 'airplane', 'ant', 'arrow'],
  'b': ['banana', 'baseball', 'button', 'brother', 'bread'],
  'c': ['cat', 'coffee', 'cookie', 'camera', 'corn'],
  'd': ['dog', 'data', 'diamond', 'dolphin', 'dance'],
  'e': ['elephant', 'energy', 'eagle', 'earth', 'egg'],
  'f': ['fish', 'fire', 'forest', 'flag', 'flower'],
  'g': ['grape', 'guitar', 'glass', 'giraffe', 'gold'],
  'h': ['hat', 'home', 'honey', 'heart', 'horse'],
  'i': ['ice', 'island', 'insect', 'igloo', 'iron'],
  'j': ['jacket', 'juice', 'jam', 'jungle', 'jewel'],
  'k': ['kite', 'king', 'kangaroo', 'key', 'kitchen'],
  'l': ['lion', 'lamp', 'lake', 'lemon', 'leaf'],
  'm': ['monkey', 'moon', 'mountain', 'milk', 'map'],
  'n': ['night', 'north', 'nose', 'nest', 'noodle'],
  'o': ['ocean', 'orange', 'owl', 'opera', 'onion'],
  'p': ['paper', 'pencil', 'piano', 'pizza', 'penguin'],
  'q': ['queen', 'quiet', 'quilt', 'quick', 'question'],
  'r': ['rabbit', 'rain', 'river', 'rocket', 'rice'],
  's': ['sun', 'sand', 'star', 'snow', 'school'],
  't': ['tiger', 'tree', 'train', 'table', 'tooth'],
  'u': ['umbrella', 'unicorn', 'uniform', 'under', 'universe'],
  'v': ['violin', 'voice', 'village', 'valley', 'vase'],
  'w': ['water', 'wind', 'window', 'whale', 'wolf'],
  'x': ['xylophone', 'x-ray', 'xenon', 'xerox', 'extra'],
  'y': ['yellow', 'yawn', 'yoga', 'yoyo', 'yard'],
  'z': ['zebra', 'zero', 'zoo', 'zinc', 'zipper'],
  
  // Uppercase letters use different words
  'A': ['Avocado', 'Angel', 'Amazon', 'Atlas', 'Autumn'],
  'B': ['Buffalo', 'Beach', 'Beacon', 'Butterfly', 'Bridge'],
  'C': ['Castle', 'Cloud', 'Crystal', 'Candle', 'Coconut'],
  'D': ['Dragon', 'Desert', 'Diamond', 'Dusk', 'Dewdrop'],
  'E': ['Eagle', 'Eclipse', 'Emerald', 'Emperor', 'Echo'],
  'F': ['Falcon', 'Fountain', 'Fossil', 'Fusion', 'Feather'],
  'G': ['Galaxy', 'Garden', 'Giant', 'Griffin', 'Glacier'],
  'H': ['Harbor', 'Horizon', 'Hurricane', 'Hero', 'Honey'],
  'I': ['Island', 'Iceberg', 'Infinity', 'Iris', 'Ivory'],
  'J': ['Journey', 'Jaguar', 'Justice', 'Jubilee', 'Jade'],
  'K': ['Knight', 'Kingdom', 'Koala', 'Kaleidoscope', 'Kite'],
  'L': ['Lightning', 'Legend', 'Liberty', 'Leopard', 'Lantern'],
  'M': ['Mountain', 'Mirage', 'Mystery', 'Meteor', 'Melody'],
  'N': ['Nebula', 'Neptune', 'Navigator', 'Noble', 'Nectar'],
  'O': ['Ocean', 'Oracle', 'Olympus', 'Oasis', 'Obsidian'],
  'P': ['Phoenix', 'Planet', 'Phantom', 'Peace', 'Pyramid'],
  'Q': ['Quest', 'Quantum', 'Queen', 'Quasar', 'Quicksilver'],
  'R': ['Rainbow', 'Raven', 'River', 'Ruby', 'Renaissance'],
  'S': ['Sunrise', 'Storm', 'Sapphire', 'Serenity', 'Symphony'],
  'T': ['Thunder', 'Titan', 'Treasure', 'Twilight', 'Triumph'],
  'U': ['Universe', 'Unity', 'Ultimate', 'Utopia', 'Uranus'],
  'V': ['Volcano', 'Victory', 'Vortex', 'Valor', 'Voyage'],
  'W': ['Waterfall', 'Wizard', 'Whisper', 'Wonder', 'Wilderness'],
  'X': ['Xenon', 'Xanadu', 'Xerox', 'Xylophone', 'Xebec'],
  'Y': ['Yacht', 'Yeti', 'Yonder', 'Yield', 'Yearning'],
  'Z': ['Zenith', 'Zephyr', 'Zodiac', 'Zircon', 'Zeus'],
  
  // Numbers
  '0': ['zero', 'oxygen', 'oval', 'orbit', 'omega'],
  '1': ['one', 'onion', 'octopus', 'obelisk', 'opal'],
  '2': ['two', 'tulip', 'tuna', 'talon', 'tower'],
  '3': ['three', 'thunder', 'throne', 'thimble', 'thistle'],
  '4': ['four', 'falcon', 'fern', 'fossil', 'fountain'],
  '5': ['five', 'flame', 'flute', 'firework', 'feather'],
  '6': ['six', 'silver', 'silk', 'siren', 'sapphire'],
  '7': ['seven', 'serpent', 'seashell', 'sage', 'scepter'],
  '8': ['eight', 'emerald', 'eagle', 'earring', 'envelope'],
  '9': ['nine', 'needle', 'nebula', 'ninja', 'nugget'],
  
  // Symbols
  '!': ['exclamation', 'excited', 'exit', 'extreme', 'expressive'],
  '@': ['at', 'atlas', 'attention', 'atom', 'azure'],
  '#': ['hashtag', 'hammer', 'hurricane', 'hummingbird', 'hub'],
  '$': ['dollar', 'diamond', 'dolphin', 'daisy', 'duck'],
  '%': ['percent', 'pearl', 'parrot', 'panda', 'pebble'],
  '^': ['caret', 'candle', 'crown', 'crow', 'clover'],
  '&': ['ampersand', 'anchor', 'anteater', 'antelope', 'apricot'],
  '*': ['star', 'sparkle', 'sunshine', 'sapphire', 'stone'],
  '(': ['open', 'octopus', 'orchid', 'origin', 'orbit'],
  ')': ['close', 'coral', 'castle', 'crescent', 'cypress'],
  '-': ['dash', 'desert', 'door', 'drum', 'dandelion'],
  '_': ['underscore', 'unicorn', 'umpire', 'umbrella', 'utopia'],
  '+': ['plus', 'peacock', 'panther', 'pyramid', 'paddle'],
  '=': ['equals', 'emerald', 'eagle', 'evergreen', 'evening'],
  '[': ['bracket', 'buffalo', 'balloon', 'basket', 'beach'],
  ']': ['bracket', 'butterfly', 'bubble', 'berry', 'bamboo'],
  '{': ['brace', 'banana', 'bouquet', 'bird', 'bottle'],
  '}': ['brace', 'breeze', 'blossom', 'brook', 'beacon'],
  ';': ['semicolon', 'salmon', 'snake', 'sunrise', 'stream'],
  ':': ['colon', 'canary', 'crystal', 'cherry', 'cloud'],
  "'": ['apostrophe', 'almond', 'albatross', 'arrow', 'amber'],
  '"': ['quote', 'quail', 'quartz', 'queen', 'quiver'],
  ',': ['comma', 'castle', 'camel', 'carrot', 'cave'],
  '.': ['period', 'panda', 'peach', 'pear', 'pineapple'],
  '<': ['less', 'lotus', 'lake', 'llama', 'lily'],
  '>': ['greater', 'garden', 'gazelle', 'glacier', 'grass'],
  '/': ['slash', 'sweater', 'swan', 'seagull', 'spinach'],
  '\\': ['backslash', 'boulder', 'breeze', 'brook', 'branch'],
  '|': ['pipe', 'palace', 'pebble', 'planet', 'pearl'],
  '?': ['question', 'quartz', 'quail', 'queen', 'quiver']
};

// Transition words to make the sentence flow
const transitions = [
  'and', 'with', 'near', 'beside', 'under', 'over', 'through',
  'behind', 'after', 'before', 'without', 'like', 'as'
];

// Get a random word for a character
const getWordForChar = (char: string): string => {
  // If character isn't in our dictionary, use a placeholder
  if (!characterDictionary[char]) {
    return `[${char}]`;
  }
  
  // Get a random word from the dictionary
  const words = characterDictionary[char];
  return words[Math.floor(Math.random() * words.length)];
};

// Get a random transition word
const getTransition = (): string => {
  return transitions[Math.floor(Math.random() * transitions.length)];
};

/**
 * Creates a mnemonic sentence from a password
 * @param password The password to create a mnemonic for
 * @returns A mnemonic sentence to help remember the password
 */
export const generateMnemonic = (password: string): string => {
  if (!password || password.length === 0) {
    return "Please generate a password first.";
  }
  
  // For very short passwords, just create a simple list
  if (password.length <= 4) {
    return password
      .split('')
      .map(char => `${char} as in ${getWordForChar(char)}`)
      .join(', ');
  }
  
  // For longer passwords, create a sentence with transitions every few words
  const words: string[] = [];
  
  for (let i = 0; i < password.length; i++) {
    const char = password[i];
    words.push(getWordForChar(char));
    
    // Add transition words occasionally but not at the end
    if (i < password.length - 1 && (i + 1) % 3 === 0) {
      words.push(getTransition());
    }
  }
  
  // Capitalize first word and add a period at the end
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  
  return words.join(' ') + '.';
};

/**
 * Creates a mnemonic using the first letter of each word
 * This approach can be easier to remember for some people
 * @param password The password to create an acrostic mnemonic for
 * @returns An acrostic sentence where the first letter of each word spells the password
 */
export const generateAcrosticMnemonic = (password: string): string => {
  if (!password || password.length === 0) {
    return "Please generate a password first.";
  }
  
  // Create a sentence where the first letter of each word is a character from the password
  const words: string[] = [];
  
  for (let i = 0; i < password.length; i++) {
    const char = password[i];
    const word = getWordForChar(char);
    
    // If the word doesn't start with the character (like for symbols), prefix it
    if (word.toLowerCase().charAt(0) !== char.toLowerCase()) {
      words.push(`${word} (${char})`);
    } else {
      words.push(word);
    }
  }
  
  // Capitalize first word and add a period at the end
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  
  return words.join(' ') + '.';
};

export default {
  generateMnemonic,
  generateAcrosticMnemonic
}; 