
import { Project, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: 'work' },
  { label: 'About', href: 'about' },
  { label: 'Contact', href: 'contact' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Kanchanjunga Chemicals',
    category: 'Online Shopping',
    description: 'Born in Nepal, committed to purity and cleanliness since 2075 BS.',
    longDescription: 'At Kanchanjunga Chemicals, our mission is to provide high-quality, effective, and safe cleaning solutions that enhance hygiene standards across homes and businesses in Nepal. We believe in the power of purity, inspired by the majestic Kanchanjunga mountain itself. Deliver industrial-grade effectiveness for every home. Innovate with eco-friendly ingredients. Support local manufacturing and employment. Find us: https://kanchanjungachemicals.pages.dev/#/',
    imageUrl: 'https://raw.githubusercontent.com/SanjelNirmal/onlyimage/refs/heads/main/Screenshot%202026-02-11%20211448.png',
    client: 'Ranjendra Sanjel',
    year: '2024'
  },
  {
    id: '2',
    title: 'S Squares Cosmetics Hub',
    category: 'Online Shopping',
    description: 'Your trusted partner in beauty and self-care. We believe everyone deserves to feel confident and beautiful in their own skin.',
    longDescription: 'Founded with a passion for quality cosmetics and customer satisfaction, S Square Cosmetics Hub has been serving beauty enthusiasts for years. We carefully curate our collection to bring you only the finest products from trusted brands. Our mission is to make premium cosmetics accessible to everyone, providing an exceptional shopping experience both online and in-store. We are committed to authenticity, quality, and customer service excellence.Find us: https://ssquarecosmeticshub.pages.dev/',
    imageUrl: 'https://raw.githubusercontent.com/SanjelNirmal/onlyimage/refs/heads/main/Screenshot%202026-02-11%20212218.png',
    client: 'Safalta and Sudip Dahal',
    year: '2025'
  },
  {
    id: '3',
    title: 'Personal Website',
    category: 'Personal Identity',
    description: 'Namaste. I am Nirmal Sanjel, a BCA student, aspiring frontend developer, and a passionate learner exploring the world of web design and technology.',
    longDescription: 'I’m currently building my skills in HTML, CSS, JavaScript, and modern frontend tools, with a growing interest in UI/UX design and how clean, meaningful interfaces can improve everyday digital experiences. Find us: https://nirmal-website.pages.dev/',
    imageUrl: 'https://raw.githubusercontent.com/SanjelNirmal/onlyimage/refs/heads/main/Screenshot%202026-02-11%20212733.png',
    client: 'Nirmal Sanjel',
    year: '2024'
  },

];
