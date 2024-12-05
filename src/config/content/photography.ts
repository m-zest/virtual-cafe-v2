export const photographyContent = {
  galleries: [
    {
      id: 'nature',
      title: 'Nature Photography',
      description: 'Stunning landscapes and wildlife captures',
      photos: [
        {
          id: 'nature-1',
          title: 'Mountain Sunrise',
          photographer: 'John Smith',
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
          location: 'Swiss Alps'
        },
        {
          id: 'nature-2',
          title: 'Ocean Waves',
          photographer: 'Maria Garcia',
          url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0',
          location: 'Pacific Coast'
        }
      ]
    },
    {
      id: 'urban',
      title: 'Urban Photography',
      description: 'City life and architecture',
      photos: [
        {
          id: 'urban-1',
          title: 'City Lights',
          photographer: 'Alex Wong',
          url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785',
          location: 'Tokyo, Japan'
        },
        {
          id: 'urban-2',
          title: 'Street Art',
          photographer: 'Sophie Chen',
          url: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5',
          location: 'Melbourne, Australia'
        }
      ]
    }
  ],
  categories: ['Nature', 'Urban', 'Portrait', 'Street', 'Abstract'],
  features: {
    workshops: true,
    photoContests: true,
    equipmentReviews: true,
    tutorials: true
  }
};