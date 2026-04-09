export const RESOURCES = [
  {
    name: "Claude Code Blog",
    description: "Claude Code Blog.",
    category: "AI Workflow",
    importance: "High",
    tags: ["ai", "claude code", "blog"],
    url: "https://claude.com/blog"
  },  
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
    color: "var(--cat-orange-text)",
    bg: "var(--cat-orange-bg)",
    border: "var(--cat-orange-border)"
  },
  "AI Workflow": {
    color: "var(--cat-orange-text)",
    bg: "var(--cat-orange-bg)",
    border: "var(--cat-orange-border)"
  },
  "AI Education": {
    color: "var(--cat-orange-text)",
    bg: "var(--cat-orange-bg)",
    border: "var(--cat-orange-border)"
  },
  "Python": {
    color: "var(--cat-blue-text)",
    bg: "var(--cat-blue-bg)",
    border: "var(--cat-blue-border)"
  },
  "Podcasts": {
    color: "var(--cat-neutral-text)",
    bg: "var(--cat-neutral-bg)",
    border: "var(--cat-neutral-border)"
  },
  "Tutorials": {
    color: "var(--cat-green-text)",
    bg: "var(--cat-green-bg)",
    border: "var(--cat-green-border)"
  },
  "Claude Code": {
    color: "var(--cat-orange-text)",
    bg: "var(--cat-orange-bg)",
    border: "var(--cat-orange-border)"
  },
  "Design": {
    color: "var(--cat-green-text)",
    bg: "var(--cat-green-bg)",
    border: "var(--cat-green-border)"
  },
  "Backend": {
    color: "var(--cat-blue-text)",
    bg: "var(--cat-blue-bg)",
    border: "var(--cat-blue-border)"
  },
  "Deployment": {
    color: "var(--cat-blue-text)",
    bg: "var(--cat-blue-bg)",
    border: "var(--cat-blue-border)"
  },
  "Productivity": {
    color: "var(--cat-neutral-text)",
    bg: "var(--cat-neutral-bg)",
    border: "var(--cat-neutral-border)"
  },
  "Styling": {
    color: "var(--cat-green-text)",
    bg: "var(--cat-green-bg)",
    border: "var(--cat-green-border)"
  },
  "Documentation": {
    color: "var(--cat-neutral-text)",
    bg: "var(--cat-neutral-bg)",
    border: "var(--cat-neutral-border)"
  },
  "Learning": {
    color: "var(--cat-green-text)",
    bg: "var(--cat-green-bg)",
    border: "var(--cat-green-border)"
  },
  "Default": {
    color: "var(--cat-orange-text)",
    bg: "var(--cat-orange-bg)",
    border: "var(--cat-orange-border)"
  }
};
