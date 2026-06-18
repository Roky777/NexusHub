# 🧊 NexusHub
### One Dashboard. Six Powerful Tools.

NexusHub is a unified productivity dashboard that brings together six independent modules into a single, clean interface — built entirely with **vanilla HTML, CSS, and JavaScript** (no frameworks, no build step).

🔗 **Live Demo:** [https://nexus-hub-team.vercel.app/](https://nexus-hub-team.vercel.app/)

---

## ✨ Modules

| Module | Description |
|--------|-------------|
| 🏠 **Home** | Landing dashboard with project stats overview |
| 🧠 **Quiz** | Interactive JavaScript quiz with score, timer, and progress tracking |
| 💰 **Expense** | Income/expense tracker with summary cards, categories, and filters |
| 📰 **News** | Live news headlines by category and search (powered by GNews API) |
| 🐙 **GitHub** | GitHub user explorer — search profiles, repos, and language breakdown |
| 📋 **Kanban** | Trello-style drag-and-drop task board with persistent columns and cards |

---

## 🛠️ Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties (design tokens), flexbox, responsive layout
- **Vanilla JavaScript (ES Modules)** — no frameworks, no build step
- **localStorage** — client-side persistence (Kanban, Expense)
- **GNews API** — live news data

---

## 📂 Project Structure

```
nexushub/
├── index.html              # App shell + all module sections
├── css/
│   ├── variables.css       # Design tokens (colors, spacing, typography)
│   ├── main.css            # Reset + base styles
│   ├── layout.css          # App shell (header, sidebar, content)
│   ├── home.css
│   ├── quiz.css
│   ├── expense.css
│   ├── news.css
│   ├── github.css
│   └── kanban.css
├── js/
│   ├── app.js              # Navigation + view switching
│   ├── router.js           # Show/hide views
│   └── modules/
│       ├── quiz/
│       ├── expense/
│       ├── news/
│       ├── Github/
│       └── kanban/         # state · render · dragdrop · storage · controller
└── assets/
```

Each module follows the same principle: **one job per file** (state → render → events).

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Roky777/NexusHub.git
cd NexusHub
```

### 2. Add your News API key

The News module uses [GNews](https://gnews.io). Get a free API key, then create the config file:

```bash
# Create the file
touch js/modules/news/config.js
```

Add this inside:

```js
export const API_KEY = "YOUR_GNEWS_API_KEY";
```

### 3. Run it

It's a static site — no build step needed. Just open `index.html`, or use a local server:

- **VS Code:** Right-click `index.html` → *Open with Live Server*
- **Terminal:**
  ```bash
  npx serve
  # or
  python3 -m http.server
  ```

---

## 📱 Responsive Design

Fully responsive across all screen sizes — the sidebar collapses into a menu on mobile, and the Kanban board switches from horizontal drag-and-drop to a vertical, touch-friendly layout.

---

## 👥 Contributors — Team Nexus

| Module | Contributor |
|--------|-------------|
| 🧠 Quiz | Aryan Gupta ([@Aryan1i](https://github.com/Aryan1i)) |
| 📰 News | Mehul Raj |
| 🐙 GitHub Explorer | Govind Sharma ([@GovindSharma-rgb](https://github.com/GovindSharma-rgb)) |
| 💰 Expense Tracker | Ruben ([@rubensot25-ship-it](https://github.com/rubensot25-ship-it)) |
| 📋 Kanban Board | Roky ([@Roky777](https://github.com/Roky777)) |

> Capstone Project — built collaboratively by Team Nexus.

---

## 📄 License

This project is for educational purposes only.
