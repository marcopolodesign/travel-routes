# Marco Polo Travel Routes – Design System (Figma integration)

Use this when implementing Figma designs in this project.

## Token definitions

- **Where:** CSS variables in `src/index.css` (`:root`) and Tailwind utilities.
- **Colors:** `--marco-accent: #e66065`, `--marco-accent-light: #f5b5b8`, `--marco-black`, `--marco-white`, `--marco-gray`, `--marco-bg`.
- **Typography:** Headings use **Thunder** (`font-thunder` class; font files in `public/fonts/Thunder-BoldLC.*`). Body uses system UI stack.
- **No TAG styles** – this project does not use TAG yellow, Druk, or MDIO.

## Component library

- **Location:** `src/components/` – `BudgetTemplate`, `MarcopoloLogo`, `TwoColumnSection`, `BoxedListSection`, `ContentBox`.
- **Pattern:** React function components; template receives props (title, timeline, stack, whatLabel) and `children` for page content.

## Frameworks and build

- **Stack:** React 18, Vite 7, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), GSAP.
- **Build:** `npm run build`; output `dist/`. Vercel: `vercel-build` script.

## Assets

- **Fonts:** `public/fonts/` (Thunder from pokemon-tcg-shop).
- **Logo:** Marco Polo logo is inline SVG in `MarcopoloLogo.tsx` (from marcopolo theme header.php); use `currentColor` for theming.

## Styling

- **Method:** Tailwind utility-first; global tokens and font-face in `src/index.css`.
- **Template patterns (Figma slides):** Top bar (TIMELINE / STACK / WHAT), two-column sections (title left, content right), boxed lists with accent title and border.

## Project structure

- `src/pages/` – route pages (Home, HealthMvp).
- `src/components/` – shared layout and section blocks.
- New budget = new route in `App.tsx` + new page component that uses `BudgetTemplate` and section components.
