# Knowledge Hub / My URL Library

A curated, searchable collection of personal resources, tools, and references — all in one modern, animated, and responsive interface.

![My URL Library Preview](./backup_index.html) *(See live preview on GitHub Pages!)*

## 🚀 Features

*   **Modern React Stack**: Built rapidly using Vite, React, and Chakra UI for robust components.
*   **Search & Filter**: Real-time fuzzy search and category filtering for quickly finding resources.
*   **Built-in Dark Mode**: A sleek "Quantum Aurora" aesthetic that supports both dark and light modes, persisting your preference automatically.
*   **Interactive UI**: Animated list entries with Framer Motion, glassmorphism UI traits, and instant "copy to clipboard" buttons for URLs.
*   **URL of the Day**: A pseudo-random resource prominently displayed each day based on the calendar date.
*   **Automated Hosting**: Out-of-the-box support for deploying directly to GitHub Pages via GitHub Actions CI/CD.

## 🛠️ Tech Stack

*   **Framework**: [React 18](https://react.dev/) via [Vite](https://vitejs.dev/)
*   **UI Library**: [Chakra UI](https://chakra-ui.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Hosting**: [GitHub Pages](https://pages.github.com/) with automated deployments via [GitHub Actions](https://github.com/features/actions)

## 🏃‍♂️ Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/senthilcaesar/resources.git
    cd resources
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Navigate to `http://localhost:5173/resources/` (Note the `/resources/` base path configured for GitHub Pages).

## 📝 Managing Data

All resources populate the interface from a central data array.
To add, edit, or remove resources, simply modify the `RESOURCES` array in [`src/data/resources.js`](src/data/resources.js).

```javascript
{
  name: "New Tool Name",
  description: "A short description of what this does.",
  category: "Design", // Ensure this matches an existing category or it'll default to the folder icon
  importance: "Medium", // High | Medium | Low
  tags: ["ui", "tools", "web"],
  url: "https://example.com"
}
```

You can also assign specific Lucide icons to your custom categories by editing the `CATEGORY_ICONS` mapping at the bottom of the same file.

## 🌍 Deployment

This repository includes a `.github/workflows/main.yml` file designed to automatically build and deploy the application to GitHub Pages whenever changes are pushed to the `main` branch.

**To enable this:**
1. Navigate to your repository **Settings** on GitHub.
2. Click on **Pages** in the left sidebar.
3. Under **Build and deployment -> Source**, select **GitHub Actions**.
4. Push your changes to the `main` branch to trigger your first automated deployment!

## 📜 License

MIT License. Feel free to use this as a template for your own personal knowledge base!
