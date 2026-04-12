export const projects = [
  {
    id: 1,
    name: "Second Brain",
    subtitle: "Full Stack Knowledge App",
    description:
      "Designed and developed a full-stack knowledge management platform to store, organize, and share content using links, tags, and content types. Built with JWT-based authentication, unique hash-based sharing and efficient tag normalization for scalable data handling.",
    tags: ["TypeScript", "Node.js", "Express", "MongoDB", "JWT", "React"],
    type: "Full Stack",
    image: "/projects/second-brain.png", // ← add screenshot here
    frontendUrl: "https://github.com/Samarth-2409X/BrainlyFrontend",
    backendUrl: "https://github.com/Samarth-2409X/BrainlyBackend",
    emoji: "🧠",
    color: "#7c3aed",
  },
  {
    id: 2,
    name: "Pocket Money",
    subtitle: "FinTech Web App",
    description:
      "Designed and developed a personal finance tracking application to manage daily expenses, budgets, and cash flow. Focused on solving real-world financial tracking challenges with a clean and user-friendly experience.",
    tags: ["JavaScript", "Node.js", "MongoDB", "Express"],
    type: "Full Stack",
    image: "/projects/pocket-money.png", // ← add screenshot here
    url: "https://github.com/Samarth-2409X/Pocket_Money",
    emoji: "💰",
    color: "#6d28d9",
  },
  {
    id: 3,
    name: "Course Selling App",
    subtitle: "Backend API",
    description:
      "Designed and developed a RESTful backend for an e-learning platform, enabling course management, user authentication, and scalable content delivery.",
    tags: ["JavaScript", "Node.js", "Express", "MongoDB"],
    type: "Backend",
    image: "/projects/course-app.png", // ← add screenshot here
    url: "https://github.com/Samarth-2409X/course_selling_app_backend",
    emoji: "📚",
    color: "#5b21b6",
  },
];

export const skills = {
  Languages: ["JavaScript", "TypeScript", "C++", "C", "HTML5", "CSS3"],
  Frontend: ["React", "Next.js", "Tailwind CSS", "React Router"],
  Backend: ["Node.js", "Express.js", "JWT", "REST APIs"],
  Databases: ["MongoDB", "MySQL", "PostgreSQL"],
  Tools: ["Git", "GitHub", "NPM", "PNPM", "VS Code"],
};