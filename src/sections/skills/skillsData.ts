export interface Skill {
  name: string;
  icon: string;
  level: number; // 0-100
  category: string;
  color: string;
  description?: string;
}

export const skillsData: Skill[] = [
  // Programming Languages
  {
    name: "C",
    icon: "c",
    level: 93,
    category: "Programming Languages",
    color: "#A8B9CC",
    description: "System programming and embedded development"
  },
  {
    name: "C++",
    icon: "cpp",
    level: 95,
    category: "Programming Languages",
    color: "#00599C",
    description: "Object-oriented programming and system development"
  },
  {
    name: "C#",
    icon: "csharp",
    level: 60,
    category: "Programming Languages",
    color: "#239120",
    description: "Microsoft ecosystem development"
  },
  {
    name: "Python",
    icon: "python",
    level: 96,
    category: "Programming Languages",
    color: "#3776AB",
    description: "Backend development, automation, and AI/ML"
  },
  {
    name: "JavaScript",
    icon: "javascript",
    level: 88,
    category: "Programming Languages",
    color: "#F7DF1E",
    description: "ES6+ features and modern JavaScript patterns"
  },
  {
    name: "TypeScript",
    icon: "typescript",
    level: 71,
    category: "Programming Languages",
    color: "#3178C6",
    description: "Type-safe JavaScript development"
  },
  {
    name: "Go",
    icon: "go",
    level: 56,
    category: "Programming Languages",
    color: "#00ADD8",
    description: "Concurrent programming and microservices"
  },
  {
    name: "Kotlin",
    icon: "kotlin",
    level: 60,
    category: "Programming Languages",
    color: "#7F52FF",
    description: "Android development and JVM ecosystem"
  },
  {
    name: "PowerShell",
    icon: "powershell",
    level: 97,
    category: "Programming Languages",
    color: "#5391FE",
    description: "Windows automation and scripting"
  },

  // Frontend Development
  {
    name: "Angular",
    icon: "angular",
    level: 60,
    category: "Frontend Development",
    color: "#DD0031",
    description: "Enterprise frontend framework"
  },
  {
    name: "AngularJS",
    icon: "angularjs",
    level: 70,
    category: "Frontend Development",
    color: "#E23237",
    description: "Legacy Angular framework"
  },
  {
    name: "Bootstrap",
    icon: "bootstrap",
    level: 70,
    category: "Frontend Development",
    color: "#7952B3",
    description: "CSS framework for responsive design"
  },
  {
    name: "CSS3",
    icon: "css3",
    level: 89,
    category: "Frontend Development",
    color: "#1572B6",
    description: "Advanced styling with Flexbox and Grid"
  },
  {
    name: "Express.js",
    icon: "express",
    level: 76,
    category: "Frontend Development",
    color: "#000000",
    description: "Web application framework for Node.js"
  },
  {
    name: "HTML5",
    icon: "html5",
    level: 85,
    category: "Frontend Development",
    color: "#E34F26",
    description: "Semantic markup and accessibility"
  },
  {
    name: "Next.js",
    icon: "nextjs",
    level: 60,
    category: "Frontend Development",
    color: "#000000",
    description: "React framework for production"
  },
  {
    name: "React",
    icon: "react",
    level: 94,
    category: "Frontend Development",
    color: "#61DAFB",
    description: "Building interactive UIs with hooks and modern patterns"
  },
  {
    name: "Tailwind CSS",
    icon: "tailwind",
    level: 91,
    category: "Frontend Development",
    color: "#06B6D4",
    description: "Utility-first CSS framework"
  },

  // Backend Development
  {
    name: "Flask",
    icon: "flask",
    level: 96,
    category: "Backend Development",
    color: "#000000",
    description: "Lightweight Python web framework"
  },
  {
    name: "NestJS",
    icon: "nestjs",
    level: 70,
    category: "Backend Development",
    color: "#E0234E",
    description: "Progressive Node.js framework"
  },
  {
    name: "Node.js",
    icon: "nodejs",
    level: 89,
    category: "Backend Development",
    color: "#339933",
    description: "Server-side JavaScript development"
  },
  {
    name: ".NET",
    icon: "dotnet",
    level: 45,
    category: "Backend Development",
    color: "#512BD4",
    description: "Microsoft development platform"
  },

  // AI/ML
  {
    name: "PyTorch",
    icon: "pytorch",
    level: 69,
    category: "AI/ML",
    color: "#EE4C2C",
    description: "Deep learning framework"
  },
  {
    name: "NumPy",
    icon: "numpy",
    level: 58,
    category: "AI/ML",
    color: "#013243",
    description: "Numerical computing library"
  },
  {
    name: "Matplotlib",
    icon: "matplotlib",
    level: 67,
    category: "AI/ML",
    color: "#11557C",
    description: "Data visualization library"
  },

  // Databases
  {
    name: "MongoDB",
    icon: "mongodb",
    level: 92,
    category: "Databases",
    color: "#47A248",
    description: "NoSQL database management"
  },
  {
    name: "MySQL",
    icon: "mysql",
    level: 92,
    category: "Databases",
    color: "#4479A1",
    description: "Database design and optimization"
  },
  {
    name: "PostgreSQL",
    icon: "postgresql",
    level: 70,
    category: "Databases",
    color: "#336791",
    description: "Relational database management"
  },
  {
    name: "Cassandra",
    icon: "cassandra",
    level: 48,
    category: "Databases",
    color: "#1D4ED8",
    description: "Distributed NoSQL database"
  },

  // Data Visualization
  {
    name: "D3.js",
    icon: "d3",
    level: 60,
    category: "Data Visualization",
    color: "#F9A03C",
    description: "Data-driven documents"
  },
  {
    name: "Plotly",
    icon: "plotly",
    level: 68,
    category: "Data Visualization",
    color: "#3F4F75",
    description: "Interactive plotting library"
  },
  {
    name: "Google Charts",
    icon: "googlecharts",
    level: 70,
    category: "Data Visualization",
    color: "#4285F4",
    description: "Google's charting library"
  },

  // DevOps
  {
    name: "AWS",
    icon: "aws",
    level: 76,
    category: "DevOps",
    color: "#FF9900",
    description: "Amazon Web Services cloud platform"
  },
  {
    name: "Azure",
    icon: "azure",
    level: 56,
    category: "DevOps",
    color: "#0078D4",
    description: "Microsoft cloud platform"
  },
  {
    name: "Docker",
    icon: "docker",
    level: 89,
    category: "DevOps",
    color: "#2496ED",
    description: "Containerization and deployment"
  },
  {
    name: "Git",
    icon: "git",
    level: 90,
    category: "DevOps",
    color: "#F05032",
    description: "Version control and collaboration"
  },
  {
    name: "GitHub",
    icon: "github",
    level: 98,
    category: "DevOps",
    color: "#181717",
    description: "Code hosting and collaboration"
  },
  {
    name: "GCP",
    icon: "gcp",
    level: 80,
    category: "DevOps",
    color: "#4285F4",
    description: "Google Cloud Platform"
  },
  {
    name: "Jenkins",
    icon: "jenkins",
    level: 60,
    category: "DevOps",
    color: "#D24939",
    description: "Continuous integration and deployment"
  },
  {
    name: "Kubernetes",
    icon: "kubernetes",
    level: 80,
    category: "DevOps",
    color: "#326CE5",
    description: "Container orchestration platform"
  },

  // Backend as Service (BaaS)
  {
    name: "Firebase",
    icon: "firebase",
    level: 87,
    category: "BaaS",
    color: "#FFCA28",
    description: "Google's mobile and web app platform"
  },
  {
    name: "Netlify",
    icon: "netlify",
    level: 90,
    category: "BaaS",
    color: "#00C7B7",
    description: "Web development platform"
  },
  {
    name: "Vercel",
    icon: "vercel",
    level: 92,
    category: "BaaS",
    color: "#000000",
    description: "Deployment platform for frontend"
  },

  // Frameworks
  {
    name: "Django",
    icon: "django",
    level: 92,
    category: "Frameworks",
    color: "#092E20",
    description: "High-level Python web framework"
  },
  {
    name: "FastAPI",
    icon: "fastapi",
    level: 72,
    category: "Frameworks",
    color: "#009688",
    description: "Modern Python web framework"
  },

  // Software
  {
    name: "Figma",
    icon: "figma",
    level: 89,
    category: "Software",
    color: "#F24E1E",
    description: "UI/UX design and prototyping"
  },
  {
    name: "Framer",
    icon: "framer",
    level: 90,
    category: "Software",
    color: "#0055FF",
    description: "Interactive design tool"
  },
  {
    name: "VS Code",
    icon: "vscode",
    level: 99,
    category: "Software",
    color: "#007ACC",
    description: "Primary development environment"
  },
  {
    name: "Cursor",
    icon: "cursor",
    level: 99,
    category: "Software",
    color: "#00FF00",
    description: "AI-powered code editor"
  },
  {
    name: "Blender",
    icon: "blender",
    level: 87,
    category: "Software",
    color: "#F5792A",
    description: "3D modeling and animation"
  },

  // Testing
  {
    name: "Pytest",
    icon: "pytest",
    level: 67,
    category: "Testing",
    color: "#0A9EDC",
    description: "Python testing framework"
  },
  {
    name: "Postman",
    icon: "postman",
    level: 95,
    category: "Testing",
    color: "#FF6C37",
    description: "API development and testing"
  }
];

export const skillCategories = [
  { name: "All", value: "all" },
  { name: "Programming Languages", value: "Programming Languages" },
  { name: "Frontend Development", value: "Frontend Development" },
  { name: "Backend Development", value: "Backend Development" },
  { name: "AI/ML", value: "AI/ML" },
  { name: "Databases", value: "Databases" },
  { name: "Data Visualization", value: "Data Visualization" },
  { name: "DevOps", value: "DevOps" },
  { name: "BaaS", value: "BaaS" },
  { name: "Frameworks", value: "Frameworks" },
  { name: "Software", value: "Software" },
  { name: "Testing", value: "Testing" }
];
