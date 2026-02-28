# Prompt: Build "My Resources" Web App

Use the following prompt to recreate this application from scratch:

---

**Role:** Expert Full-Stack Developer & UI/UX Designer.

**Objective:** Build a highly engaging, single-file "My Resources" web app (`index.html`) that balances technical utility with a beautiful, consumer-grade aesthetic.

---

## Visual Identity & UI

- **Design System:** Use a "Glassmorphism" look — blurred glass cards (`backdrop-filter: blur`), subtle borders, soft box shadows, animated radial gradient orbs in the background, and plenty of whitespace.
- **Typography:** Use the **Inter** font (via Google Fonts CDN). Apply it globally.
- **Color Palette:** Indigo/violet accent (`#6366f1`). Provide both a light mode (soft `#f0f4ff` page background) and a dark mode (`#0f0e1a` page background). Use CSS custom properties (`--bg-base`, `--accent`, `--text-primary`, etc.) for all colors so that toggling dark mode is a single class swap on `<html>`.
- **Header:** Sticky, frosted-glass header with a gradient brand icon, a bold "My Resources" title on the left, and an animated dark mode toggle (Sun/Moon icons) on the right. The toggle thumb should slide smoothly and change color between amber (light) and indigo (dark).
- **Icons:** Integrate **Lucide Icons** via CDN (`https://unpkg.com/lucide@latest/dist/umd/lucide.js`). Use `data-lucide` attributes and call `lucide.createIcons()` after every DOM update.

---

## Page Layout

1. **Hero Section** — centered `<h1>` with a gradient text effect, a short subtitle paragraph, and three stat chips (total resources count, categories count, "Always Up-to-date").
2. **Controls Card** — a glassmorphism card containing:
   - A rounded search bar with a magnifying glass icon on the left and an `×` clear button that appears only when there is text.
   - A "FILTER BY CATEGORY" label followed by pill-style filter buttons — one per unique category (auto-generated), plus an "All" pill. The active pill uses the accent color with a glow shadow.
3. **Resource Table** — a glassmorphism card with:
   - A column header row: Resource, Category, Priority, Tags, URL.
   - Dynamically rendered data rows (one per entry in `RESOURCES`).
   - Spacious row padding (`22px 28px`) and a subtle `translateX(2px)` hover effect.
4. **Footer** — centered, muted text showing the total resource count.

---

## Data Table Details

### Resource Name Column
- Bold title (`1rem`, `font-weight: 600`) on top.
- Muted description text (`0.82rem`) below.

### Category Column
- Shows the category name with a matching Lucide icon. Define a `CATEGORY_ICONS` map (category string → Lucide icon name) so each category always has its own icon.

### Priority / Importance Column
Use high-polish pill badges with these exact styles:

| Value    | Background                     | Text color      | Icon                      |
|----------|--------------------------------|-----------------|---------------------------|
| `High`   | `rgba(239,68,68,0.1)` (red)   | `#b91c1c`       | Pulsing `circle` dot      |
| `Medium` | `rgba(245,158,11,0.1)` (amber)| `#92400e`       | `minus-circle`            |
| `Low`    | `rgba(16,185,129,0.1)` (green)| `#065f46`       | `check-circle`            |

Provide separate dark-mode overrides for each badge.

### Tags Column
Render each tag as a small pill. Use a cycling 8-slot color palette (indigo, emerald, amber, red, violet, sky, pink, orange — low-saturation backgrounds with matching text). Assign colors consistently via a `tagColorMap` object keyed by tag string. Provide dark-mode color variants for all 8 slots.

### URL Column
Show the hostname (stripped of `www.`), a **Copy** icon button (uses `navigator.clipboard.writeText`; shows a green `check` icon for 1.8 s after clicking), and an **Open** icon button (`<a target="_blank">`).

---

## Technical Architecture

### Data Source (`RESOURCES` array)
Define a `const RESOURCES = [...]` array at the top of the `<script>` block. Each entry is a plain object:

```js
{
  name:        "Tool Name",
  description: "One-sentence description.",
  category:    "Category",       // drives filter pills automatically
  importance:  "High",           // "High" | "Medium" | "Low"
  tags:        ["tag1", "tag2"],
  url:         "https://example.com"
}
```

Seed it with at least 10 diverse entries across categories like Documentation, Design, Backend, Deployment, AI Tools, Productivity, and Learning.

### Search Logic
Real-time fuzzy search on every `input` event. Split the query by whitespace and require every word to appear (case-insensitive substring match) within the combined string of `name + description + category + tags`. Show an empty state (`search-x` icon + message) when there are no results.

### Dark Mode
- Toggle by flipping `html.classList` between `"light"` and `"dark"`.
- Persist the choice in `localStorage`. On load, fall back to `window.matchMedia("(prefers-color-scheme: dark)")`.
- All color switching must happen purely via CSS custom properties — no JS color manipulation.

### Row Animations
New rows should fade-in with a subtle upward animation (`opacity 0 → 1`, `translateY(6px) → 0`) with a staggered `animation-delay` of `35ms × index`.

---

## Single-File Constraint

Everything — HTML structure, `<style>` block (all CSS), `<script>` block (all JS), CDN `<link>` and `<script>` tags — must live inside **one `index.html` file**. No build tools, no external CSS files, no modules.

---

## Documentation

Also create a `CLAUDE.md` file (in the same directory) that documents:
1. Project structure
2. How to add/edit entries in `RESOURCES`
3. How to add a new category with a custom icon
4. The importance badge color-coding logic
5. The tag color-cycling logic
6. How search works
7. How dark mode works (toggle + persistence)
8. The full tech stack table (Lucide, Inter, Vanilla CSS/JS)
