# Contributing to My Portfolio

Thank you for your interest in contributing to my portfolio project! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup Instructions

1. **Fork the repository**
   ```bash
   # Fork this repository on GitHub
   # Then clone your fork
   git clone https://github.com/YOUR_USERNAME/MY_PORTFOLIO.git
   cd MY_PORTFOLIO
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new components
- **React Hooks**: Prefer functional components with hooks
- **Tailwind CSS**: Use Tailwind classes for styling
- **Framer Motion**: Use for animations and transitions
- **ESLint**: Follow the existing ESLint configuration

### File Structure

```
src/
├── components/          # Reusable UI components
├── sections/           # Main portfolio sections
│   ├── about/         # About section components
│   ├── projects/      # Project-related components
│   └── skills/        # Skills section components
├── assets/            # Images, icons, and other assets
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

### Component Guidelines

1. **Naming**: Use PascalCase for component names
2. **Props**: Define TypeScript interfaces for all props
3. **Styling**: Use Tailwind CSS classes
4. **Animations**: Use Framer Motion for smooth animations

### Example Component Structure

```typescript
import React from 'react';
import { motion } from 'framer-motion';

interface ComponentProps {
  title: string;
  description?: string;
}

const Component: React.FC<ComponentProps> = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {description && (
        <p className="mt-2 text-gray-600">{description}</p>
      )}
    </motion.div>
  );
};

export default Component;
```

## 🎨 Design Guidelines

### Color Palette

- **Primary**: Blue gradients and accents
- **Background**: Dark theme with subtle gradients
- **Text**: White and light gray for readability
- **Accents**: Use brand colors for social media icons

### Typography

- **Headings**: Use bold, modern fonts
- **Body Text**: Clean, readable fonts
- **Consistency**: Maintain consistent font sizes across sections

### Animations

- **Smooth Transitions**: Use Framer Motion for all animations
- **Performance**: Keep animations lightweight
- **Accessibility**: Ensure animations don't interfere with usability

## 📱 Mobile Responsiveness

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Responsive Design Principles

1. **Mobile-First**: Design for mobile first, then enhance for larger screens
2. **Flexible Layouts**: Use CSS Grid and Flexbox
3. **Touch-Friendly**: Ensure buttons and links are at least 44px
4. **Readable Text**: Maintain readable font sizes on all devices

### Testing Responsiveness

```bash
# Test on different screen sizes
# Use browser dev tools to test various breakpoints
```

## 🧪 Testing

### Manual Testing

1. **Cross-browser testing**: Chrome, Firefox, Safari, Edge
2. **Device testing**: Mobile, tablet, desktop
3. **Performance testing**: Lighthouse scores
4. **Accessibility testing**: Screen readers, keyboard navigation

### Automated Testing

```bash
# Run linting
npm run lint

# Check TypeScript
npm run type-check

# Build for production
npm run build
```

## 📝 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding guidelines
   - Add tests if applicable
   - Update documentation

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Provide a clear description of changes
   - Include screenshots if UI changes
   - Reference any related issues

### Commit Message Format

Use conventional commit messages:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to reproduce**: Detailed steps to reproduce the bug
3. **Expected behavior**: What you expected to happen
4. **Actual behavior**: What actually happened
5. **Environment**: Browser, OS, device information
6. **Screenshots**: If applicable

## 💡 Feature Requests

When suggesting features:

1. **Clear description**: What the feature should do
2. **Use case**: Why this feature is needed
3. **Implementation ideas**: How it could be implemented
4. **Mockups**: Visual examples if applicable

## 📚 Resources

- [React Documentation](https://reactjs.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Vite Documentation](https://vitejs.dev/guide/)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the project's coding standards

## 📄 License

This project is licensed under the MIT License. By contributing, you agree that your contributions will be licensed under the same license.

## 🙏 Acknowledgments

Thank you for contributing to this project! Your help makes it better for everyone.

---

**Happy Coding! 🚀** 