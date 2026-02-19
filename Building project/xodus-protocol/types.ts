
export enum Sector {
  LANDING = 'landing',
  COMMAND = 'command',
  REGISTRATION = 'registration',
  DOSSIER = 'dossier',
  LOBBY = 'lobby',
  FORGE = 'forge',
  LOUNGE = 'lounge',
  DEN = 'den',
  SAFEHOUSE = 'safehouse',
  PROFILE = 'profile',
  HUD = 'hud',
  MASTERY = 'mastery',
  RESULT = 'result',
  WALLET = 'wallet',
  ARCADE = 'arcade',
  MARKET = 'market'
}

export interface Operative {
  id: string;
  name: string;
  role: string;
  perk: string;
  faction: 'Rebels' | 'Corporations' | 'Undercroft';
  avatar: string;
  stats: {
    stealth: number;
    tech: number;
    combat: number;
  };
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: string;
  risk: 'Low' | 'Medium' | 'High' | 'Critical';
  image: string;
}

export interface MapEvent {
  id: string;
  type: 'hostile' | 'distress' | 'intel';
  x: number; // percentage
  y: number; // percentage
  label: string;
  ttl: number; // frames/seconds remaining
}

export interface GameState {
  currentSector: Sector;
  activeEvents: MapEvent[];
  scanRotation: number;
  operatives: Operative[];
  inventory: any[]; // To be detailed
  resources: {
    xodus: number;
    scrap: number;
    reputation: number;
  };
}
