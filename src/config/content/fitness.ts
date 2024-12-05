export const fitnessContent = {
  workouts: [
    {
      id: 'yoga-basics',
      title: 'Morning Yoga Flow',
      duration: '20 min',
      level: 'Beginner',
      videoUrl: 'https://player.vimeo.com/video/289894435',
      instructor: 'Sarah Chen',
      description: 'Start your day with energizing yoga poses and stretches.',
      category: 'Yoga'
    },
    {
      id: 'hiit-cardio',
      title: 'High-Intensity Cardio Blast',
      duration: '30 min',
      level: 'Intermediate',
      videoUrl: 'https://player.vimeo.com/video/148196767',
      instructor: 'Mike Johnson',
      description: 'Intense cardio workout to boost your metabolism.',
      category: 'HIIT'
    },
    {
      id: 'pilates-core',
      title: 'Core Strength Pilates',
      duration: '25 min',
      level: 'All Levels',
      videoUrl: 'https://player.vimeo.com/video/178057019',
      instructor: 'Emma Wilson',
      description: 'Build core strength with classic Pilates exercises.',
      category: 'Pilates'
    }
  ],
  categories: ['Yoga', 'HIIT', 'Pilates', 'Strength', 'Meditation'],
  features: {
    tracking: true,
    achievements: true,
    personalTrainer: true,
    workoutPlanner: true
  }
};