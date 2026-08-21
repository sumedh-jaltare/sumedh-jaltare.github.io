export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const resumeHref = '/Sumedh-Jaltare-Resume.pdf'

export const heroIntro =
  'Building production web systems with React, FastAPI, and PostgreSQL. National hackathon winner — open to internships and full-time roles.'

export const workIntro =
  'A short list of shipped systems and selected public repositories — healthcare platforms, automation tools, and full-stack products.'

export const skillsIntro =
  'Languages, frameworks, and tooling across frontend, backend, databases, cloud, and ML.'

export const experienceIntro =
  'Leadership and execution across design, media, and technical roles — coordinating teams and shipping under real deadlines.'

export const aboutParagraphs = [
  'I design and ship full-stack products end to end: clear architecture, secure data models, and interfaces people can actually use.',
  'Recent work includes AyuPlus, a multi-clinic platform with multi-tenant PostgreSQL security, and an AI-assisted healthcare system that won Best Solution among 50+ teams at AISSMS Hackathon 2026.',
  'Outside class, I lead design and media for campus and national tech events — coordinating teams, shipping promotional systems, and presenting architecture to industry judges.',
]

export const projects = [
  {
    title: 'AyuPlus',
    tech: 'React · TypeScript · Node.js · PostgreSQL · Supabase · Edge Functions · JWT',
    summary:
      'Multi-clinic management with tenant-isolated PostgreSQL security, role-based access, and production-ready auth.',
    repo: 'AyuPlus',
    href: 'https://github.com/sumedh-jaltare?tab=repositories',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Patient-Centric Healthcare Platform',
    tech: 'FastAPI · Python · PostgreSQL · LLM APIs · Geolocation · Docker',
    summary:
      'AI-assisted triage and care routing. Best Solution Award, AISSMS Hackathon 2026 (50+ teams).',
    repo: 'Patient-Centric-Healthcare-Platform',
    href: 'https://github.com/sumedh-jaltare?tab=repositories',
    image:
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'PDF Analyzer',
    tech: 'Python · FastAPI · REST APIs · PDF Parsing · Docker',
    summary:
      'Document parsing API used in Adobe India Hackathon 2025 (Round 2 among 4,000 teams).',
    repo: 'T400310859',
    href: 'https://github.com/sumedh-jaltare/T400310859',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  },
]

/** Public repos worth showing on the portfolio (ordered). */
export const selectedRepos = [
  'TaskSphere',
  'VoteCompass',
  'Job-Hunt-Portal',
  'job-applicationtracker',
  'System-Prompt-vs.-Custom-RAG-Strategy',
  'GAN-implementation',
  'T400310859',
]

export const experienceItems = [
  {
    org: 'App Club — PES Modern College of Engineering',
    role: 'Design and Media Head',
    period: 'Jun 2025 — 2026',
    description:
      'Developed 10+ responsive UI assets using Figma and HTML/CSS; coordinated 3 sub-teams and introduced streamlined delivery workflows, reducing turnaround time by 25%.',
  },
  {
    org: 'MPULSE — National Level Tech Fest',
    role: 'Head of Media and Design',
    period: '2026',
    description:
      'Led media operations for a festival with 32+ events and 500+ participants. Managed a cross-functional team of 6; delivered 40+ promotional assets across design, branding, and media verticals on schedule.',
  },
  {
    org: 'National Techno Exhibition',
    role: 'Project Lead',
    period: 'Oct 2025',
    description:
      'Presented full-stack architecture and system design decisions to industry judges and 200+ attendees; demonstrated live product under evaluation conditions.',
  },
]

export const education = {
  school: 'Pune University',
  degree: 'Bachelor of Engineering in Information Technology',
  period: 'Expected May 2027',
  detail: 'CGPA 8.30 / 10',
  coursework:
    'Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP, Software Engineering',
}

export const achievements = [
  'National Level Hackathon Winner — Best Solution Award, AISSMS Hackathon 2026 (AI-assisted healthcare platform among 50+ teams)',
  'Adobe India Hackathon 2025 — Round 2 Qualifier (advanced from 85,000+ registrations; Round 2 among 4,000 teams)',
  'Startup Pitch Finalist — 3 ideas pitched, Udyamotsav (10,000+ participants)',
  'Runner-up — BITBLAZE, Bharati Vidyapeeth Pune',
  'Finalist — National Level AI Summit',
  'Finalist — National Tech Exhibition, Bangalore',
  'Solved 100+ Data Structures & Algorithms (DSA) problems on LeetCode',
]

export const skillGroups = [
  {
    label: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'C++', 'SQL'],
  },
  {
    label: 'Frontend',
    items: ['React.js', 'Vite', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'FastAPI',
      'Flask',
      'REST APIs',
      'WebSockets',
      'JWT',
      'Microservices',
    ],
  },
  {
    label: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    label: 'Cloud & DevOps',
    items: [
      'Supabase',
      'Edge Functions',
      'Vercel',
      'Docker',
      'Git',
      'GitHub',
      'CI/CD Pipelines',
    ],
  },
  {
    label: 'ML & AI',
    items: ['LLM APIs', 'Scikit-learn', 'Pandas', 'NumPy'],
  },
  {
    label: 'Practices',
    items: [
      'System Design',
      'DSA',
      'Agile/Scrum',
      'Unit Testing',
      'Code Review',
      'REST API Design',
      'Version Control',
      'Tableau',
    ],
  },
]

export const skills = skillGroups.flatMap((group) => group.items)

export const contact = {
  email: 'jaltaresr@gmail.com',
  phone: '+91 9765586498',
  phoneHref: 'tel:+919765586498',
  github: 'https://github.com/sumedh-jaltare',
  linkedin: 'https://www.linkedin.com/in/sumedh-jaltare/',
  leetcode: 'https://leetcode.com/u/Sumedh_Jaltare/',
  location: 'Pune, MH',
}
