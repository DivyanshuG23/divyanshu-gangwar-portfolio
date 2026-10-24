/**
 * Verified Projects Data Source
 * 
 * Note: Project titles and demonstration readiness are confirmed by the user.
 * GitHub repository and live demo URLs have not yet been provided.
 * Leave unknown URLs as empty strings (""); the UI automatically disables
 * or hides empty links rather than rendering fake destinations.
 */

export const PROJECTS_DATA = [
  {
    id: 'flowforge-ai',
    title: 'FlowForge AI',
    subtitle: 'Flagship Architecture',
    role: 'Full-Stack Developer',
    category: 'AI Pipeline & Workflow Orchestrator',
    featured: true,
    description:
      'An intelligent workflow automation system designed to configure, chain, and execute modular AI processing pipelines with real-time state visualization and telemetry monitoring.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'REST APIs'],
    // Editable URL fields - supply real URLs when available:
    githubUrl: '',
    liveUrl: '',
    status: 'Complete & Demonstrable',
    highlightMetric: 'Multi-Step Execution Pipeline',
    accentToken: 'champagne',
  },
  {
    id: 'resumex-ai',
    aliasId: 'ai-resume-analyzer',
    title: 'ResumeX AI',
    subtitle: 'AI Resume Analyzer',
    role: 'Full-Stack Developer',
    category: 'Resume Evaluation & Skill Matching',
    featured: false,
    description:
      'An intelligent resume evaluation tool that parses candidate profiles, evaluates skill keyword alignment against target job requirements, and generates actionable optimization recommendations.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'REST APIs'],
    // Editable URL fields - supply real URLs when available:
    githubUrl: '',
    liveUrl: '',
    status: 'Complete & Demonstrable',
    highlightMetric: 'Automated Scoring & Parsing',
    accentToken: 'emerald',
  },
  {
    id: 'url-shortener',
    title: 'URL Shortener',
    subtitle: 'Link Management Utility',
    role: 'Full-Stack Developer',
    category: 'URL Redirection & Traffic Analytics',
    featured: false,
    description:
      'A high-performance URL transformation and redirect service built with custom slug generation, low-latency HTTP redirects, and clean click analytics tracking.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    // Editable URL fields - supply real URLs when available:
    githubUrl: '',
    liveUrl: '',
    status: 'Complete & Demonstrable',
    highlightMetric: 'Low-Latency Routing',
    accentToken: 'champagne',
  },
  {
    id: 'expense-tracker',
    aliasId: 'expense-flow',
    title: 'Expense Tracker',
    subtitle: 'ExpenseFlow Ledger',
    role: 'Full-Stack Developer',
    category: 'Personal Finance & Budget Tracking',
    featured: false,
    description:
      'A full-stack personal finance management web application featuring interactive transaction categorization, spending breakdown summaries, and real-time budget tracking.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    // Editable URL fields - supply real URLs when available:
    githubUrl: '',
    liveUrl: '',
    status: 'Complete & Demonstrable',
    highlightMetric: 'Real-Time Ledger Management',
    accentToken: 'emerald',
  },
];
