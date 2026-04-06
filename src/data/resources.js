export const RESOURCES = [
    {
    name: "A lightweight spec-driven framework",
    description: "A lightweight spec-driven framework by Fission AI",
    category: "AI Workflow",
    importance: "High",
    tags: ["ai", "workflow", "spec"],
    url: "https://openspec.dev/"
  },
    {
    name: "arena.ai Leaderboard",
    description: "See how leading AI models stack up across text, image, vision, and more",
    category: "AI Education",
    importance: "High",
    tags: ["ai", "leaderboard", "models"],
    url: "https://arena.ai/leaderboard/"
  },
  {
    name: "Massachusetts AI Hub",
    description: "Resources for AI training and workforce development in Massachusetts.",
    category: "AI Education",
    importance: "High",
    tags: ["ai", "boston", "workforce", "massachusetts"],
    url: "https://aihub.masstech.org/"
  },
  {
    name: "Object-Oriented Programming in Python",
    description: "Object-Oriented Programming in Python.",
    category: "Python",
    importance: "Medium",
    tags: ["python", "oop", "programming"],
    url: "https://realpython.com/python3-object-oriented-programming/"
  },
    {
    name: "Signal Awards",
    description: "Recognize the best podcast being made today.",
    category: "Podcasts",
    importance: "Medium",
    tags: ["podcasts", "awards"],
    url: "https://signalaward.com/"
  },
  {
    name: "Prompting guide 101",
    description: "How to write effective prompts.",
    category: "Tutorials",
    importance: "High",
    tags: ["prompts", "ai", "llm"],
    url: "https://workspace.google.com/resources/ai/writing-effective-prompts/"
  },
  {
    name: "Learn Prompting",
    description: "Prompt Engineering Guide.",
    category: "Tutorials",
    importance: "High",
    tags: ["prompts", "ai", "llm"],
    url: "https://learnprompting.org/docs/introduction"
  },
   {
    name: "AI for Professionals Who Don't Code",
    description: "AI for Professionals Who Don't Code.",
    category: "Claude Code",
    importance: "High",
    tags: ["ai", "professional", "code"],
    url: "https://claudeblattman.com/"
  },
  {
    name: "Anthropic Academy",
    description: "Learn about Claude and how to use it effectively.",
    category: "Tutorials",
    importance: "High",
    tags: ["prompts", "agents", "llm"],
    url: "https://anthropic.skilljar.com/"
  },
  
  {
    name: "Lucide Icons",
    description: "Beautiful & consistent open-source icon set for the web.",
    category: "Design",
    importance: "Medium",
    tags: ["icons", "svg", "design", "ui"],
    url: "https://lucide.dev"
  },
  {
    name: "Supabase",
    description: "Open-source Firebase alternative with Postgres, auth, and storage.",
    category: "Backend",
    importance: "High",
    tags: ["database", "backend", "postgres", "auth"],
    url: "https://supabase.com"
  },
  {
    name: "Vercel",
    description: "Deploy frontend projects instantly with zero configuration.",
    category: "Deployment",
    importance: "High",
    tags: ["hosting", "deployment", "frontend", "ci/cd"],
    url: "https://vercel.com"
  },
  {
    name: "GitHub Copilot Docs",
    description: "Official documentation and prompt engineering tips for Copilot.",
    category: "AI Education",
    importance: "Medium",
    tags: ["ai", "copilot", "productivity", "coding"],
    url: "https://docs.github.com/en/copilot"
  },
  {
    name: "Excalidraw",
    description: "Virtual whiteboard for sketching hand-drawn-like diagrams.",
    category: "Productivity",
    importance: "Low",
    tags: ["design", "diagrams", "collaboration", "whiteboard"],
    url: "https://excalidraw.com"
  },
  {
    name: "CSS Tricks — Flexbox Guide",
    description: "Complete visual guide to CSS Flexbox layout.",
    category: "Styling",
    importance: "Medium",
    tags: ["css", "flexbox", "layout", "reference"],
    url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox"
  },
  {
    name: "Notion",
    description: "All-in-one workspace for notes, docs, and project management.",
    category: "Productivity",
    importance: "Medium",
    tags: ["notes", "productivity", "collaboration", "docs"],
    url: "https://notion.so"
  },
  {
    name: "Figma",
    description: "Collaborative UI design tool for creating wireframes and prototypes.",
    category: "Design",
    importance: "High",
    tags: ["design", "ui", "prototyping", "collaboration"],
    url: "https://figma.com"
  },
  {
    name: "Can I Use",
    description: "Check browser support tables for frontend web technologies.",
    category: "Documentation",
    importance: "Low",
    tags: ["css", "html", "browser", "compatibility"],
    url: "https://caniuse.com"
  },
  {
    name: "Roadmap.sh",
    description: "Community-driven interactive roadmaps for developers.",
    category: "Learning",
    importance: "Medium",
    tags: ["learning", "career", "roadmap", "guide"],
    url: "https://roadmap.sh"
  },
  {
    name: "Ray.so",
    description: "Create beautiful images of your code snippets for sharing.",
    category: "Productivity",
    importance: "Low",
    tags: ["design", "screenshots", "code", "sharing"],
    url: "https://ray.so"
  },
  {
    name: "Firebase",
    description: "Google's platform for building web and mobile apps with cloud services.",
    category: "Backend",
    importance: "High",
    tags: ["backend", "auth", "database", "google"],
    url: "https://firebase.google.com"
  }
];

export const CATEGORY_ICONS = {
  "Documentation": "BookOpen",
  "Styling":       "Paintbrush",
  "Design":        "PenTool",
  "Backend":       "Server",
  "Deployment":    "CloudUpload",
  "AI Tools":      "Cpu",
  "Productivity":  "Zap",
  "Learning":      "GraduationCap",
  "AI Workflow":   "Workflow",
  "AI Education":  "BrainCircuit",
  "Python":        "Code",
  "Podcasts":      "Headphones",
  "Tutorials":     "BookMarked",
  "Claude Code":   "Terminal",
  "Default":       "Folder"
};

export const CATEGORY_STYLES = {
  "All": {
    color: "#C89B3C",
    bg: "rgba(200, 155, 60, 0.14)",
    border: "rgba(200, 155, 60, 0.32)"
  },
  "AI Workflow": {
    color: "#D0A35B",
    bg: "rgba(208, 163, 91, 0.14)",
    border: "rgba(208, 163, 91, 0.32)"
  },
  "AI Education": {
    color: "#6FA7C9",
    bg: "rgba(111, 167, 201, 0.14)",
    border: "rgba(111, 167, 201, 0.32)"
  },
  "Python": {
    color: "#4E79A7",
    bg: "rgba(78, 121, 167, 0.14)",
    border: "rgba(78, 121, 167, 0.32)"
  },
  "Podcasts": {
    color: "#A65A7A",
    bg: "rgba(166, 90, 122, 0.14)",
    border: "rgba(166, 90, 122, 0.32)"
  },
  "Tutorials": {
    color: "#5C8A72",
    bg: "rgba(92, 138, 114, 0.14)",
    border: "rgba(92, 138, 114, 0.32)"
  },
  "Claude Code": {
    color: "#8B6FAE",
    bg: "rgba(139, 111, 174, 0.14)",
    border: "rgba(139, 111, 174, 0.32)"
  },
  "Design": {
    color: "#C07A3F",
    bg: "rgba(192, 122, 63, 0.14)",
    border: "rgba(192, 122, 63, 0.32)"
  },
  "Backend": {
    color: "#4F8C88",
    bg: "rgba(79, 140, 136, 0.14)",
    border: "rgba(79, 140, 136, 0.32)"
  },
  "Deployment": {
    color: "#5E7290",
    bg: "rgba(94, 114, 144, 0.14)",
    border: "rgba(94, 114, 144, 0.32)"
  },
  "Productivity": {
    color: "#B59A4C",
    bg: "rgba(181, 154, 76, 0.14)",
    border: "rgba(181, 154, 76, 0.32)"
  },
  "Styling": {
    color: "#6C9A8B",
    bg: "rgba(108, 154, 139, 0.14)",
    border: "rgba(108, 154, 139, 0.32)"
  },
  "Documentation": {
    color: "#8E9AA7",
    bg: "rgba(142, 154, 167, 0.14)",
    border: "rgba(142, 154, 167, 0.32)"
  },
  "Learning": {
    color: "#C28A52",
    bg: "rgba(194, 138, 82, 0.14)",
    border: "rgba(194, 138, 82, 0.32)"
  },
  "Default": {
    color: "#C89B3C",
    bg: "rgba(200, 155, 60, 0.14)",
    border: "rgba(200, 155, 60, 0.32)"
  }
};
