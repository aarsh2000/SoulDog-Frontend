import faker from 'faker';
import { fake } from 'faker/locale/zh_TW';
// utils
import { mockImgCover } from '../utils/mockImages';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'Whiteboard Templates By Industry Leaders',
  'Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!',
  'Designify Agency Landing Page Design',
  '✨What is Done is Done ✨',
  'Fresh Prince',
  'Six Socks Studio',
  'vincenzo de cotiis’ crossing over showcases a research on contamination',
  'Simple, Great Looking Animations in Your Project | Video Tutorial',
  '40 Free Serif Fonts for Digital Designers',
  'Examining the Evolution of the Typical Web Design Client',
  'Katie Griffin loves making that homey art',
  'The American Dream retold through mid-century railroad graphics',
  'Illustration System Design',
  'CarZio-Delivery Driver App SignIn/SignUp',
  'How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna',
  'Tylko Organise effortlessly -3D & Motion Design',
  'RAYO ?? A expanded visual arts festival identity',
  'Anthony Burrill and Wired mag’s Andrew Diprose discuss how they made January’s Change Everything cover',
  'Inside the Mind of Samuel Day',
  'Portfolio Review: Is This Portfolio Too Creative?',
  'Akkers van Margraten',
  'Gradient Ticket icon',
  'Here’s a Dyson motorcycle concept that doesn’t ‘suck’!',
  'How to Animate a SVG with border-image'
];

const posts = [...Array(9)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover:
    'data:image/png;base64,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',
  title: `Adoption of ${faker.name.findName()}, ${Math.max(16, Math.round(Math.random() * 100))}`,
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.findName(),
    avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`
  }
}));

export default posts;
