export interface Experience {
  org: string;
  role: string;
  dates: string;
  detail: string;
}

export interface Project {
  name: string;
  url?: string;
  linkLabel?: string;
  dates: string;
  blurb: string;
  thumb?: string;
}

export const profile = {
  name: 'Tony Lin',
  school: 'cs + math @ uva',
  email: 'hpm3ep@virginia.edu',
  github: 'https://github.com/mythiipanda',
  linkedin: 'https://www.linkedin.com/in/tonyylin/',
  resumePath: '/Tony_Lin_resume.pdf',
  now: 'I like building whatever is in my head. Open to Summer 2027 internships.',
};

export const bio: string[] = [
  'I’m Tony. I’m from Northern Virginia and I study Computer Science and Math at the University of Virginia.',
  'I work on AI evals and agents.',
];

export const experience: Experience[] = [
  {
    org: 'Humana',
    role: 'Enterprise AI Intern',
    dates: 'Summer 2026',
    detail: 'Built an eval framework for a healthcare compliance AI system.',
  },
  {
    org: 'NIST',
    role: 'AI/ML Intern',
    dates: 'Summer 2025',
    detail: 'Built a RAG pipeline for an internal helpdesk agent.',
  },
  {
    org: 'ML@UVA × LMI',
    role: 'ML Evaluation Intern',
    dates: 'Winter 2024',
    detail: 'Benchmarked RAG architectures over government documents.',
  },
];

export const projects: Project[] = [
  {
    name: 'TDILEARNED',
    url: 'https://til-seven.vercel.app/',
    dates: '2026',
    blurb: 'Built an AI-powered interactive research tool.',
    thumb: '/thumbs/tdilearned.png',
  },
  {
    name: 'Dime',
    url: 'https://github.com/mythiipanda/dime',
    linkLabel: 'Repo ↗',
    dates: '2025',
    blurb: 'Built an AI agent for NBA analytics.',
  },
  {
    name: 'Snaek’s Value List',
    url: 'https://snaekvaluelist.netlify.app/',
    dates: '2026',
    blurb: 'Built a value-tracking platform for a Roblox trading community.',
    thumb: '/thumbs/snaeks.png',
  },
];