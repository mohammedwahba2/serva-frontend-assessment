# Serva Frontend Assessment

Implementation of the Home Dashboard for Serva's fleet management platform, built as part of the frontend technical assessment.

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router v7
- Redux Toolkit + RTK Query
- Material-UI v6
- Tailwind CSS v4
- i18next (English / Arabic — full RTL/LTR support)

## Setup

```bash
npm install
npm run dev
```

App runs on `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
├── app/          # Store config, typed hooks, root App
├── routes/       # Routing
├── features/
│   └── dashboard/
│       ├── components/
│       ├── api/      # RTK Query endpoints
│       └── hooks/
├── shared/       # Shared components, layouts, utils
├── i18n/         # Translations (en/ar)
└── theme/        # MUI theme + RTL setup
```

Path aliases are set up (`@/` → `src/`) for cleaner imports across features.

## Assumptions & Notes

- Mock data is used for all dashboard metrics, as no backend/API was provided.
- RTL is handled via a separate Emotion cache (`stylis-plugin-rtl`) that switches based on the active i18next language, per MUI's recommended approach for v6.
- Numeric values are kept LTR (`dir="ltr"`) inside RTL layouts as specified in the requirements.