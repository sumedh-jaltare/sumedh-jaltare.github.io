export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const heroIntro =
  'Full-stack software engineer building scalable, production-ready web applications with React, Node.js, FastAPI, and PostgreSQL. National hackathon winner with hands-on experience in system design, LLM integration, and cloud deployment.'

export const workIntro =
  'Selected projects spanning multi-clinic healthcare systems, AI-assisted triage platforms, and document automation—built end-to-end with a focus on architecture, security, and real-world delivery.'

export const skillsIntro =
  'Languages, frameworks, and tooling I use across frontend, backend, databases, cloud, and ML—from React and FastAPI to PostgreSQL, Docker, and LLM-assisted pipelines.'

export const experienceIntro =
  'Leadership and execution across design, media, and technical roles—coordinating teams, shipping systems, and presenting architecture to judges and industry audiences.'

export const aboutParagraphs = [
  'Full-stack software engineer experienced in building scalable, production-ready web applications with React, Node.js, FastAPI, and PostgreSQL. National hackathon winner with hands-on exposure to system design, LLM integration, and cloud deployment.',
  'Recent work includes AyuPlus, a multi-clinic management platform with multi-tenant PostgreSQL security, and an AI-assisted healthcare platform that won Best Solution among 50+ teams at AISSMS Hackathon 2026.',
  'Alongside engineering, I lead design and media for campus and national technical events—coordinating teams, shipping promotional systems, and presenting full-stack architecture to industry judges.',
]

export const projects = [
  {
    title: 'AyuPlus',
    tech: 'React · TypeScript · Node.js · PostgreSQL · Supabase · Edge Functions · JWT',
    href: 'https://github.com/sumedh-jaltare',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Patient-Centric Healthcare Platform',
    tech: 'FastAPI · Python · PostgreSQL · LLM APIs · Geolocation · Docker',
    href: 'https://github.com/sumedh-jaltare',
    image:
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'PDF Analyzer',
    tech: 'Python · FastAPI · REST APIs · PDF Parsing · Docker',
    href: 'https://github.com/sumedh-jaltare',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  },
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
  location: 'Pune, MH',
}
