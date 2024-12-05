export const gameContent = {
  games: [
    {
      id: 'trivia',
      title: 'Café Trivia',
      description: 'Test your knowledge across various categories',
      maxPlayers: 8,
      categories: ['General Knowledge', 'Science', 'History', 'Pop Culture'],
      features: {
        leaderboard: true,
        achievements: true,
        dailyChallenges: true
      }
    },
    {
      id: 'chess',
      title: 'Virtual Chess',
      description: 'Classic chess with multiplayer support',
      maxPlayers: 2,
      features: {
        matchmaking: true,
        ranking: true,
        tutorials: true
      }
    },
    {
      id: 'word-chain',
      title: 'Word Chain',
      description: 'Create words using the last letter of the previous word',
      maxPlayers: 6,
      features: {
        dictionary: true,
        timeLimit: true,
        wordValidation: true
      }
    }
  ],
  categories: ['Board Games', 'Trivia', 'Word Games', 'Strategy'],
  features: {
    tournaments: true,
    rewards: true,
    socialPlay: true,
    spectatorMode: true
  }
};