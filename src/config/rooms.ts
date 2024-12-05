export const defaultRooms = {
  business: {
    title: 'Business Hub',
    music: [
      {
        title: 'Ambient Work Music',
        url: 'https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3',
        artist: 'Ambient Works'
      },
      {
        title: 'Soft Jazz',
        url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73f2b.mp3',
        artist: 'Jazz Collective'
      }
    ],
    background: 'bg-gray-100',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-people-working-in-a-modern-office-space-32357-large.mp4',
    entryFee: 10
  },
  friends: {
    title: 'Friends Corner',
    music: [
      {
        title: 'Happy Acoustic',
        url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        artist: 'Acoustic Band'
      },
      {
        title: 'Summer Vibes',
        url: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_4c66c47cdc.mp3',
        artist: 'Chill Beats'
      }
    ],
    background: 'bg-blue-50',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-friends-having-fun-at-a-casual-party-4637-large.mp4',
    entryFee: 5
  },
  fitness: {
    title: 'Fitness Zone',
    music: [
      {
        title: 'Workout Mix',
        url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8f4b7f095.mp3',
        artist: 'Fitness Beats'
      }
    ],
    background: 'bg-green-50',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-at-home-4899-large.mp4',
    entryFee: 15
  },
  books: {
    title: 'Book Club',
    music: [
      {
        title: 'Reading Ambience',
        url: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe5e485.mp3',
        artist: 'Ambient Sounds'
      }
    ],
    background: 'bg-amber-50',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-book-overhead-shot-43529-large.mp4',
    entryFee: 8
  },
  photos: {
    title: 'Photography Hub',
    music: [
      {
        title: 'Creative Vibes',
        url: 'https://cdn.pixabay.com/download/audio/2022/09/10/audio_8c8f3a81d8.mp3',
        artist: 'Ambient Artists'
      }
    ],
    background: 'bg-purple-50',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-pictures-on-the-street-34489-large.mp4',
    entryFee: 12
  },
  games: {
    title: 'Gaming Lounge',
    music: [
      {
        title: 'Game Soundtrack',
        url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8f4b7f095.mp3',
        artist: 'Game Audio'
      }
    ],
    background: 'bg-red-50',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-gaming-setup-with-headphones-and-keyboard-in-a-dark-room-41740-large.mp4',
    entryFee: 20
  },
  art: {
    title: 'Art Studio',
    music: [
      {
        title: 'Creative Flow',
        url: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_4c66c47cdc.mp3',
        artist: 'Ambient Artists'
      }
    ],
    background: 'bg-pink-50',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-woman-drawing-in-a-notebook-with-coffee-42692-large.mp4',
    entryFee: 10
  }
} as const;