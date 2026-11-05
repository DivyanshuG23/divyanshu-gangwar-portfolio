import React from 'react';
import {
  MonitorSmartphone,
  Workflow,
  Boxes,
  Network,
  Columns3,
  Database,
  Binary,
  ServerCog,
  Terminal,
} from 'lucide-react';

interface IconProps {
  className?: string;
}

export const Html5Icon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path d="M4.14 2.5h15.72l-1.43 16.03L12 21.5l-6.43-2.97L4.14 2.5z" fill="#E44D26"/>
    <path d="M12 4.25v15.35l4.89-2.26 1.1-12.35L12 4.25z" fill="#F16529"/>
    <path d="M12 8.16H8.22l.24 2.69H12v-2.69zm0 5.37h-2.18l-.15-1.68H8.01l.3 3.36H12v-1.68z" fill="#EBEBEB"/>
    <path d="M12 8.16v2.69h3.48l-.33 3.68-3.15.85v1.73l4.82-1.34.66-7.61H12zm0 5.37v1.73l.03-.01V13.53z" fill="#FFFFFF"/>
  </svg>
);

export const Css3Icon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path d="M4.14 2.5h15.72l-1.43 16.03L12 21.5l-6.43-2.97L4.14 2.5z" fill="#1572B6"/>
    <path d="M12 4.25v15.35l4.89-2.26 1.1-12.35L12 4.25z" fill="#33A9DC"/>
    <path d="M12 8.16H8.22l.14 1.57h3.64V8.16zm0 3.14H8.5l.24 2.69H12v-2.69zm0 4.23l-2.18-.59-.14-1.57H8.01l.28 3.14 3.71 1.03v-2.01z" fill="#EBEBEB"/>
    <path d="M12 8.16v1.57h2.15l-.2 2.25H12v1.57h3.36l-.42 4.71-2.94.81v1.63l4.61-1.28.66-7.61L12 8.16z" fill="#FFFFFF"/>
  </svg>
);

export const JavaScriptIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
    <path d="M7.5 18c-.8 0-1.5-.3-1.9-.8l1-1.3c.3.3.6.5 1 .5.5 0 .8-.2.8-.7v-5.2h1.8v5.3c0 1.5-.9 2.2-2.7 2.2zm7.4 0c-1.8 0-2.8-.9-3-2l1.6-.9c.2.6.6 1.2 1.4 1.2.7 0 1.2-.3 1.2-.8 0-.5-.4-.7-1.3-1.1-1.3-.5-2.1-1.1-2.1-2.2 0-1.3 1-2.1 2.5-2.1 1.3 0 2.2.6 2.6 1.6l-1.5.9c-.2-.5-.5-.8-1.1-.8-.5 0-.9.3-.9.7 0 .4.3.6 1.1 1 1.4.5 2.3 1.1 2.3 2.3 0 1.4-1.1 2.2-2.8 2.2z" fill="#000000"/>
  </svg>
);

export const ReactIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#61DAFB" strokeWidth="1.5" aria-hidden="true">
    <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(30 12 12)"/>
    <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(90 12 12)"/>
    <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(150 12 12)"/>
    <circle cx="12" cy="12" r="1.8" fill="#61DAFB"/>
  </svg>
);

export const TypeScriptIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect width="24" height="24" rx="4" fill="#3178C6"/>
    <path d="M12.5 10.5h-3v1.8h1.8v5.2h1.8v-5.2h1.8v-1.8h-2.4zm5.5 2.8c-.3-.2-.7-.4-1.2-.4-.6 0-1 .3-1 .7 0 .5.4.7 1.2 1 1.4.5 2.1 1.1 2.1 2.2 0 1.4-1.1 2.2-2.7 2.2-1.2 0-2.1-.4-2.7-1l1-1.3c.5.5 1 .7 1.7.7.6 0 1-.3 1-.7 0-.4-.4-.7-1.1-1-1.3-.5-2.2-1-2.2-2.2 0-1.4 1.1-2.2 2.6-2.2 1.1 0 1.9.3 2.5.8l-.9 1.3z" fill="#FFFFFF"/>
  </svg>
);

export const TailwindIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#38BDF8" aria-hidden="true">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
  </svg>
);

export const BootstrapIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect width="24" height="24" rx="5" fill="#7952B3"/>
    <path d="M8.5 6.5h4.2c1.6 0 2.8.8 2.8 2.2 0 .9-.5 1.6-1.3 1.9 1.1.3 1.8 1.1 1.8 2.3 0 1.6-1.3 2.6-3.2 2.6H8.5V6.5zm2.5 3.5h1.5c.6 0 1-.3 1-.8s-.4-.8-1-.8H11v1.6zm0 3.5h1.7c.7 0 1.2-.3 1.2-.9s-.5-.9-1.2-.9H11v1.8z" fill="#FFFFFF"/>
  </svg>
);

export const NodeIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#5FA04E" aria-hidden="true">
    <path d="M12 2.5l8.66 5v10L12 22.5l-8.66-5v-10L12 2.5zm0 2.31L5.34 8.65v7.7L12 20.19l6.66-3.84v-7.7L12 4.81z"/>
    <path d="M12 8.2a2.3 2.3 0 0 0-2.3 2.3v3a2.3 2.3 0 0 0 4.6 0v-3A2.3 2.3 0 0 0 12 8.2z"/>
  </svg>
);

export const ExpressIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#D1D5DB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 8l4 8M10 8l-4 8M14 16h4M14 12h3M14 8h4"/>
  </svg>
);

export const MongoIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#47A248" aria-hidden="true">
    <path d="M12 2.5c-.3 0-.6.1-.7.4C10.5 4.5 7 9.8 7 13.8c0 3.7 2.4 6.7 5 7.7.3.1.7.1 1 0 2.6-1 5-4 5-7.7 0-4-3.5-9.3-4.3-10.9-.1-.3-.4-.4-.7-.4zm-.1 3.5c1.5 2.5 3.6 6.3 3.6 8.3 0 2.3-1.4 4.5-3.5 5.5V6z"/>
  </svg>
);

export const MySqlIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#4479A1" aria-hidden="true">
    <path d="M12 3c-4.97 0-9 1.79-9 4v10c0 2.21 4.03 4 9 4s9-1.79 9-4V7c0-2.21-4.03-4-9-4zm0 2c4.42 0 7 1.34 7 2s-2.58 2-7 2-7-1.34-7-2 2.58-2 7-2zm0 6c4.42 0 7 1.34 7 2s-2.58 2-7 2-7-1.34-7-2 2.58-2 7-2zm0 6c4.42 0 7 1.34 7 2s-2.58 2-7 2-7-1.34-7-2 2.58-2 7-2z"/>
  </svg>
);

export const JavaIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#E76F00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 10h1a3 3 0 0 1 0 6h-1"/>
    <path d="M4 10h14v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-6z"/>
    <path d="M6 3c.5 1 1 2 0 3"/>
    <path d="M10 2c1 1.2 1.5 2.2.5 3.5"/>
    <path d="M14 3c.5 1 1 2 0 3"/>
    <path d="M2 21h18"/>
  </svg>
);

export const PythonIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path d="M11.9 2.5c-4.6 0-4.3 2-4.3 2l.01 2.1h4.4v.6H5.7s-3 .3-3 4.4c0 4.1 2.6 3.9 2.6 3.9h1.6v-2.2s-.1-2.6 2.6-2.6h4.5s2.5 0 2.5-2.5V4.9s.4-2.4-4.6-2.4zm-1.3 1.4a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z" fill="#3776AB"/>
    <path d="M12.1 21.5c4.6 0 4.3-2 4.3-2l-.01-2.1h-4.4v-.6h6.3s3-.3 3-4.4c0-4.1-2.6-3.9-2.6-3.9h-1.6v2.2s.1 2.6-2.6 2.6H10s-2.5 0-2.5 2.5v3.2s-.4 2.4 4.6 2.4zm1.3-1.4a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z" fill="#FFD43B"/>
  </svg>
);

export const CIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#A8B9CC" aria-hidden="true">
    <path d="M12 2.5l8.66 5v10L12 22.5l-8.66-5v-10L12 2.5zm0 3.2L6 9.15v6.7l6 3.45 6-3.45v-6.7L12 5.7zm1.8 4.2c1.2 0 2.1.5 2.7 1.3l-1.3 1.1c-.4-.5-.8-.7-1.4-.7-1.3 0-2.1 1-2.1 2.3s.8 2.3 2.1 2.3c.6 0 1-.2 1.4-.7l1.3 1.1c-.6.8-1.5 1.3-2.7 1.3-2.3 0-3.9-1.6-3.9-4s1.6-4 3.9-4z"/>
  </svg>
);

export const GitIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#F05032" aria-hidden="true">
    <path d="M21.7 10.7l-8.4-8.4c-.6-.6-1.6-.6-2.2 0L8.7 4.7l2.8 2.8c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l2.7 2.7c.6-.2 1.3-.1 1.8.4.8.8.8 2.1 0 2.9s-2.1.8-2.9 0c-.6-.6-.7-1.4-.4-2.1l-2.5-2.5v5.8c.2.2.4.4.5.7.5.9.3 2-.5 2.6-.9.6-2.1.4-2.7-.5s-.4-2.1.5-2.7c.3-.2.6-.3.9-.3V9.7c-.3 0-.6-.1-.9-.3-.9-.6-1.1-1.7-.6-2.6l-2.7-2.7-4.4 4.4c-.6.6-.6 1.6 0 2.2l8.4 8.4c.6.6 1.6.6 2.2 0l8.4-8.4c.6-.6.6-1.6 0-2.2z"/>
  </svg>
);

export const VsCodeIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#007ACC" aria-hidden="true">
    <path d="M17.5 2.5l4.5 2.2v14.6l-4.5 2.2-10-8.5 10-10.5zm-3.2 9.5l-6.8-5.3-4.5 3.3 4 3-4 3 4.5 3.3 6.8-5.3z"/>
  </svg>
);

export const PostmanIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#FF6C37" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5l-4-2.5 4-2.5v5zm3-5l-4-2.5 4-2.5v5z"/>
  </svg>
);

export const ViteIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path d="M19.8 4.2L12.5 21.7c-.2.4-.7.4-.9 0L4.2 4.2c-.2-.4.1-.9.6-.8l7.2 1.4 7.2-1.4c.5-.1.8.4.6.8z" fill="#BD34FE"/>
    <path d="M13.2 4.6l-1.9 5.8 3.1-.6-4.4 8.7 1.3-4.9-2.5.5 4.4-9.5z" fill="#FFD62E"/>
  </svg>
);

export const TechIcon: React.FC<{ skill: string; className?: string }> = ({
  skill,
  className = "w-3.5 h-3.5",
}) => {
  switch (skill) {
    case 'HTML5':
      return <Html5Icon className={className} />;
    case 'CSS3':
      return <Css3Icon className={className} />;
    case 'JavaScript (ES6+)':
      return <JavaScriptIcon className={className} />;
    case 'React.js':
      return <ReactIcon className={className} />;
    case 'TypeScript':
      return <TypeScriptIcon className={className} />;
    case 'Tailwind CSS':
      return <TailwindIcon className={className} />;
    case 'Bootstrap':
      return <BootstrapIcon className={className} />;
    case 'Responsive Design':
      return <MonitorSmartphone className={`${className} text-sky-400`} />;
    case 'DOM Manipulation':
      return <Workflow className={`${className} text-amber-400`} />;
    case 'Component Architecture':
      return <Boxes className={`${className} text-teal-400`} />;
    case 'Node.js':
      return <NodeIcon className={className} />;
    case 'Express.js':
      return <ExpressIcon className={className} />;
    case 'REST APIs':
      return <Network className={`${className} text-emerald-400`} />;
    case 'Middleware':
      return <Workflow className={`${className} text-emerald-400`} />;
    case 'MVC':
      return <Columns3 className={`${className} text-emerald-400`} />;
    case 'MongoDB':
      return <MongoIcon className={className} />;
    case 'MySQL':
      return <MySqlIcon className={className} />;
    case 'SQL / Relational Databases':
      return <Database className={`${className} text-sky-400`} />;
    case 'Java':
      return <JavaIcon className={className} />;
    case 'Python':
      return <PythonIcon className={className} />;
    case 'C':
      return <CIcon className={className} />;
    case 'Git & GitHub':
      return <GitIcon className={className} />;
    case 'VS Code':
      return <VsCodeIcon className={className} />;
    case 'Postman':
      return <PostmanIcon className={className} />;
    case 'Vite':
      return <ViteIcon className={className} />;
    case 'Data Structures & Algorithms':
      return <Binary className={`${className} text-amber-400`} />;
    case 'Object-Oriented Programming (OOP)':
      return <Boxes className={`${className} text-amber-400`} />;
    case 'DBMS':
      return <ServerCog className={`${className} text-amber-400`} />;
    case 'Operating Systems':
      return <Terminal className={`${className} text-amber-400`} />;
    default:
      return <Terminal className={`${className} text-neutral-400`} />;
  }
};
