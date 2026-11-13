/* ==========================================================================
   Single source of truth for every piece of portfolio content.
   Pages and components read from here, so edits happen in one place.
   ========================================================================== */
import {
  siCss,
  siDart,
  siExpress,
  siFlutter,
  siGit,
  siGithub,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siMysql,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPhpmyadmin,
  siReact,
  siSpringboot,
  siTypescript,
  siVite,
  siThreedotjs,
  siDotnet,
  siPython,
  siDocker,
  siPostgresql,
  siObsidian
} from 'simple-icons';

export const JAVA_LOGO = './tech-logos/java.svg';
export const VSCODE_LOGO = './tech-logos/vscode.svg';
export const OMNIROUTE_LOGO = './tech-logos/omniroute.svg';
export const HERMES_LOGO = './tech-logos/hermes.png';

export const PROFILE = {
  name: 'Earl Willan Pajo',
  shortName: 'Earl Pajo',
  firstName: 'Earl',
  fullName: 'Earlnis Willan Agang Pajo',
  handle: '@earl146',
  role: 'Full-Stack Developer',
  roleLong: 'Full-Stack Developer & BSIT Student',
  school: 'Legacy Compostela College',
  location: 'Compostela, Davao de Oro',
  country: 'Philippines',
  timezone: 'Asia/Manila',
  email: 'earlypajo@gmail.com',
  gmail: 'https://mail.google.com/mail/?view=cm&fs=1&to=earlypajo@gmail.com&su=Project%20Inquiry%20via%20Portfolio',
  github: 'https://github.com/EARL146',
  githubHandle: 'EARL146',
  linkedin: 'https://www.linkedin.com/in/earlnis-pajo-272840432',
  v1: 'https://earl146.github.io/svgportfolio',
  v1Repo: 'https://github.com/EARL146/svgportfolio',
  avatar: './illustrations/rail-avatar.webp',
  avatarSmall: './illustrations/rail-avatar-sm.webp',
  chatAvatar: './illustrations/chat-avatar.webp',
  photo: './portrait.jpg',
  photoDark: './preview_on_dark.jpg',
  deskIllustration: './illustrations/about-desk.webp',
  codingSince: 2025
};

export const HOME = {
  lines: ['Thoughtful code.', 'Built to last.'],
  title: 'Thoughtful code. Built to last.',
  subtitle: 'I build full-stack web apps, REST APIs and mobile apps — from the database schema to the live deploy.',
  tagline: ['Thoughtful code.', 'Built to last.']
};

/* "Daily drivers" strip on the home page */
export const TOOLS = [
  { name: 'Java 21', src: JAVA_LOGO },
  { name: 'Spring Boot', icon: siSpringboot },
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'Express', icon: siExpress, mono: true },
  { name: 'MySQL', icon: siMysql },
  { name: 'Flutter', icon: siFlutter },
  { name: 'React', icon: siReact },
  { name: 'GitHub', icon: siGithub, mono: true },
  { name: 'VS Code', src: VSCODE_LOGO },
  { name: 'OmniRoute', src: OMNIROUTE_LOGO },
  { name: 'Hermes', src: HERMES_LOGO },
  { name: 'Obsidian', icon: siObsidian }
];

export const STACK_ROWS = [
  [
    { name: 'Java 21', src: JAVA_LOGO },
    { name: 'Spring Boot', icon: siSpringboot },
    { name: 'Node.js', icon: siNodedotjs },
    { name: 'Express', icon: siExpress, mono: true },
    { name: 'PHP', icon: siPhp },
    { name: 'MySQL', icon: siMysql },
    { name: 'phpMyAdmin', icon: siPhpmyadmin }
  ],
  [
    { name: 'HTML5', icon: siHtml5 },
    { name: 'CSS3', icon: siCss },
    { name: 'JavaScript', icon: siJavascript },
    { name: 'TypeScript', icon: siTypescript },
    { name: 'React', icon: siReact },
    { name: 'Flutter', icon: siFlutter },
    { name: 'Dart', icon: siDart },
    { name: 'Git', icon: siGit }
  ]
];

export const PROJECTS = [
  {
    id: 'motofix',
    title: 'MotoFix',
    subtitle: 'Motorcycle parts e-commerce',
    category: 'Full-Stack Web',
    image: './projects/motofix.png',
    github: 'https://github.com/EARL146/motofix_fixed',
    tech: ['Node.js', 'Express.js', 'MySQL'],
    icons: [siNodedotjs, siExpress, siMysql],
    summary: 'A motorcycle parts e-commerce platform built with Node.js, Express, and MySQL.',
    bullets: [
      'Full-stack storefront for motorcycle parts and accessories.',
      'Node.js and Express backend with a MySQL database.',
      'Project repository is available on GitHub.'
    ],
    layout: 'wide'
  },
  {
    id: 'pharmacare',
    title: 'PharmaCare',
    subtitle: 'Healthcare portal',
    category: 'Full-Stack Web',
    image: './projects/pharmacare.png',
    github: 'https://github.com/EARL146/01.2',
    tech: ['Next.js', 'TypeScript'],
    icons: [siNextdotjs, siTypescript],
    summary: 'A healthcare portal built with Next.js and TypeScript.',
    bullets: ['Healthcare-focused web portal.', 'Built with Next.js and TypeScript.', 'Project source is available on GitHub.'],
    layout: 'square'
  },
  {
    id: 'burgerbites',
    title: 'BurgerBites',
    subtitle: 'Mobile food ordering',
    category: 'Mobile App',
    image: './projects/burgerbites.png',
    imagePosition: 'center 30%',
    github: 'https://github.com/EARL146/app-',
    tech: ['Flutter', 'Dart', 'PHP', 'MySQL'],
    icons: [siFlutter, siDart, siPhp],
    summary: 'A Flutter and Dart food-ordering app connected to a PHP and MySQL API.',
    bullets: ['Cross-platform mobile ordering interface.', 'PHP API backed by MySQL.', 'Project source is available on GitHub.'],
    layout: 'tall',
    phone: true
  },
  {
    id: 'hitohouse',
    title: 'HitoHouse',
    subtitle: 'Commercial catfish ordering',
    category: 'Backend / Java',
    image: './projects/hitohouse.png',
    github: 'https://github.com/EARL146/JAVA-SYSTEM',
    tech: ['Java', 'Spring Boot'],
    icons: ['java', siSpringboot],
    summary: 'A commercial catfish ordering project built with Java Spring Boot.',
    bullets: [
      'Online ordering experience for a commercial catfish business.',
      'Java Spring Boot application.',
      'Project source is available on GitHub.'
    ],
    layout: 'wide'
  },
  {
    id: 'streetfood',
    title: 'StreetFood',
    subtitle: 'Java desktop ordering system',
    category: 'Backend / Java',
    image: './projects/streetfood-preview.svg',
    imageAlt: 'Illustrated preview of the StreetFood desktop ordering system',
    github: 'https://github.com/EARL146/JAVA-SYSTEM',
    tech: ['Java 21', 'FlatLaf Swing'],
    icons: ['java'],
    summary: 'A desktop ordering system built with Java 21 and FlatLaf Swing.',
    bullets: ['Desktop ordering application.', 'Java 21 user interface using FlatLaf Swing.', 'Project source is available on GitHub.'],
    layout: 'square'
  },
  {
    id: 'barbergo',
    title: 'BarberGo',
    subtitle: 'Client barbershop landing page',
    category: 'Client Work',
    image: './projects/barbergo-page.png',
    github: 'https://github.com/EARL146/freelancer-files',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    icons: [siHtml5, siCss, siJavascript],
    summary: 'A responsive landing page created for a barbershop client.',
    bullets: ['Client-facing barbershop web page.', 'Built with HTML, CSS, and JavaScript.', 'Project files are available on GitHub.'],
    layout: 'wide'
  },
  {
    id: 'portfolio-v1',
    title: 'Portfolio v1',
    subtitle: 'Interactive SVG portfolio',
    category: 'Portfolio',
    image: './projects/svgportfolio-preview.svg',
    imageAlt: 'Illustrated preview of Portfolio Version 1.0',
    github: 'https://github.com/EARL146/svgportfolio',
    liveDemo: 'https://earl146.github.io/svgportfolio',
    tech: ['HTML', 'CSS', 'JavaScript', 'SVG'],
    icons: [siHtml5, siJavascript],
    summary: 'The original interactive portfolio, built with SVG, HTML, CSS, and JavaScript.',
    bullets: [
      'Original portfolio version with interactive SVG graphics.',
      'Built with browser-native web technologies.',
      'Hosted on GitHub Pages.'
    ],
    layout: 'square'
  },
  {
    id: 'daylight-booking',
    title: 'Daylight Booking',
    subtitle: 'Appointment & scheduling system',
    category: 'Business System',
    image: './projects/appointment.jpg',
    imageAlt: 'Daylight appointment booking dashboard with weekly calendar and today\'s appointments',
    github: 'https://github.com/EARL146/Appointment-Booking-',
    tech: ['React', 'Vite', 'JavaScript', 'CSS'],
    icons: [siReact, siVite, siJavascript],
    summary: 'A React and Vite appointment booking workspace for managing a studio calendar, customers, and business hours.',
    bullets: [
      'Overview dashboard with daily stats, a week/day calendar, and today\'s appointment list.',
      'Appointments table with search and status filters, plus customer records.',
      'Availability settings for weekly business hours, appointment length, and buffer time.',
      'Data is saved in browser localStorage; source code is on GitHub.'
    ],
    layout: 'wide'
  },
  {
    id: 'northstar-crm',
    title: 'Northstar CRM',
    subtitle: 'Customer relationship management',
    category: 'Business System',
    image: './projects/crm.jpg',
    imageAlt: 'Northstar CRM overview dashboard with revenue chart and sales pipeline',
    github: 'https://github.com/EARL146/CRM-',
    tech: ['JavaScript', 'Vite', 'HTML5', 'CSS3'],
    icons: [siJavascript, siVite, siHtml5],
    summary: 'A responsive CRM workspace for tracking customer records, leads, sales deals, and performance reports.',
    bullets: [
      'Overview dashboard with customer and sales metrics, revenue chart, and pipeline stages.',
      'Customers, leads, and sales deals with search, create, edit, delete, and CSV export.',
      'Reports for revenue trends, lead sources, pipeline totals, and top customers.',
      'Runs in the browser with localStorage persistence (no shared database yet).'
    ],
    layout: 'square'
  },
  {
    id: 'goodswell-commerce',
    title: 'Goodswell Commerce',
    subtitle: 'E-commerce storefront & admin',
    category: 'Business System',
    image: './projects/commerce.jpg',
    imageAlt: 'Goodswell Commerce admin overview with sales chart and recent orders',
    github: 'https://github.com/EARL146/Commerce',
    tech: ['JavaScript', 'Vite', 'HTML5', 'CSS3'],
    icons: [siJavascript, siVite, siCss],
    summary: 'A self-contained e-commerce storefront and admin workspace with products, orders, and payments.',
    bullets: [
      'Storefront catalog with category filters, search, and a stock-aware shopping cart.',
      'Order management with status updates and CSV export.',
      'Admin product catalog with add, edit, delete, and inventory filters.',
      'Demo checkout only: no real payment provider is connected; data lives in localStorage.'
    ],
    layout: 'square'
  },
  {
    id: 'corestack',
    title: 'CoreStack Monorepo',
    subtitle: 'Full-stack practice archive',
    category: 'Code Archive',
    image: './projects/corestack.jpg',
    imageAlt: 'CoreStack admin dashboard page from the monorepo',
    github: 'https://github.com/EARL146/corestack-monorepo',
    tech: ['JavaScript', 'Python', 'SQL', 'Dart', 'Docker'],
    icons: [siJavascript, siPython, siPostgresql, siDocker],
    summary: 'A monorepo that collects my practice code across web, backend, databases, algorithms, mobile, and deployment config.',
    bullets: [
      'Algorithms in Python and JavaScript: sorting, BST, dynamic programming, and graph traversal.',
      'Node.js backend service files (routes, auth middleware, error handling) and SQL schemas.',
      'Flutter/Dart mobile screens plus Dockerfile, docker-compose, and nginx config.',
      'Organized as a learning archive; source is on GitHub.'
    ],
    layout: 'wide'
  },
  {
    id: 'calculator',
    title: 'Calc',
    subtitle: 'Web & Python calculators',
    category: 'Mini Project',
    image: './projects/calculator.jpg',
    imageAlt: 'Dark themed web calculator interface',
    github: 'https://github.com/EARL146/calculator-dv',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Python'],
    icons: [siHtml5, siJavascript, siPython],
    summary: 'A dark-themed browser calculator built with HTML, CSS, and JavaScript, with a separate Python version.',
    bullets: [
      'Clear, delete, percent, sign toggle, and decimal support.',
      'Web version: github.com/EARL146/calculator-dv.',
      'Python version: github.com/EARL146/calculator-py.'
    ],
    layout: 'square'
  }
];

export const METHOD = [
  {
    num: '01',
    name: 'Plan.',
    icon: 'plan',
    copy: 'We agree on scope, features and the data model before a single line of code.',
    tags: ['Scope', 'Schema', 'API map']
  },
  {
    num: '02',
    name: 'Build.',
    icon: 'build',
    copy: 'Frontend and backend are built together and checked against the real user flows.',
    tags: ['UI', 'REST API', 'MySQL']
  },
  {
    num: '03',
    name: 'Ship.',
    icon: 'ship',
    copy: 'A production build, a hosting handoff and notes you can keep.',
    tags: ['Build', 'Deploy', 'Handoff']
  }
];

export const SERVICES = [
  {
    id: 'web',
    title: 'Responsive Websites',
    short: 'Websites',
    sub: 'Pages that look right on every screen.',
    badge: 'Mobile-first',
    icons: [siHtml5, siCss, siJavascript],
    checks: ['HTML5, CSS3 and JavaScript', 'Mobile and desktop layouts', 'Semantic page structure']
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    short: 'Backend & APIs',
    sub: 'The logic and data behind the screen.',
    badge: 'REST ready',
    icons: [siSpringboot, siNodedotjs, siExpress],
    checks: ['Java and Spring Boot apps', 'Node.js and Express services', 'PHP backend endpoints']
  },
  {
    id: 'data',
    title: 'MySQL Databases',
    short: 'Databases',
    sub: 'Relational data that stays organised.',
    badge: 'Clean schemas',
    icons: [siMysql, siPhpmyadmin],
    checks: ['MySQL database integration', 'phpMyAdmin administration', 'Application data persistence']
  },
  {
    id: 'mobile',
    title: 'Flutter Mobile Apps',
    short: 'Mobile Apps',
    sub: 'One codebase, Android and iOS.',
    badge: 'Cross-platform',
    icons: [siFlutter, siDart, siPhp],
    checks: ['Flutter and Dart interfaces', 'PHP and MySQL API connections', 'Responsive app layouts']
  },
  {
    id: 'automation',
    title: 'Workflow Experiments',
    short: 'Automation',
    sub: 'Early-stage n8n and AI prototypes.',
    badge: 'Exploratory',
    icons: [siN8n, siGooglegemini],
    checks: ['Foundational n8n workflows', 'Basic AI integration', 'Small, scoped prototypes']
  }
];

/* Nodes for the interactive delivery pipeline on the Services page */
export const PIPELINE = {
  main: [
    { id: 'brief', label: 'Project Brief', sub: 'Goals and features', icon: 'zap', detail: 'You share the goal, the audience and the must-have features. I reply with questions and a first outline.' },
    { id: 'scope', label: 'Scope Agreed', sub: 'Clear deliverables', icon: 'clipboard', detail: 'Deliverables are written down so nothing grows without both of us agreeing first.' },
    { id: 'schema', label: 'Schema & API', sub: 'MySQL + REST map', icon: 'database', detail: 'Database tables and REST endpoints are mapped before UI work starts, so the foundation is solid.' },
    { id: 'build', label: 'Full-Stack Build', sub: 'UI + backend', icon: 'code', detail: 'Frontend components are wired to the backend services (Node.js or Spring Boot) and tested together.' },
    { id: 'review', label: 'Review', sub: 'Flows and states', icon: 'eye', detail: 'Main user flows, responsive layouts and error states are reviewed and refined against the agreed scope.' },
    { id: 'deploy', label: 'Deploy', sub: 'Production build', icon: 'rocket', detail: 'A production build is prepared with routing and hosting configured for a clean handoff.', accent: true }
  ],
  branch: [
    { id: 'iterate', label: 'Iterate', sub: 'Feedback round', icon: 'refresh', detail: 'Feedback from review loops back into the build until the flow feels right.' },
    { id: 'handoff', label: 'Handoff', sub: 'Repo + notes', icon: 'package', detail: 'You get the repository, setup notes and everything needed to keep the project running.', tone: 'success' }
  ]
};

export const CERTIFICATES = [
  {
    id: 'cert-05',
    num: '01',
    category: 'web',
    title: 'Full Stack Web Development + AI — Level 0',
    short: 'Full Stack + AI',
    issuer: 'Learn Technology Today',
    date: 'September 6, 2026',
    code: 'LTT-COURSE-2026-000061',
    image: './certificates/cert_fullstack_ai.png',
    thumb: './certificates/cert_05_fullstack_ai.png',
    desc: 'Full-stack development credential covering frontend architecture, backend REST APIs, relational persistence, and generative AI tool integration.',
    skills: ['Frontend', 'Backend Architecture', 'REST APIs', 'AI Integration'],
    flagship: true
  },
  {
    id: 'cert-07',
    num: '02',
    category: 'datacamp',
    title: 'Introduction to SQL',
    short: 'Intro to SQL',
    issuer: 'DataCamp',
    date: 'November 1, 2026',
    code: '#50,681,251',
    image: './certificates/cert_07_datacamp_sql.jpg',
    thumb: './certificates/cert_07_datacamp_sql.jpg',
    desc: 'DataCamp Statement of Accomplishment (2 hours) covering relational database organization, table structures, SQL querying, and data retrieval.',
    skills: ['SQL', 'Relational Databases', 'Querying']
  },
  {
    id: 'cert-08',
    num: '03',
    category: 'datacamp',
    title: 'Intermediate GitHub Concepts',
    short: 'Intermediate GitHub',
    issuer: 'DataCamp',
    date: 'November 1, 2026',
    code: '#50,676,876',
    image: './certificates/cert_08_datacamp_github_inter.jpg',
    thumb: './certificates/cert_08_datacamp_github_inter.jpg',
    desc: 'DataCamp Statement of Accomplishment (3 hours) covering advanced GitHub collaboration workflows, pull requests, code reviews, and repository administration.',
    skills: ['GitHub', 'Pull Requests', 'Code Review', 'Collaboration']
  },
  {
    id: 'cert-09',
    num: '04',
    category: 'datacamp',
    title: 'Introduction to GitHub Concepts',
    short: 'Intro to GitHub',
    issuer: 'DataCamp',
    date: 'October 31, 2026',
    code: '#50,675,858',
    image: './certificates/cert_09_datacamp_github_intro.jpg',
    thumb: './certificates/cert_09_datacamp_github_intro.jpg',
    desc: 'DataCamp Statement of Accomplishment (2 hours) covering cloud repository hosting, remote branches, issues, and foundational GitHub project workflows.',
    skills: ['GitHub', 'Remote Repos', 'Branching']
  },
  {
    id: 'cert-10',
    num: '05',
    category: 'datacamp',
    title: 'Introduction to Python for Developers',
    short: 'Python for Devs',
    issuer: 'DataCamp',
    date: 'October 31, 2026',
    code: '#50,673,623',
    image: './certificates/cert_10_datacamp_python_dev.jpg',
    thumb: './certificates/cert_10_datacamp_python_dev.jpg',
    desc: 'DataCamp Statement of Accomplishment (3 hours) covering Python programming fundamentals, data structures, control flow, and modular function design for software developers.',
    skills: ['Python', 'Data Structures', 'Functions', 'Scripting']
  },
  {
    id: 'cert-11',
    num: '06',
    category: 'datacamp',
    title: 'Intermediate Git',
    short: 'Intermediate Git',
    issuer: 'DataCamp',
    date: 'October 31, 2026',
    code: '#50,671,840',
    image: './certificates/cert_11_datacamp_git_inter.jpg',
    thumb: './certificates/cert_11_datacamp_git_inter.jpg',
    desc: 'DataCamp Statement of Accomplishment (2 hours) covering branching strategies, merge conflict resolution, commit history inspection, and remote repository synchronization.',
    skills: ['Git', 'Branching & Merging', 'Conflict Resolution']
  },
  {
    id: 'cert-12',
    num: '07',
    category: 'datacamp',
    title: 'Introduction to Git',
    short: 'Intro to Git',
    issuer: 'DataCamp',
    date: 'October 31, 2026',
    code: '#50,670,457',
    image: './certificates/cert_12_datacamp_git_intro.jpg',
    thumb: './certificates/cert_12_datacamp_git_intro.jpg',
    desc: 'DataCamp Statement of Accomplishment (2 hours) covering version control fundamentals, staging files, atomic commits, and tracking source code changes.',
    skills: ['Git', 'Version Control', 'Commits']
  },
  {
    id: 'cert-01',
    num: '08',
    category: 'web',
    title: 'Introduction to Visual Graphic Design',
    short: 'TESDA Graphic Design',
    issuer: 'TESDA Online Program',
    date: 'September 8, 2026',
    code: 'ucil0Zg8FT',
    image: './certificates/cert_01_tesda.png',
    thumb: './certificates/cert_01_tesda.png',
    desc: 'TESDA Online Program certificate for visual design principles, typography, and graphic layout design.',
    skills: ['Visual Design', 'Layout', 'Typography']
  },
  {
    id: 'cert-02',
    num: '09',
    category: 'cyber',
    title: 'Introduction to Critical Infrastructure Protection (ICIP)',
    short: 'OPSWAT ICIP',
    issuer: 'OPSWAT Academy',
    date: 'September 30, 2026',
    code: '60040x9f2g',
    image: './certificates/cert_02_icip.png',
    thumb: './certificates/cert_02_icip.png',
    desc: 'Cybersecurity credential focused on protecting critical infrastructure and industrial digital systems.',
    skills: ['Cybersecurity', 'Critical Infrastructure', 'Risk Management']
  },
  {
    id: 'cert-03',
    num: '10',
    category: 'cyber',
    title: 'Cybersecurity Fundamentals Associate (OCFA)',
    short: 'OPSWAT OCFA',
    issuer: 'OPSWAT Academy',
    date: 'September 30, 2026',
    code: 'V44oh1q9',
    image: './certificates/cert_03_ocfa.png',
    thumb: './certificates/cert_03_ocfa.png',
    desc: 'Associate certification covering foundational cybersecurity defenses, network threat vectors, and threat mitigation.',
    skills: ['Network Security', 'Threat Assessment', 'Zero Trust']
  },
  {
    id: 'cert-04',
    num: '11',
    category: 'web',
    title: 'Certificate of Participation — PyCon Davao 2026',
    short: 'PyCon Davao 2026',
    issuer: 'Python Philippines / Ateneo de Davao',
    date: 'October 17–18, 2026',
    code: 'PYCON-DVO-2026',
    image: './certificates/cert_04_pycon.png',
    thumb: './certificates/cert_04_pycon.png',
    desc: 'Participation credential from PyCon Davao 2026, covering the Python web ecosystem and developer tooling.',
    skills: ['Python', 'Community', 'Web Frameworks']
  },
  {
    id: 'cert-06',
    num: '12',
    category: 'cyber',
    title: 'LIVE: GoHighLevel Workshop',
    short: 'GHL Workshop',
    issuer: 'Excelerate Digital',
    date: 'October 27, 2026',
    code: 'EXL-GHL-2026',
    image: './certificates/cert_06_ghl_workshop.png',
    thumb: './certificates/cert_06_ghl_workshop.png',
    desc: 'Workshop certificate for marketing automation workflows, CRM pipeline design, and funnel routing.',
    skills: ['CRM Workflows', 'Automation', 'Operations']
  }
];

export const JOURNEY = [
  {
    num: '01',
    year: '2025',
    title: 'Grade 11',
    badge: 'TVL-ICT · Computer Programming',
    copy: 'Where it started: desktop systems in VB.NET and my first simple websites.',
    tags: ['VB.NET', 'Desktop apps', 'First websites'],
    icon: siDotnet
  },
  {
    num: '02',
    year: '2025 – 2026',
    title: 'Grade 12',
    badge: 'TVL-ICT · Computer Programming',
    copy: 'Dynamic web apps with HTML, CSS, JavaScript and PHP, backed by phpMyAdmin and MySQL.',
    tags: ['PHP', 'JavaScript', 'MySQL'],
    icon: siPhp
  },
  {
    num: '03',
    year: 'Now',
    title: 'BSIT',
    badge: 'Legacy Compostela College',
    copy: 'Full-stack applications with Java 21, Spring Boot, Node.js, Express and Flutter, plus 12 verified certificates along the way.',
    tags: ['Java 21', 'Spring Boot', 'Flutter'],
    icon: siSpringboot
  }
];

export const VERSIONS = [
  {
    id: 'v1',
    label: 'Version 1',
    meta: 'Original build',
    title: 'SVG Interactive Portfolio',
    copy: 'Custom SVG vector graphics, fluid animations and dark mode, built with plain HTML, CSS and JavaScript.',
    image: './projects/svgportfolio-preview.svg',
    href: 'https://earl146.github.io/svgportfolio',
    icons: [siHtml5, siCss, siJavascript]
  },
  {
    id: 'v2',
    label: 'Version 2',
    meta: 'You are here',
    title: 'React Portfolio',
    copy: 'A React and Vite app with a dashboard layout, routed pages, light and dark themes and a built-in guide bot.',
    image: './illustrations/rail-avatar.webp',
    icons: [siReact, siVite, siThreedotjs]
  }
];

export const ABOUT_ROLES = [
  { title: 'Full-Stack Web Developer', icons: [siHtml5, siJavascript, siNodedotjs] },
  { title: 'Backend · Java & Spring Boot', icons: ['java', siSpringboot, siMysql] },
  { title: 'Mobile · Flutter & Dart', icons: [siFlutter, siDart] },
  { title: 'Exploring Automation & AI', icons: [siN8n, siGooglegemini] }
];

export const FAQS = [
  {
    q: 'What do you actually build?',
    a: 'Responsive websites, backend apps and REST APIs with Java/Spring Boot, Node.js/Express or PHP, MySQL databases, and Flutter mobile apps.'
  },
  {
    q: 'How do project timelines work?',
    a: 'Timelines depend on the agreed scope, features and review steps. Share a short outline and your target date so we can set a realistic schedule.'
  },
  {
    q: 'Which technologies do you work with?',
    a: 'HTML, CSS and JavaScript; Java 21 and Spring Boot; Node.js and Express; PHP; MySQL and phpMyAdmin; and Flutter with Dart.'
  },
  {
    q: 'Do you offer n8n or AI automation?',
    a: 'n8n and AI integrations are still foundational and exploratory for me. My main focus is full-stack web, backend, databases and mobile apps.'
  },
  {
    q: 'What happens after I write?',
    a: 'I read your message, ask any questions I need answered, then reply with a suggested scope and next steps.'
  }
];

export const NAV = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/projects', label: 'Projects', icon: 'projects' },
  { path: '/services', label: 'Services', icon: 'services' },
  { path: '/lab', label: 'Dev Lab', icon: 'lab' },
  { path: '/certificates', label: 'Certificates', icon: 'certificates' },
  { path: '/about', label: 'About', icon: 'about' },
  { path: '/contact', label: 'FAQs / Contact', icon: 'contact' }
];
