// Resume, project, experience, and skill definitions for Abhijit's Portfolio

export interface Project {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    videoSrc: string;
    fallbackVideoSrc: string;
    tech: string[];
}

export interface ExperiencePoint {
    id: number;
    title: string;
    percentage: number;
    description: string;
}

export interface SkillPoint {
    id: number;
    title: string;
    description: string;
    percentage: number;
}

export const RESUME_TEXT = `---------------------------------------------------------
                     ABHIJIT V
---------------------------------------------------------
Web Developer & Full Stack Developer
Location: Chennai, Tamil Nadu, India
Phone: +91 9840549063
Email: vabi3388@gmail.com
LinkedIn: https://www.linkedin.com/in/abhijit-v-3a05a9359/
GitHub: https://github.com/vabi3388-ai

=========================================================
ABOUT ME
=========================================================
- Experienced in scalable platform infrastructure and deployment workflows.
- Skilled in automation, monitoring, and maintaining reliable systems.
- Strong understanding of AI tools and open-source technologies that are used to develop them.
- Student of Sri Sairam Engineering College (2025 - 2029) striving to learn more about developing and its components.

=========================================================
EDUCATION
=========================================================
* Sri Sairam Engineering College [2025 - 2029]
  Bachelor's in Computer Science Engineering (AI/ML)
  - Studied system artificial intelligence and machine learning.
  - Focused on AI and its usage.

* Padma Sarangapani School [2023 - 2025]
  Higher Secondary Education
  - Focused on computer science fundamentals.
  - Participated in technical learning activities.

=========================================================
INTERNSHIP EXPERIENCE
=========================================================
* Code Neptune (15 Working Days) - Student Intern
  - Developed hands-on experience in using integrated technologies.
  - Learned application development and working progress step-by-step.
  - Gained huge experience in live websites, structures, and systems.

=========================================================
ACHIEVEMENTS & PROJECTS
=========================================================
- Participated in a hackathon in my first year and was a finalist.
- Developed a short web application that made my first win in an IEEE society event.
- Leaded my team in ideathon presentations for over three projects.
- Experience working with VS Code and Firebase Studio.
- Completed Courses:
  1. Artificial Intelligence and its Fundamentals
  2. Programming languages basic to advanced
  3. AI tool automation structures along its functions

=========================================================
TECHNICAL PACK & LANGUAGES
=========================================================
- Tech Pack: Automation, Programming, Developing, Monitoring, Leading
- Languages: Knows C, C++, Python, SQL, HTML, CSS (Basic).
- Certified user of 20+ AI tools and passionate about blending languages to use them as one.
---------------------------------------------------------`;

export const PROJECTS_DATA: Project[] = [
    {
        id: 1,
        title: "First Project: My Works - HTML/CSS/JavaScript Portal",
        subtitle: "Responsive Web UI Design with Core Front-End Technologies",
        description: "A comprehensive portfolio showcasing my initial web development work built with pure HTML5, CSS3, and vanilla JavaScript. This project demonstrates semantic markup, responsive design patterns, and interactive DOM manipulation without any frameworks.",
        videoSrc: "/assets/project1.mp4",
        fallbackVideoSrc: "https://assets.mixkit.co/videos/preview/mixkit-code-running-on-a-computer-screen-animated-mockup-32822-large.mp4",
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    },
    {
        id: 2,
        title: "Second Project: My Portfolio - Modern React Interface",
        subtitle: "Full-Featured Portfolio Dashboard with Advanced Styling",
        description: "An advanced portfolio project built with React and Tailwind CSS, showcasing modern web development practices. Features a fully responsive layout, dark mode toggle, smooth scroll navigation, intersection observers for active section tracking, and beautiful glassmorphic UI components with animated transitions.",
        videoSrc: "/assets/project2.mp4",
        fallbackVideoSrc: "https://assets.mixkit.co/videos/preview/mixkit-web-development-programming-on-dual-monitors-42217-large.mp4",
        tech: ["React.js", "Tailwind CSS", "TypeScript", "UI/UX Design"],
    },
    {
        id: 3,
        title: "Third Project: My Works - Full Stack Development",
        subtitle: "Complete Development Workflow & Component Architecture",
        description: "A comprehensive demonstration of my development process from concept to implementation. This project showcases working with JSX components, state management with React hooks, building interactive features, responsive component design, and the complete workflow of modern full-stack development. Features include form validation, dynamic data rendering, and smooth user interactions.",
        videoSrc: "/assets/project3.mp4",
        fallbackVideoSrc: "https://assets.mixkit.co/videos/preview/mixkit-monitor-screen-displaying-server-status-or-programming-logs-34407-large.mp4",
        tech: ["React", "JSX", "Hooks", "Component Architecture", "Full Stack"],
    },
];

export const EXPERIENCE_POINTS: ExperiencePoint[] = [
    {
        id: 1,
        title: "HTML Architecture",
        percentage: 95,
        description: "Mastered modern semantic markup, responsive frameworks, grid layouts, and clean DOM structures.",
    },
    {
        id: 2,
        title: "CSS and Visual Design",
        percentage: 90,
        description: "Experienced in responsive styles, glassmorphism, glowing custom borders, and beautiful interactive keyframe animations.",
    },
    {
        id: 3,
        title: "React Modern Frontend",
        percentage: 85,
        description: "Proficient in component states, React hooks, custom transition effects, and dynamic rendering workflows.",
    },
    {
        id: 4,
        title: "MongoDB",
        percentage: 75,
        description: "Skilled in document-based schemas, database querying, data storage collections, and cloud database connections.",
    },
    {
        id: 5,
        title: "Structured Working Systems",
        percentage: 88,
        description: "Learned live website architecture, deployment, structure layouts, and automated workflows that react dynamically and reply with accuracy.",
    },
];

export const TECHNICAL_SKILLS: SkillPoint[] = [
    {
        id: 1,
        title: "Full Stack Developer",
        percentage: 85,
        description: "Ambitious developer comfortable writing responsive visual layouts, modular components, and server-side logic in deep integrations.",
    },
    {
        id: 2,
        title: "Critical Problem Solver",
        percentage: 92,
        description: "Finalist in Hackathons, leading development teams to think outside the box and solve complex problems logically.",
    },
    {
        id: 3,
        title: "6+ Programming Languages Known",
        percentage: 90,
        description: "Skilled in C, C++, Python, SQL, HTML, CSS, and modern TypeScript logic and frameworks.",
    },
    {
        id: 4,
        title: "Worked Intern",
        percentage: 100,
        description: "Gained significant hands-on live industry experience working at Code Neptune for 15 working days, grasping live system workflows.",
    },
    {
        id: 5,
        title: "Creative Learner & Developer",
        percentage: 95,
        description: "Always learning and experimenting, blending different stacks to design beautiful software that works as one unified experience.",
    },
    {
        id: 6,
        title: "Certified AI Tool User",
        percentage: 98,
        description: "Power user of 20+ advanced generative and analytical AI tools, boosting development speed, automated structural audits, and designs.",
    },
    {
        id: 7,
        title: "Eager to Learn More",
        percentage: 100,
        description: "Highly motivated student at Sairam Engineering, constantly exploring newer frameworks, databases, and platform infrastructure.",
    },
];
