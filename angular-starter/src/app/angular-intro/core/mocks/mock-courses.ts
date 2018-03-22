import { Course } from '../entities';

export const COURSES: Course[] = [
  {
    id: 11,
    name: 'Mr. Nice',
    duration: { hours: 12, minuts: 20,  seconds: 0 },
    tags: ['mock-course', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
    isAccept: true,
  },
  {
    id: 12,
    name: 'Narco',
    duration: { hours: 1, minuts: 30,  seconds: 25 },
    tags: ['mock-course', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
    isAccept: false,
  },
  {
    id: 13,
    name: 'Bombasto',
    duration: { hours: 2, minuts: 50,  seconds: 10 },
    tags: ['mock-course', 'tag1'],
    isAccept: true,
  },
  {
    id: 14,
    name: 'Celeritas',
    duration: { hours: 5, minuts: 5,  seconds: 8 },
    tags: ['mock-course', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
    isAccept: false,
  },
  {
    id: 15,
    name: 'Magneta',
    duration: { hours: 0, minuts: 0,  seconds: 0 },
    tags: ['mock-course', 'tag1', 'tag2', 'tag3', 'tag4'],
    isAccept: false,
  },
  {
    id: 16,
    name: 'RubberMan',
    duration: { hours: 0, minuts: 0,  seconds: 0 },
    tags: ['mock-course', 'tag1', 'tag2'],
    isAccept: false,
  },
  {
    id: 17,
    name: 'Dynama',
    duration: { hours: 0, minuts: 0,  seconds: 0 },
    tags: ['mock-course', 'tag1', 'tag2'],
    isAccept: false,
  },
  {
    id: 18,
    name: 'Dr IQ',
    duration: { hours: 0, minuts: 0,  seconds: 0 },
    tags: ['mock-course', 'tag1', 'tag2', 'tag3', 'tag4'],
    isAccept: false,
  },
  {
    id: 19,
    name: 'Magma',
    duration: { hours: 0, minuts: 0,  seconds: 0 },
    tags: ['mock-course', 'tag1', 'tag2', 'tag3'],
    isAccept: false,
  },
  {
    id: 20,
    name: 'Tornado',
    duration: { hours: 0, minuts: 0,  seconds: 0 },
    tags: ['mock-course', 'tag1', 'tag2', 'tag3', 'tag4'],
    isAccept: true,
  },
];
