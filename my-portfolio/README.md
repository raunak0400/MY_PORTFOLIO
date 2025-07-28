# 🚀 Raunak Kumar Jha - Personal Portfolio

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-yellow.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23.9-purple.svg)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A modern, responsive, and interactive personal portfolio website showcasing skills, projects, and achievements with stunning animations and professional design.

## 🌟 Live Demo

**Visit the live portfolio:** [raunakportfoliowebsite.vercel.app](https://raunakportfoliowebsite.vercel.app)

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎨 Design & UI](#-design--ui)
- [🛠️ Technologies Used](#️-technologies-used)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔧 Configuration](#-configuration)
- [📱 Responsive Design](#-responsive-design)
- [🎯 Key Sections](#-key-sections)
- [🔗 API Integration](#-api-integration)
- [🎨 Customization](#-customization)
- [📦 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

## ✨ Features

### 🎯 Core Features
- **Modern React Architecture** - Built with React 19 and TypeScript for type safety
- **Responsive Design** - Fully responsive across all devices and screen sizes
- **Smooth Animations** - Powered by Framer Motion for fluid interactions
- **Dark Theme** - Elegant dark theme with glassmorphism effects
- **Performance Optimized** - Fast loading with Vite build tool
- **SEO Friendly** - Optimized for search engines

### 🎨 Interactive Elements
- **Animated Backgrounds** - Dynamic particle systems and gradient animations
- **Smooth Scrolling** - Seamless navigation between sections
- **Hover Effects** - Interactive hover animations on all elements
- **Loading States** - Professional loading indicators
- **Confetti Effects** - Celebration animations for user interactions

### 📊 Dynamic Content
- **GitHub Integration** - Real-time project data from GitHub API
- **Skills Visualization** - Interactive skill progress bars and categories
- **Contribution Graph** - GitHub contribution calendar integration
- **Contact Form** - Functional contact form with email delivery
- **Resume Download** - Direct resume download with confetti effect

### 🔧 Technical Features
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code quality and consistency
- **Vercel Deployment** - Optimized for Vercel hosting
- **API Routes** - Serverless functions for backend functionality

## 🎨 Design & UI

### Design Philosophy
- **Minimalist Approach** - Clean, uncluttered design focusing on content
- **Glassmorphism Effects** - Modern translucent elements with backdrop blur
- **Gradient Accents** - Subtle gradients for visual appeal
- **Typography** - Professional font hierarchy and spacing
- **Color Scheme** - Dark theme with cyan, blue, and purple accents

### Animation System
- **Framer Motion** - Advanced animation library for smooth transitions
- **Staggered Animations** - Sequential element animations
- **Parallax Effects** - Depth and movement in background elements
- **Micro-interactions** - Subtle animations for user feedback
- **Performance Optimized** - 60fps animations with proper throttling

## 🛠️ Technologies Used

### Frontend
- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 7.0.4** - Fast build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Framer Motion 12.23.9** - Animation library
- **React Icons 5.5.0** - Icon library

### Backend & APIs
- **Vercel API Routes** - Serverless functions
- **Resend 4.7.0** - Email delivery service
- **GitHub API** - Dynamic project data
- **React GitHub Calendar 4.5.9** - Contribution visualization

### Development Tools
- **ESLint 9.30.1** - Code linting
- **PostCSS 8.5.6** - CSS processing
- **Autoprefixer 10.4.21** - CSS vendor prefixing
- **TypeScript ESLint 8.35.1** - TypeScript linting

### Additional Libraries
- **Canvas Confetti 1.9.3** - Celebration effects
- **React Scroll 1.9.3** - Smooth scrolling
- **TSParticles 2.12.0** - Particle system

## 📁 Project Structure

```
my-portfolio/
├── 📁 api/                    # Vercel API routes
│   ├── contact.js            # Contact form email handler
│   └── test.js               # API testing endpoint
├── 📁 public/                # Static assets
│   ├── assets/               # Images, PDFs, logos
│   └── vite.svg              # Vite logo
├── 📁 src/                   # Source code
│   ├── 📁 components/        # Reusable components
│   │   ├── Navbar.tsx       # Navigation bar
│   │   └── Footer.tsx       # Footer component
│   ├── 📁 sections/         # Main page sections
│   │   ├── Hero.tsx         # Hero section
│   │   ├── About.tsx        # About section
│   │   ├── Skills.tsx       # Skills section
│   │   ├── Projects.tsx     # Projects section
│   │   ├── Contact.tsx      # Contact section
│   │   ├── Education.tsx    # Education timeline
│   │   └── 📁 about/        # About section components
│   │       ├── AnimatedBackground.tsx
│   │       ├── ProfileImage.tsx
│   │       ├── ResumeButton.tsx
│   │       └── SocialIcons.tsx
│   ├── 📁 sections/skills/  # Skills section components
│   │   ├── SkillCard.tsx
│   │   ├── SkillCategoryTabs.tsx
│   │   ├── SkillGrid.tsx
│   │   ├── SkillProgress.tsx
│   │   └── skillsData.ts
│   ├── 📁 sections/projects/ # Projects section components
│   │   ├── ProjectCard.tsx
│   │   ├── GitHubProjectCard.tsx
│   │   ├── ProjectFilters.tsx
│   │   ├── githubApi.ts
│   │   └── projectsData.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   ├── index.css            # Global styles
│   └── types/               # TypeScript type definitions
├── package.json             # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment configuration
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/raunak0400/MY_PORTFOLIO.git
   cd MY_PORTFOLIO
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   echo "RESEND_API_KEY=your_resend_api_key_here" > .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# TypeScript
npm run type-check   # Check TypeScript types
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Email Service (Resend)
RESEND_API_KEY=re_your_api_key_here

# GitHub API (Optional)
GITHUB_TOKEN=your_github_token_here
```

### Personalization

1. **Update Personal Information**
   - Edit `src/sections/About.tsx` for personal details
   - Modify `src/sections/Contact.tsx` for contact information
   - Update `src/sections/Education.tsx` for education timeline

2. **Customize Skills**
   - Edit `src/sections/skills/skillsData.ts` for skills data
   - Modify skill categories and progress levels

3. **Add Projects**
   - Update `src/sections/projects/projectsData.ts` for static projects
   - Configure GitHub integration in `src/sections/projects/githubApi.ts`

4. **Styling**
   - Modify `tailwind.config.js` for theme customization
   - Update `src/index.css` for global styles

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Features
- **Mobile-first approach**
- **Touch-friendly interactions**
- **Optimized images**
- **Fast loading on mobile networks**

## 🎯 Key Sections

### 1. Hero Section
- **Animated background** with particle effects
- **Dynamic typing** effect for name and title
- **Call-to-action** buttons
- **Smooth scroll** navigation

### 2. About Section
- **Personal information** with animated profile image
- **Social media links** with hover effects
- **Professional summary** with gradient text
- **Resume download** with confetti animation

### 3. Education Section
- **Timeline layout** with animated cards
- **Certificate downloads** for achievements
- **Institution details** with icons
- **Responsive design** for all screen sizes

### 4. Skills Section
- **Interactive tabs** for skill categories
- **Progress bars** with animations
- **Skill cards** with hover effects
- **Category filtering** system

### 5. Projects Section
- **GitHub integration** for real-time data
- **Project filtering** by technology
- **Live demos** and source code links
- **Technology badges** for each project

### 6. Contact Section
- **Functional contact form** with validation
- **Email delivery** via Resend API
- **Success/error states** with animations
- **Social media links** with icons

### 7. Footer
- **Social media links** with brand colors
- **Copyright information**
- **Back to top** button
- **Legal links** (Privacy Policy, Terms)

## 🔗 API Integration

### Contact Form API
- **Endpoint**: `/api/contact`
- **Method**: POST
- **Features**: Email validation, spam protection, error handling

### GitHub API
- **Projects**: Real-time repository data
- **Contributions**: Activity calendar
- **Profile**: User information and stats

### Email Service (Resend)
- **Reliable delivery** to Gmail
- **HTML email templates**
- **Reply-to functionality**
- **Error handling** and logging

## 🎨 Customization

### Colors
```css
/* Primary Colors */
--cyan: #06b6d4
--blue: #2563eb
--purple: #a78bfa
--pink: #f472b6

/* Gradients */
--gradient-primary: linear-gradient(90deg, #06b6d4, #2563eb, #a78bfa, #f472b6)
--gradient-secondary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
```

### Animations
- **Staggered entrance** animations
- **Hover effects** with scale and color changes
- **Parallax scrolling** effects
- **Micro-interactions** for user feedback

### Typography
- **Font Family**: Montserrat, Sora
- **Font Weights**: 400, 500, 600, 700, 900
- **Responsive sizing** with Tailwind classes

## 📦 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Environment Variables**
   - Set `RESEND_API_KEY` in Vercel dashboard
   - Configure domain settings

### Other Platforms

#### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

#### GitHub Pages
```bash
npm run build
# Push dist/ folder to gh-pages branch
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines
- Follow **TypeScript** best practices
- Use **ESLint** for code quality
- Write **responsive** components
- Add **animations** for better UX
- Test on **multiple devices**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Raunak Kumar Jha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Raunak Kumar Jha**

- **GitHub**: [@raunak0400](https://github.com/raunak0400)
- **LinkedIn**: [Raunak Kumar Jha](https://linkedin.com/in/raunak0400)
- **Instagram**: [@raunak.____.07](https://instagram.com/raunak.____.07)
- **Twitter**: [@raunak0400](https://twitter.com/raunak0400)
- **LeetCode**: [raunak0400](https://leetcode.com/raunak0400)
- **Email**: raunakkumarjha233@gmail.com

### About the Developer
- **Location**: Gandhinagar, Gujarat, India
- **Education**: Bachelor's in Computer Science and Engineering
- **Institution**: Gandhinagar Institute of Technology
- **Minor Degree**: Computer Science at IIT Guwahati
- **Passion**: Full-stack development, AI/ML, and open source

---

## 🌟 Acknowledgments

- **Framer Motion** for amazing animations
- **Tailwind CSS** for utility-first styling
- **Vercel** for seamless deployment
- **Resend** for reliable email delivery
- **GitHub** for project hosting and API
- **React Icons** for beautiful icons
- **Canvas Confetti** for celebration effects

---

<div align="center">

**Made with ❤️ by Raunak Kumar Jha**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/raunak0400)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/raunak0400)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/raunak.____.07)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/raunak0400)

</div>
