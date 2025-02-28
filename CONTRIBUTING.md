# Contributing to asknot-rocky

Thank you for your interest in contributing to asknot-rocky! This guide will help you get started with contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Code Style](#code-style)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing Translations](#contributing-translations)

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](https://rockylinux.org/about/coc), which promotes a respectful and inclusive environment for all contributors.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/asknot-rocky.git
   cd asknot-rocky
   ```
3. Add the upstream repository as a remote:
   ```bash
   git remote add upstream https://github.com/rocky-linux/asknot-rocky.git
   ```

## Development Setup

1. Ensure you have Node.js installed (latest LTS version recommended)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:4321` in your browser

## Making Changes

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Ensure your changes meet our code quality standards:
   ```bash
   npm run lint        # Run ESLint
   npm run format      # Run Prettier
   npm run typecheck   # Run TypeScript checks
   npm run test       # Run tests
   ```

## Submitting Changes

1. Commit your changes with a clear and descriptive commit message
2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Create a Pull Request from your fork to our main repository
4. Ensure all CI checks pass
5. Wait for review from maintainers

## Code Style

We use several tools to maintain code quality:

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

Our automated workflows will check these when you submit a PR. You can run them locally:

```bash
npm run lint:fix     # Fix linting issues
npm run format       # Format code
npm run typecheck    # Check types
```

## Testing

We use Vitest for testing. Write tests for new features and ensure existing tests pass:

```bash
npm run test           # Run tests
npm run test:coverage  # Run tests with coverage report
```

## Project Structure

```
asknot-rocky/
├── src/              # Source files
│ ├── components/     # React components (Button, QuestionNode, etc.)
│ ├── i18n/           # Internationalization files and language support
│ ├── layouts/        # Page layouts
│ ├── pages/          # Astro pages
│ ├── questions/      # Question tree logic and configuration
│ ├── styles/         # Global styles
│ └── test/           # Test utilities and shared test code
├── public/           # Static assets
```

Key files:

- `src/pages/index.astro` – Main application page
- `src/components/QuestionNode.tsx` – Core question navigation component
- `src/questions/questions.ts` – Question tree configuration and types
- `src/i18n/LanguageContext.tsx` – Internationalization context and logic
- `src/i18n/{langCode}.json` – Translations

## Contributing Translations

We welcome contributions to make asknot-rocky accessible in more languages! The project currently supports English (en) and Spanish (es), with room for more languages.

### Translation Structure

Translations are stored in JSON files in the `src/i18n` directory, with each language having its own file (e.g., `en.json`, `es.json`). The translation files follow a specific structure defined in `src/i18n/types.ts`.

Key areas that need translation include:

- Home page content
- Question categories and options
- Error messages
- UI elements (footer, language selector)

### Adding a New Language

1. Create a new JSON file in `src/i18n` named with your language code (e.g., `fr.json` for French)
2. Copy the structure from `en.json` as a template
3. Add your language code and name to the `LANGUAGE_NAMES` object in `src/i18n/types.ts`:
   ```typescript
   export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
     en: 'English',
     es: 'Español',
     fr: 'Français', // Your new language
   } as const;
   ```
4. Update the `LanguageCode` type in `src/i18n/types.ts`:
   ```typescript
   export type LanguageCode = 'en' | 'es' | 'fr'; // Add your language code
   ```
5. Translate all strings in your new language file

The language will be automatically loaded and available in the language selector once you've completed these steps. The application uses Vite's dynamic imports to automatically discover and load all language files in the `src/i18n` directory.

### Translation Guidelines

1. Maintain the same JSON structure as the English version
2. Keep special placeholders and HTML tags intact
3. Ensure all keys are present and match exactly
4. Test the UI with your translations to verify layout and formatting
5. Include regional variations only if necessary (e.g., `pt-BR` vs `pt-PT`)

### Testing Translations

After adding or modifying translations:

1. Run `npm run typecheck` to ensure type safety
2. Start the development server and test the UI in your language
3. Verify all interactive elements work correctly
4. Check text formatting and layout in different screen sizes

## Need Help?

If you need help or have questions, please:

1. Check existing issues on GitHub
2. Create a new issue if needed
3. Join the Rocky Linux community channels

Thank you for contributing to asknot-rocky!
