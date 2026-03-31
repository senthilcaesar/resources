# My Resources — Developer Guide

## Project Structure

```
resources/
├── index.html   # Single-file app (all HTML, CSS, and JS in one file)
└── CLAUDE.md    # This guide
```

Everything lives in `index.html`. There are no build steps, dependencies to install, or servers to run. Open `index.html` directly in any modern browser.

---

## How to Update the RESOURCES Array

The data source is the `RESOURCES` array near the top of the `<script>` block in `index.html`. Each entry is a JavaScript object:

```js
{
  name:        "MDN Web Docs",           // Display title (string, required)
  description: "The definitive ref…",   // Short 1-sentence blurb (string, required)
  category:    "Documentation",          // Category string — used for filter pills
  importance:  "High",                   // "High" | "Medium" | "Low" (case-sensitive)
  tags:        ["html", "css", "js"],    // Array of lowercase tag strings
  url:         "https://developer.mozilla.org"  // Full URL (https://...)
}
```

### Adding a Resource

1. Open `index.html` in any text editor.
2. Locate the `const RESOURCES = [` declaration inside the `<script>` tag.
3. Append a new object inside the array, following the format above.
4. Save the file and refresh the browser.

### Adding a New Category

Just use a new string in the `category` field. The filter pill will appear automatically.

To assign a custom icon to a new category, add an entry to `CATEGORY_ICONS` (just below `RESOURCES`):

```js
const CATEGORY_ICONS = {
  "My New Category": "star",   // Any Lucide icon name
  ...
};
```

Browse available icons at [lucide.dev](https://lucide.dev).

---

## Color-Coding Logic

### Importance Badges

| Value    | Appearance                          | Icon         |
|----------|-------------------------------------|--------------|
| `High`   | Soft red background · dark red text | Pulsing dot  |
| `Medium` | Soft amber background · brown text  | Minus circle |
| `Low`    | Soft emerald background · green text| Check circle |

Styles are defined by the CSS classes `.badge-high`, `.badge-medium`, and `.badge-low` in the `<style>` block. Both light and dark mode variants are included.

### Tag Pills

Tags cycle through 8 muted color slots (`tag-0` … `tag-7`), each defined with a low-saturation pastel background and matching text color. Once a tag is assigned a color slot, it stays consistent throughout the session (tracked via the `tagColorMap` object in JS).

Colors used (light/dark variants for each):
| Slot | Hue      |
|------|----------|
| 0    | Indigo   |
| 1    | Emerald  |
| 2    | Amber    |
| 3    | Red      |
| 4    | Violet   |
| 5    | Sky      |
| 6    | Pink     |
| 7    | Orange   |

---

## Search Logic

The search bar uses a **multi-word fuzzy match** implementation:

- Input is split by whitespace into individual words.
- Every word must be present (as a substring) in a combined haystack of `name + description + category + tags`.
- Matching is case-insensitive.
- Results update in real-time on every keystroke.

---

## Dark Mode

Dark mode is toggled by the Sun/Moon button in the header. The preference is saved to `localStorage` and respected on the next page load. The OS-level `prefers-color-scheme` setting is used as the default when no preference has been saved yet.

---

## Tech Stack

| Technology     | Purpose                        | Source      |
|----------------|--------------------------------|-------------|
| Vanilla HTML/CSS/JS | UI, logic, styling       | Inline      |
| Lucide Icons   | Icon set                       | CDN (`unpkg`) |
| Inter Font     | Typography                     | Google Fonts |
| CSS Custom Properties | Theming (light/dark)  | Inline `:root` |
