export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  private: boolean;
}

export interface TransformedRepo {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  github: string;
  demo?: string;
  stars: number;
  forks: number;
  language: string;
  lastUpdated: string;
  isFromGitHub: boolean;
}

const GITHUB_USERNAME = 'raunak0400';
const GITHUB_API_BASE = 'https://api.github.com';

export const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos: GitHubRepo[] = await response.json();
    
    // Filter out private repos and forks, sort by stars and recent activity
    return repos
      .filter(repo => !repo.private && !repo.name.includes('.github.io'))
      .sort((a, b) => {
        // Sort by stars first, then by last updated
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      })
      .slice(0, 6); // Get top 6 repos
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
};

export const transformGitHubRepo = (repo: GitHubRepo): TransformedRepo => {
  // Create a tech stack from language and topics
  const techStack = [repo.language, ...repo.topics].filter(Boolean) as string[];
  
  // Generate a placeholder image based on the repo name
  const imagePlaceholder = `https://via.placeholder.com/400x200/1f2937/ffffff?text=${encodeURIComponent(repo.name)}`;
  
  return {
    id: `github-${repo.id}`,
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description || 'A project showcasing modern web development practices and technologies.',
    image: imagePlaceholder,
    techStack: techStack.length > 0 ? techStack : ['JavaScript'],
    github: repo.html_url,
    demo: repo.homepage || undefined,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language || 'JavaScript',
    lastUpdated: new Date(repo.updated_at).toLocaleDateString(),
    isFromGitHub: true,
  };
};

export const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C#': '#178600',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Swift': '#ffac45',
    'Kotlin': '#F18E33',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'SCSS': '#c6538c',
    'Vue': '#2c3e50',
    'React': '#61dafb',
    'Angular': '#dd0031',
    'Node.js': '#339933',
  };
  
  return colors[language] || '#6e7681';
}; 