export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

export const eventsSeed: EventItem[] = [
  {
    id: 'e_1',
    title: 'ALX Community Meetup',
    date: 'Saturday',
    time: '10:00',
    location: 'Online (Zoom)',
    description: 'Meet fellow learners, share progress, and get feedback on your projects.',
  },
  {
    id: 'e_2',
    title: 'React Native Study Jam',
    date: 'Next week',
    time: '18:30',
    location: 'Addis Ababa (Hub)',
    description: 'Pair-programming session: navigation, forms, and building clean UI components.',
  },
];

