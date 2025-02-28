# asknot-rocky

The official source for join.rockylinux.org, inspired by [asknot-ng](https://github.com/fedora-infra/asknot-ng).

## Start Development Server

1. Install dependencies via NPM.

```bash
npm install
```

2. Start the development server.

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:4321`.

## What's Inside

The project structure is organized as follows:

```
asknot-rocky/
├── src/ # Source files
│ ├── components/ # React and Astro components
│ ├── layouts/ # Page layouts
│ ├── pages/ # Astro pages
│ ├── questions/ # Question tree data
│ └── styles/ # Global styles
├── public/ # Static assets
```

Key files and directories:

- `src/pages/index.astro` – Main entry point and landing page
- `questions/default.json` – Question tree configuration
- `src/components/QuestionNode.tsx` – Core question navigation logic
