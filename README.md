# Aurelia | Luxury Travel Website

![Aurelia Banner](https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=1200)

Aurelia is a premium, fully responsive luxury travel web application. It is designed to showcase curated global destinations, exclusive high-end experiences, and immersive travel journals. Built with a relentless focus on high-end aesthetics, fluid typography, and seamless micro-animations, Aurelia delivers a state-of-the-art, app-like user experience directly in the browser.

## ✨ Key Features

- **Fluid Typography System**: Implements CSS `clamp()` to dynamically scale all headings and body text based on the user's viewport width. Text is never too large on mobile nor too small on ultrawide monitors.
- **Scroll-Triggered Micro-Animations**: Elements gracefully fade and slide into view as you scroll down the page. Animations are configured to re-trigger every time the element enters the viewport, making the site feel alive.
- **Custom Global Notification System (Toasts)**: Features a globally accessible `ToastProvider` that replaces jarring native browser `alert()` popups with elegant, animated, auto-dismissing toast notifications.
- **Immersive Destination Modals**: Clicking on a destination card opens a highly detailed modal overlay via React Portals, featuring scrollable extensive descriptions and curated highlight lists.
- **Responsive CSS Grid Layouts**: The UI is built mobile-first. Card grids cleanly stack into 2-columns on mobile (with tightened padding) and expand up to 4-columns on desktop.
- **Custom Theming**: A tailored luxury color palette—warm ivories, sophisticated golds, and deep charcoals—managed entirely through centralized CSS variables.
- **Custom SVG Branding**: Includes a bespoke, handcrafted SVG favicon monogram (the golden 'A') replacing standard framework defaults.
- **No-Scrollbar UI**: Global custom scrollbars are hidden across all browsers to maintain a clean, immersive visual experience, while fully retaining normal scrolling functionality.

## 🛠️ Technology Stack

- **Core Library**: React 18
- **Build Tool**: Vite (for lightning-fast Hot Module Replacement and optimized production bundling)
- **Styling**: Vanilla CSS (utilizing modern features like Flexbox, CSS Grid, CSS Variables, and mathematical functions)
- **Icons**: Lucide React (for lightweight, scalable vector icons)
- **State Management**: React Context API (for global state like Favorites and Toasts)
- **DOM Manipulation**: React Portals (for breaking Modals out of the standard DOM hierarchy)
- **Hooks**: Custom hooks (e.g., `useInView` wrapping the native Intersection Observer API)

## 📂 Project Structure

```text
├── public/
│   └── aurelia-logo.svg       # Custom designed SVG Favicon
├── src/
│   ├── components/            # Reusable UI Components
│   │   ├── DestinationCard    # Individual destination display
│   │   ├── DestinationModal   # Pop-up modal for deep-dive destination details
│   │   ├── ExperienceCard     # Individual experience display
│   │   ├── JournalCard        # Individual journal entry display
│   │   ├── Navbar             # Fixed, scroll-aware navigation menu
│   │   ├── Footer             # 4-column responsive global footer
│   │   └── Newsletter         # Newsletter subscription CTA
│   ├── context/               # Global State Management
│   │   ├── FavoritesContext   # Manages saved/favorited items
│   │   └── ToastContext       # Manages global notification queue and rendering
│   ├── data/                  # Mock Data / Content
│   │   ├── destinations.js    # Array of destination objects with long descriptions & highlights
│   │   ├── experiences.js     # Array of experience objects
│   │   └── journal.js         # Array of journal entry objects
│   ├── pages/                 # Main Page Views
│   │   ├── Home               # The primary landing page
│   │   ├── Destinations       # Grid view of all destinations
│   │   ├── Experiences        # Grid view of all experiences
│   │   └── Journal            # Grid view of all journal entries
│   ├── App.jsx                # Main application component & routing wrapper
│   ├── index.css              # Global styles, variables, typography, and scrollbar hides
│   └── main.jsx               # React entry point
└── index.html                 # HTML template
```

## 🚀 Getting Started

### Prerequisites
You will need [Node.js](https://nodejs.org/) (version 16 or higher recommended) installed on your machine.

### Installation

1. **Clone the repository** (or download and extract the project files):
   ```bash
   git clone <repository-url>
   ```
2. **Navigate into the project directory**:
   ```bash
   cd "Luxury Travel Website"
   ```
3. **Install the dependencies**:
   ```bash
   npm install
   ```

### Running the Development Server
To start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Once the server starts, open your browser and navigate to `http://localhost:5173`. Any changes you make to the source code will instantly update in the browser without requiring a manual refresh.

### Building for Production
To generate an optimized, minified, production-ready build:
```bash
npm run build
```
Vite will output all static assets into the `dist/` directory. These files are ready to be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

### Previewing the Production Build
To test the production build locally before deploying:
```bash
npm run preview
```

## 🎨 Customization & Theming

The entire look and feel of the website is controlled via CSS variables located at the top of `src/index.css`. To rebrand the site, simply modify these hex codes:

```css
:root {
  --color-bg: #FDFBF7;           /* Main background - warm ivory */
  --color-surface: #FFFFFF;      /* Card/Modal backgrounds - pure white */
  --color-text-primary: #1A1A1A; /* Main text - deep charcoal */
  --color-text-secondary: #5C5C5C;/* Subtext - muted gray */
  --color-accent: #B89060;       /* Brand accent - sophisticated gold */
  
  --font-serif: 'Playfair Display', serif; /* Headings */
  --font-sans: 'Inter', sans-serif;        /* Body text */
}
```
