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
├── src/                # Source files
│   ├── components/    # React components
│   ├── layouts/       # Page layouts
│   ├── pages/        # Page components
│   └── styles/       # CSS and styling files
├── public/            # Static assets
└── data/             # Configuration and content data
```

Key files and directories:
- `src/pages/index.astro` – Main entry point and landing page
- `data/questions.json` – Question tree configuration
- `src/components/question-node.tsx` – Core question navigation logic
- `src/styles/global.css` – Global styles and theming