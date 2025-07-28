export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  github: string;
  demo?: string;
  stars?: number;
  forks?: number;
  language?: string;
  lastUpdated?: string;
  isFromGitHub?: boolean;
}

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React and TypeScript. Features smooth animations, dark mode, and a dynamic skills section.',
    image: '/assets/portfolio.png',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/raunak0400/portfolio',
    demo: 'https://raunak0400.github.io/portfolio',
  },
  {
    id: '2',
    title: 'E-commerce Store',
    description: 'A full-featured e-commerce application with shopping cart, user authentication, payment integration, and admin dashboard.',
    image: '/assets/ecommerce.png',
    techStack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    github: 'https://github.com/raunak0400/ecommerce-store',
    demo: 'https://ecommerce.raunak0400.com',
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: '/assets/task-manager.png',
    techStack: ['React', 'TypeScript', 'Socket.io', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/raunak0400/task-manager',
    demo: 'https://task-manager.raunak0400.com',
  },
  {
    id: '4',
    title: 'Weather Dashboard',
    description: 'A weather application that displays current weather, forecasts, and interactive maps. Includes location-based weather alerts.',
    image: '/assets/weather-app.png',
    techStack: ['React', 'OpenWeather API', 'Chart.js', 'Geolocation API'],
    github: 'https://github.com/raunak0400/weather-dashboard',
    demo: 'https://weather.raunak0400.com',
  },
  {
    id: '5',
    title: 'Social Media Clone',
    description: 'A social media platform with user profiles, posts, comments, likes, and real-time notifications. Built with modern web technologies.',
    image: '/assets/social-media.png',
    techStack: ['React', 'Firebase', 'Material-UI', 'Cloud Storage'],
    github: 'https://github.com/raunak0400/social-media-clone',
    demo: 'https://social.raunak0400.com',
  },
  {
    id: '6',
    title: 'AI Chat Application',
    description: 'An AI-powered chat application that integrates with OpenAI API. Features conversation history, multiple AI models, and code highlighting.',
    image: '/assets/ai-chat.png',
    techStack: ['React', 'OpenAI API', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/raunak0400/ai-chat-app',
    demo: 'https://ai-chat.raunak0400.com',
  },
]; 