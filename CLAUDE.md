# HyperVault Resources — Developer Guide

HyperVault is a developer and AI resource knowledge hub built with React 18, Vite, Framer Motion, and custom CSS design tokens.

## Project Structure

```
resources/
├── src/
│   ├── components/
│   │   ├── BentoView.jsx            # 3D interactive bento cards with cursor spotlight
│   │   ├── TerminalView.jsx         # Keyboard-first developer HUD telemetry mode
│   │   ├── DenseTableView.jsx       # Sortable high-density data matrix
│   │   ├── CommandPalette.jsx       # ⌘K / Ctrl+K Spotlight command modal
│   │   ├── ResourceRouletteModal.jsx# Serendipitous tool discovery rolling dice
│   │   ├── QuickPreviewModal.jsx    # Slide-over drawer with code snippets & related links
│   │   ├── Header.jsx               # Sticky frosted navbar with view switcher & filters
│   │   ├── Sidebar.jsx              # Category, priority, and multi-tag filter panel
│   │   └── TechStackModal.jsx       # Project architecture information modal
│   ├── data/
│   │   └── resources.js             # Resources dataset, categories, icons, and helper methods
│   ├── hooks/
│   │   ├── useBackpack.js           # Bookmarks persistence (localStorage)
│   │   └── useSoundEffects.js       # Web Audio API synthesizer chimes & sound toggles
│   ├── App.jsx                      # Main application orchestrator and state machine
│   ├── index.css                    # Design tokens for Cyber Nebula, Nordic, and Emerald themes
│   └── main.jsx                     # Entry mount point
├── index.html                       # HTML root with typography fonts
└── package.json                     # Dependencies and scripts
```

---

## Interactive View Modes

HyperVault features 3 switchable interactive views:
1. **⚡ Bento Matrix (`viewMode: 'bento'`)**: Dynamic cards with interactive cursor spotlight glow, category accent halos, inline code indicators, and 1-click bookmarking.
2. **💻 Terminal HUD (`viewMode: 'terminal'`)**: Developer HUD with full keyboard navigation (`j`/`k` to navigate, `Enter` to open, `Space` to inspect, `c` to copy, `b` to bookmark).
3. **📊 Dense Data Table (`viewMode: 'table'`)**: High-density sortable table with multi-column sorting (Name, Category, Priority, Starred).

---

## Key Shortcuts & Interactions

- **⌘K / Ctrl+K**: Open Spotlight Command Palette
- **Roulette Button**: Roll the dice for a random tool discovery
- **Backpack / Pin Star**: 1-click save to personal collection (persisted in `localStorage`)
- **Sound Toggle**: Enable/disable subtle Web Audio synthesizer chimes
- **Theme Switcher**: Cycle between *Cyber Nebula*, *Nordic Editorial*, and *Emerald Matrix*

---

## Development Scripts

```bash
# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
