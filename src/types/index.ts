export interface NavItem {
  label: string;
  href: string;
}

export const NAV_SECTIONS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export const PERSONAL_INFO = {
  name: "Divyanshu Gangwar",
  shortRole: "Software Engineer & CSE Student",
  degree: "B.Tech in Computer Science & Engineering",
  university: "Invertis University",
  graduationYear: "2027",
  cgpa: "8.6 / 10",
  availabilityStatus: "Open to Jobs & Internships",
  email: "divyanshugangwar663@gmail.com",
  github: "https://github.com/DivyanshuG23",
  linkedin: "https://www.linkedin.com/in/divyanshu-gangwar-831bb6346/",
  headline: "Building Intelligent Digital Experiences.",
  heroSummary: "Final-year Computer Science & Engineering student at Invertis University, graduating in 2027, focused on full-stack web development and building toward AI-powered applications.",
  targetRoles: [
    "Frontend Developer",
    "React Developer",
    "MERN Stack Developer",
    "Backend Developer",
    "Full-Stack Web Developer",
    "AI Application Developer",
  ],
  portraitUrl: "/divyanshu-profile.jpeg", // Centralized real portrait photo
  cvUrl: "/Divyanshu_Gangwar_CV.pdf", // Connected official CV PDF
  bio: "I'm a Computer Science student at Invertis University graduating in 2027, with a CGPA of 8.6/10. I focus on software development and building practical web applications, combining strong core fundamentals in data structures and algorithms with modern full-stack technologies like React, Node.js, and Java.",
};

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  githubVerified?: boolean;
  liveUrl: string;
  previewUrl?: string;
  previewType: 'image' | 'canvas';
  accent?: 'gold' | 'teal' | 'emerald' | 'blue';
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "resumex-ai",
    title: "ResumeX AI",
    subtitle: "AI-Powered Resume Analysis & ATS Optimization",
    description: "An intelligent web application that evaluates candidate resumes against target job descriptions, computes algorithmic ATS compatibility scores, and delivers actionable keyword and formatting recommendations.",
    tags: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "REST APIs"],
    githubUrl: "https://github.com/DivyanshuG23/ResumeX-AI",
    githubVerified: true,
    liveUrl: "https://resume-x-ai-beige.vercel.app/",
    previewUrl: "/projects/ai-resume-analyzer.png",
    previewType: "image",
    accent: "gold",
    featured: true,
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    subtitle: "Full-Stack Link Management & Redirection Service",
    description: "A fast link shortening and management platform featuring custom short code generation, rapid URL redirection, click traffic analytics, and secure RESTful backend API endpoints.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    githubUrl: "https://github.com/DivyanshuG23/url-shortener-frontend",
    githubVerified: true,
    liveUrl: "https://url-shortener-frontend-two-eta.vercel.app/",
    previewUrl: "/projects/url-shortener.png",
    previewType: "image",
    accent: "gold",
    featured: true,
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    subtitle: "ExpenseFlow Personal Finance & Budget Manager",
    description: "A comprehensive personal finance dashboard enabling users to record transactions, organize expenditures into categories, monitor monthly spending patterns, and maintain real-time budget balances.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/DivyanshuG23/Expense-Tracker",
    githubVerified: true,
    liveUrl: "https://expense-tracker-iota-flax.vercel.app/",
    previewUrl: "/projects/expense-tracker.png",
    previewType: "image",
    accent: "gold",
    featured: true,
  },
  {
    id: "flowforge-ai",
    title: "FlowForge AI",
    subtitle: "Visual Workflow Automation & Execution Canvas",
    description: "An interactive node-based canvas for designing, connecting, and automating sequential task pipelines with modular node execution states, visual connectors, and dynamic pipeline orchestrations.",
    tags: ["React.js", "TypeScript", "Node.js", "Express.js", "REST APIs"],
    githubUrl: "https://github.com/DivyanshuG23/flowforge-ai",
    githubVerified: false,
    liveUrl: "https://flowforge-ai-ten.vercel.app/",
    previewType: "canvas",
    accent: "gold",
    featured: true,
  },
];

export interface SkillCategory {
  category: string;
  description: string;
  accent: 'teal' | 'emerald' | 'blue' | 'gold';
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend Development",
    description: "Building responsive, component-driven user interfaces with modern web standards.",
    accent: "teal",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Bootstrap",
      "Responsive Design",
      "DOM Manipulation",
      "Component Architecture",
    ],
  },
  {
    category: "Backend Development",
    description: "Developing RESTful web services, server-side logic, and MVC architectures.",
    accent: "emerald",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Middleware",
      "MVC",
    ],
  },
  {
    category: "Databases",
    description: "Structuring document data models, relational table schemas, and database queries.",
    accent: "blue",
    skills: [
      "MongoDB",
      "MySQL",
      "SQL / Relational Databases",
    ],
  },
  {
    category: "Programming Languages",
    description: "Core algorithmic languages used for software systems and problem solving.",
    accent: "gold",
    skills: [
      "Java",
      "Python",
      "C",
    ],
  },
  {
    category: "Tools",
    description: "Development environments, version control, build tools, and API test suites.",
    accent: "blue",
    skills: [
      "Git & GitHub",
      "VS Code",
      "Postman",
      "Vite",
    ],
  },
  {
    category: "Core Computer Science",
    description: "Foundational computer science principles including algorithms and system concepts.",
    accent: "gold",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "DBMS",
      "Operating Systems",
    ],
  },
];

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  category: 'Internships' | 'Web Development' | 'Programming' | 'Other Learning';
  image: string;
  imageAlt: string;
  aspectRatio: 'landscape' | 'portrait';
  highlight: string;
  skills: string[];
  credentialNote: string;
  year?: string;
  description?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "eduskills-mern",
    title: "MERN Full Stack Development Virtual Internship",
    issuer: "AICTE–EduSkills Academy",
    issueDate: "June–August 2026",
    category: "Internships",
    image: "/certificates/eduskills-mern.png",
    imageAlt: "AICTE-EduSkills Academy MERN Full Stack Development Virtual Internship Certificate - Divyanshu Gangwar",
    aspectRatio: "portrait",
    highlight: "8-Week AICTE Virtual Internship · Grade B",
    skills: ["MERN Stack", "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    credentialNote: "AICTE & EduSkills Academy Approved",
    year: "2026",
    description: "Intensive 8-week virtual internship accredited by AICTE and EduSkills Academy covering complete MERN stack architecture.",
  },
  {
    id: "codec-mern",
    title: "MERN Stack Developer Intern",
    issuer: "Codec Technologies",
    issueDate: "1 June 2026 – 1 July 2026",
    category: "Internships",
    image: "/certificates/codec-mern.png",
    imageAlt: "Codec Technologies MERN Stack Developer Internship Certificate - Divyanshu Gangwar",
    aspectRatio: "landscape",
    highlight: "1-Month AICTE & ICAC Approved Program",
    skills: ["MERN Stack", "React.js", "Node.js", "Express.js", "MongoDB"],
    credentialNote: "Codec Technologies Internship Program",
    year: "2026",
    description: "Hands-on engineering of full-stack web applications with asynchronous client-server communication and database schemas.",
  },
  {
    id: "codsoft-web",
    title: "Web Development Virtual Internship",
    issuer: "CodSoft",
    issueDate: "15 May 2026 – 15 June 2026",
    category: "Internships",
    image: "/certificates/codsoft-web.png",
    imageAlt: "CodSoft Web Development Internship Certificate - Divyanshu Gangwar",
    aspectRatio: "landscape",
    highlight: "4-Week Practical Virtual Internship",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "DOM Manipulation"],
    credentialNote: "CodSoft Web Development Program",
    year: "2026",
    description: "Built responsive, accessible user interfaces and modern interactive web components adhering to web standards.",
  },
  {
    id: "oasis-infobyte",
    title: "Web Development and Designing Internship",
    issuer: "Oasis Infobyte",
    issueDate: "5 January 2026 – 15 February 2026",
    category: "Internships",
    image: "/certificates/oasis-infobyte-web-internship.png",
    imageAlt: "Oasis Infobyte Web Development and Designing Internship Certificate - Divyanshu Gangwar",
    aspectRatio: "landscape",
    highlight: "1-Month AICTE OIB-SIP Virtual Internship",
    skills: ["Web Development", "UI Design", "Frontend Implementation"],
    credentialNote: "AICTE OIB-SIP Accredited",
    year: "2026",
    description: "Delivered web development and interface design tasks in an AICTE-partnered internship program.",
  },
  {
    id: "scaler-python",
    title: "Python Course for Beginners: Mastering the Essentials",
    issuer: "Scaler Topics",
    issueDate: "22 July 2024",
    category: "Programming",
    image: "/certificates/scaler-python-beginners.png",
    imageAlt: "Scaler Topics Python Course for Beginners Certificate - Divyanshu Gangwar",
    aspectRatio: "landscape",
    highlight: "121 Tutorials · 16 Modules · 10 Challenges",
    skills: ["Python", "Problem Solving", "Data Structures Foundations"],
    credentialNote: "Scaler Topics Course Completion",
    year: "2024",
    description: "Comprehensive mastery of Python language fundamentals, algorithmic problem solving, and standard libraries.",
  },
  {
    id: "kg-complete-html",
    title: "Complete HTML",
    issuer: "KnowledgeGate",
    issueDate: "24 May 2026",
    category: "Web Development",
    image: "/certificates/knowledgegate-complete-html.png",
    imageAlt: "KnowledgeGate Complete HTML Certificate - Divyanshu Gangwar",
    aspectRatio: "landscape",
    highlight: "100% Score on Comprehensive Examination",
    skills: ["HTML5", "Semantic Web", "Accessible Structures"],
    credentialNote: "Certified with 100% Examination Score",
    year: "2026",
    description: "Excellence in semantic HTML5 markup, accessibility guidelines, document structure, and modern web standards.",
  },
  {
    id: "kg-react-redux",
    title: "React and Redux",
    issuer: "KnowledgeGate",
    issueDate: "25 May 2026",
    category: "Web Development",
    image: "/certificates/knowledgegate-react-redux.png",
    imageAlt: "KnowledgeGate React and Redux Certificate - Divyanshu Gangwar",
    aspectRatio: "landscape",
    highlight: "94% Score on Comprehensive Examination",
    skills: ["React.js", "Redux", "State Management", "Component Architecture"],
    credentialNote: "Certified with 94% Examination Score",
    year: "2026",
    description: "Advanced front-end component state architectures, Redux store flows, hooks, and predictable state lifecycles.",
  },
  {
    id: "simplilearn-sql",
    title: "Introduction to SQL",
    issuer: "Simplilearn SkillUp",
    issueDate: "4 September 2026",
    category: "Programming",
    image: "/certificates/simplilearn-introduction-to-sql.jpeg",
    imageAlt: "Simplilearn SkillUp Introduction to SQL Certificate - Divyanshu Gangwar",
    aspectRatio: "landscape",
    highlight: "Database Querying & Schema Management",
    skills: ["SQL", "Relational Databases", "Queries & Filters", "Joins"],
    credentialNote: "Simplilearn SkillUp Certificate",
    year: "2026",
    description: "Relational database querying, multi-table joins, subqueries, grouping, aggregation, and filtering.",
  },
  {
    id: "stp-css",
    title: "CSS Course",
    issuer: "STP Computer Education",
    issueDate: "May–June 2024",
    category: "Web Development",
    image: "/certificates/stp-css-course.png",
    imageAlt: "STP Computer Education CSS Course Certificate - Divyanshu Gangwar",
    aspectRatio: "portrait",
    highlight: "1-Month Training · Grade D",
    skills: ["CSS3", "Layouts & Flexbox", "Web Styling"],
    credentialNote: "STP Computer Education Course",
    year: "2024",
    description: "Structured CSS3 training covering styling rules, selector specificity, flexbox alignments, and layouts.",
  },
  {
    id: "wexl-ai-fluentedge",
    title: "FluentEdge AI Course",
    issuer: "WeXL AI / Invertis University",
    issueDate: "Completed 2026",
    category: "Other Learning",
    image: "/certificates/wexl-ai-fluentedge-ai-course.png",
    imageAlt: "WeXL AI FluentEdge AI Course Certificate - Divyanshu Gangwar",
    aspectRatio: "landscape",
    highlight: "120 Topics Completed · 12,000 XP Achieved",
    skills: ["AI Communication", "Professional Fluency", "Continuous Learning"],
    credentialNote: "WeXL AI & Invertis University Accreditation",
    year: "2026",
    description: "Completed intensive AI-driven communication, workplace scenarios, and professional fluency modules.",
  },
];

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  program?: string;
  period: string;
  duration: string;
  type: string;
  accent: 'teal' | 'emerald' | 'blue';
  logoUrl: string;
  logoAlt: string;
  certificateUrl: string;
  certificateAlt: string;
  technologies: string[];
  bullets: string[];
  location?: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "eduskills",
    role: "MERN Full Stack Development Virtual Internship",
    program: "MERN Full Stack Development With Project Virtual Internship",
    organization: "AICTE–EduSkills Academy",
    period: "June–August 2026",
    duration: "8 weeks",
    type: "Virtual Internship",
    accent: "blue",
    logoUrl: "/logos/eduskills-logo.png",
    logoAlt: "AICTE–EduSkills Academy Logo",
    certificateUrl: "/certificates/eduskills-mern.png",
    certificateAlt: "AICTE-EduSkills Academy MERN Full Stack Development Virtual Internship Certificate - Divyanshu Gangwar",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    bullets: [
      "Completed an intensive virtual internship program focused on MERN full-stack application development.",
      "Built practical end-to-end web modules integrating React.js frontend interfaces with Node.js and Express backend services.",
      "Implemented MongoDB document schemas, API routing, and verified application workflows through structured project milestones.",
    ],
  },
  {
    id: "codec",
    role: "MERN Stack Developer Intern",
    organization: "Codec Technologies",
    period: "1 June 2026 – 1 July 2026",
    duration: "1 month",
    type: "Internship",
    accent: "emerald",
    logoUrl: "/logos/codec-logo.png",
    logoAlt: "Codec Technologies Logo",
    certificateUrl: "/certificates/codec-mern.png",
    certificateAlt: "Codec Technologies MERN Stack Developer Internship Certificate - Divyanshu Gangwar",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js"],
    bullets: [
      "Engineered full-stack features utilizing the MERN stack (MongoDB, Express.js, React.js, and Node.js).",
      "Developed RESTful API endpoints and connected client-side components with asynchronous state management.",
      "Tested backend routing, request validation, and database operations for full-stack web modules.",
    ],
  },
  {
    id: "codsoft",
    role: "Web Development Intern",
    organization: "CodSoft",
    period: "15 May 2026 – 15 June 2026",
    duration: "4 weeks",
    type: "Internship",
    accent: "teal",
    logoUrl: "/logos/codsoft-logo.png",
    logoAlt: "CodSoft Logo",
    certificateUrl: "/certificates/codsoft-web.png",
    certificateAlt: "CodSoft Web Development Internship Certificate - Divyanshu Gangwar",
    technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design"],
    bullets: [
      "Developed responsive, accessible web page interfaces using semantic HTML5, modern CSS3 layout techniques, and JavaScript (ES6+).",
      "Built interactive frontend features with clean DOM manipulation and cross-device responsive styling.",
      "Collaborated on modular web components adhering to foundational web design and performance standards.",
    ],
  },
];
