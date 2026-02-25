# Marco Polo Travel Routes

Sitio de presupuestos y propuestas por proyecto. Misma plantilla para distintos budgets; estética Marco Polo (blanco, negro, rojo/salmon) y tipografía Thunder en títulos.

## Stack

- Vite 7 + React 18 + TypeScript
- Tailwind CSS v4
- GSAP (listo para animaciones)
- Deploy en Vercel

## Cómo correr

```bash
npm install
npm run dev
```

Abrí [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Salida en `dist/`.

## Fuente Thunder

Para que los títulos usen Thunder, copiá en `public/fonts/`:

- `Thunder-BoldLC.woff2`
- `Thunder-BoldLC.woff`

Desde el proyecto `Local/pokemon-tcg-shop/public/fonts/` (o desde Focus si tenés los archivos ahí). Si no están, el sitio usa fallback de sistema.

## Deploy en Vercel

1. Subí el repo a GitHub.
2. En [vercel.com](https://vercel.com): New Project → Import repo.
3. Framework: Vite. Build: `npm run build`. Output: `dist`.
4. Deploy. El `vercel.json` ya define rewrites SPA.

## Rutas

- `/` – Listado de budgets (por ahora solo MVP Salud).
- `/budget/health-mvp` – Propuesta completa del MVP Salud y Bienestar (contenido ChatGPT).

## Agregar un nuevo budget

1. Creá un componente en `src/pages/` (ej. `NuevoProyecto.tsx`) que use `TwoColumnSection`, `BoxedListSection`, `ContentBox` con tu contenido.
2. En `App.tsx`, agregá una ruta que use `BudgetTemplate` y renderice ese componente como children.
3. En `Home.tsx`, sumá el budget al array `budgets` con `slug`, `title`, `description`, `timeline`.

## Diseño / Figma

Reglas de diseño para integrar Figma en `.cursor/rules/figma-design-system.md`.
