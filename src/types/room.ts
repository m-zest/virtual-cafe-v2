export interface Room {
  id: string;
  title: string;
  description: string;
  type: 'social' | 'business' | 'entertainment' | 'learning';
  capacity: number;
  isPrivate: boolean;
  password?: string;
  ownerId: string;
  features: {
    hasVideoChat: boolean;
    hasAudioChat: boolean;
    hasTextChat: boolean;
    hasWhiteboard: boolean;
    hasScreenShare: boolean;
    hasGames: boolean;
  };
  theme: {
    background: string;
    music: {
      playlist: string[];
      currentTrack: number;
    };
    ambientSounds: string[];
    decor: {
      wallColor: string;
      furniture: string;
      lighting: string;
    };
  };
  activities: {
    games: string[];
    events: Event[];
  };
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  type: 'music' | 'talk' | 'game' | 'workshop';
  host: string;
  participants: string[];
  maxParticipants?: number;
}