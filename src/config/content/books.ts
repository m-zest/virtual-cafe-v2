export const bookContent = {
  ebooks: [
    {
      id: 'pride-prejudice',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      coverUrl: 'https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg',
      downloadUrl: 'https://www.gutenberg.org/ebooks/1342.epub.images',
      description: 'A classic novel of manners, marriage, and social status.',
      genre: 'Classic Literature'
    },
    {
      id: 'sherlock-holmes',
      title: 'The Adventures of Sherlock Holmes',
      author: 'Arthur Conan Doyle',
      coverUrl: 'https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg',
      downloadUrl: 'https://www.gutenberg.org/ebooks/1661.epub.images',
      description: 'A collection of twelve detective stories.',
      genre: 'Mystery'
    },
    {
      id: 'frankenstein',
      title: 'Frankenstein',
      author: 'Mary Shelley',
      coverUrl: 'https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg',
      downloadUrl: 'https://www.gutenberg.org/ebooks/84.epub.images',
      description: 'A Gothic novel about ambition, science, and creation.',
      genre: 'Gothic Fiction'
    }
  ],
  genres: ['Classic Literature', 'Mystery', 'Science Fiction', 'Poetry', 'Philosophy'],
  features: {
    bookClub: true,
    discussions: true,
    recommendations: true,
    readingChallenge: true
  }
};