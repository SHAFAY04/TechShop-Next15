import { animals, colors, Config } from "unique-names-generator";

const techAdjectives = [
    'Agile', 'Binary', 'Cloud', 'Cyber', 'Digital', 'Dynamic', 'Electric', 'Ether',
    // ... more tech adjectives
  ];
  
  const techNouns = [
    'Algo', 'App', 'Bit', 'Bot', 'Byte', 'Chip', 'Code', 'Core', 'Data',
    // ... more tech nouns
  ];
  
  export const customTechConfig: Config = {
    dictionaries: [colors, animals, techAdjectives, techNouns], // Combine built-in and custom
    separator: '',
    length: 3, // e.g., 'BluePandaBit'
    style: 'capital',
  };