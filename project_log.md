# Aurelia Project Development Log & Architecture Notes

## 1. Project Inception & Goals
The goal of the Aurelia project was to build a visually stunning, highly interactive front-end for a luxury travel brand. The core requirements dictated that the application must feel less like a standard webpage and more like a premium native application. This drove decisions around fluid typography, global animation loops, and custom UI components (like Modals and Toasts) to replace clunky browser defaults.

## 2. Global Architecture & Setup
- **Build System**: We selected **Vite** over Create React App (CRA) due to its significantly faster cold starts, instant Hot Module Replacement (HMR), and highly optimized Rollup-based production builds.
- **Global State**: We implemented the **React Context API** to manage global states that need to be accessed deep within the component tree without prop-drilling:
  - `FavoritesContext`: Manages a global array of favorited destination IDs.
  - `ToastContext`: Exposes a `showToast(message)` function globally, allowing any component to trigger a beautifully styled, auto-dismissing notification.
- **Global Styles & Specificity**: `index.css` acts as the single source of truth for design tokens (CSS variables). We carefully managed import orders in `main.jsx` to ensure component-specific CSS files inherit from and safely override `index.css` where necessary without conflicting.

## 3. UI/UX Design Decisions & Implementation Details

### Typography Evolution
Initially, static font sizes (`rem`) were used alongside media queries. This caused layout breaks on intermediate screen sizes. 
- **Solution**: Implemented CSS `clamp(MIN, VAL, MAX)` across all typography utility classes (`.text-display`, `.text-h2`, `.text-h3`, `.text-body-large`).
- **Result**: Text scales dynamically based on the viewport width (using `vw` units), ensuring perfect proportions on every screen size from an iPhone SE to a 4K monitor.

### Scroll-Triggered Animations (`useInView` hook)
To make the site feel "alive", we built a custom `useInView.js` hook utilizing the browser's native `IntersectionObserver` API.
- **Behavior**: The observer watches sections of the page. When a section intersects with the viewport, an `is-visible` CSS class is appended.
- **The Polish**: We explicitly set `triggerOnce: false`. This means the fade-in and slide-up animations re-trigger *every single time* the user scrolls up and down the page, providing continuous visual feedback.

### The Toast Notification System
The user explicitly requested to remove all native browser `alert()` calls.
- **Implementation**: Created a `ToastProvider` that renders a fixed container at the bottom-right of the screen.
- **Functionality**: When `showToast()` is called, a new toast object is pushed into state. The toast renders with a slide-in animation, waits 3 seconds, triggers a slide-out animation, and then safely removes itself from the DOM tree.

### Destination Details Modal (React Portals)
Instead of routing to a new page or expanding a card inline, we implemented a Modal system.
- **Implementation**: Used `ReactDOM.createPortal` to render the modal directly into `document.body`. This guarantees the modal always sits perfectly on top of all other elements, regardless of the `z-index` or `overflow` properties of its parent component.
- **Content Expansion**: We expanded the static data in `destinations.js` to include a full paragraph `longDescription` and an array of `highlights` (e.g., "Private catamaran cruise").
- **Scroll Handling**: We locked the `body` scroll when the modal mounts, and added `overflow-y: auto` exclusively to the text pane inside the modal. This ensures the hero image remains fixed while the user scrolls through the detailed itinerary.

### Responsive Grid Re-engineering
- **The Problem**: On mobile devices, cards (Destinations, Experiences, Journal) were stacking in a single, massive column taking up too much vertical space.
- **The Fix**: We updated `.dest-grid`, `.exp-grid`, and `.journal-grid` to use `grid-template-columns: repeat(2, 1fr)` on mobile. 
- **The Polish**: To accommodate two cards side-by-side on small screens, we aggressively reduced the grid `gap` (from 24px/32px down to 12px/16px) and utilized `-webkit-line-clamp` to truncate overly long titles and excerpts.

### Journal Card Alignment
- **The Problem**: Because journal excerpts varied in length (2 lines vs 3 lines), the "Read the story" links at the bottom of the cards were misaligned.
- **The Fix**: Applied `height: 100%` to the card, `flex-grow: 1` to the content wrapper, and `margin-top: auto` to the link. This elegantly forces the link to the absolute bottom of the card, ensuring perfect horizontal alignment across rows.

### Footer Layout Refactor
- **The Problem**: The footer was using a generic `.section` padding class resulting in massive whitespace, and the layout was messy on desktop.
- **The Fix**: Removed the `.section` class, applying bespoke, tight padding (`var(--spacing-8) 0 var(--spacing-4)`). 
- **Grid Restructure**: Flattened the HTML structure and applied `grid-template-columns: 2fr 1.5fr 1fr 1fr;` on desktop. This perfectly aligns the Brand, Contact Details, Explore Links, and Social Links into a single, cohesive horizontal row.

### Scrollbar Eradication
- **The Request**: The user requested the removal of the physical scrollbar track on the right side of the screen.
- **The Fix**: Added global CSS rules setting `::-webkit-scrollbar { display: none; }` and `-ms-overflow-style: none; scrollbar-width: none;` to completely hide the scrollbar UI while perfectly preserving native scroll functionality.

## 4. Known Limitations & Future Roadmap
- **Data Persistence**: Currently, "Favorites" are stored in React State and are lost on page refresh. *Next step: Connect `FavoritesContext` to `localStorage` or a backend database.*
- **Routing**: Links like "Destinations", "Experiences", and "Journal" currently trigger Toast notifications or scroll events. *Next step: Implement `react-router-dom` fully to create dedicated detail pages for SEO optimization.*
- **Backend Integration**: The data in `src/data/` is static. *Next step: Migrate to a headless CMS (like Sanity or Strapi) to allow the marketing team to update destinations without code changes.*
