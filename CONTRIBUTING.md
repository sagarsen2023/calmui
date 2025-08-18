# Contributing to CalmUI

Thank you for your interest in contributing to CalmUI! This document provides comprehensive guidelines for contributing to the project, including how to add new framework templates and extend existing functionality.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Adding New Framework Templates](#adding-new-framework-templates)
- [Code Style and Standards](#code-style-and-standards)
- [Testing Your Changes](#testing-your-changes)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Development Workflow](#development-workflow)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- TypeScript knowledge
- Git

### Setting up the development environment

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/sagarsen2023/calmui.git
   cd calmui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Install globally for local testing:
   ```bash
   npm run local-install
   ```

## Project Structure

```
calmui/
├── src/
│   ├── index.ts                    # Main CLI entry point
│   ├── config/                     # Configuration files
│   │   ├── generate-route.config.ts
│   │   └── initialize-project.config.ts
│   ├── lib/                        # Core library functions
│   │   ├── get-calmui-json.ts     # Configuration file parser
│   │   └── get-templates.ts       # Template resolver
│   ├── scripts/                    # Build scripts
│   │   └── copy-templates.ts      # Template copying logic
│   ├── templates/                  # Framework templates
│   │   ├── index.ts               # Template registry
│   │   ├── next-js/               # Next.js template
│   │   └── vite-react/            # Vite React template
│   ├── types/                     # TypeScript type definitions
│   │   └── calmui-json.type.ts
│   └── utils/                     # Utility functions
├── bin/                           # Compiled CLI executable
└── package.json
```

### Key Files

- **`src/templates/index.ts`**: Main template registry where all frameworks are registered
- **`src/templates/{framework}/initiator.ts`**: Framework-specific initialization logic
- **`src/templates/{framework}/route-generator.ts`**: Route/module generation logic
- **`src/templates/{framework}/project-files/`**: Template files to be copied during initialization

## Adding New Framework Templates

To add support for a new framework, follow these steps:

### 1. Create the Framework Directory Structure

Create a new directory under `src/templates/` with your framework name:

```
src/templates/your-framework/
├── initiator.ts
├── route-generator.ts
└── project-files/
    ├── calmui.json
    └── your-desired-folder-and-file-structure
```

### 2. Implement the Initiator

Create `initiator.ts` with the following structure:

```typescript
import { ConfigOptions } from "..";
import os from "os";

export const yourFrameworkConfig = (folderName: string): ConfigOptions => {
  const templateDir = `${__dirname}/project-files`;
  const isWindows = os.platform() === "win32";

  return {
    name: "Your Framework Display Name",
    // Command to create the base project
    command: `npx create-your-framework ${folderName} --options`,
    
    // Commands to run after project creation (optional)
    postInstallCommands: [
      `cd ${folderName} && npm install additional-deps`,
      // Add cleanup commands if needed
      isWindows ? `del /f ${folderName}\\unwanted-file` : `rm -f ${folderName}/unwanted-file`,
    ],
    
    // Template files to copy over the generated project
    templateFiles: [
      {
        source: `${templateDir}/calmui.json`,
        target: `${folderName}/calmui.json`,
      },
      // Add all your template files here
      {
        source: `${templateDir}/src/services/config/fetch-api.ts`,
        target: `${folderName}/src/services/config/fetch-api.ts`,
      },
      // ... more files
    ],
    
    // Final commands to run (optional)
    finalizationCommands: [
      `cd ${folderName} && npm run format`,
    ],
  };
};
```

### 3. Implement the Route Generator

Create `route-generator.ts`:

```typescript
export const yourFrameworkRouteGenerator = (route: string): void => {
  // Implementation for generating routes/modules specific to your framework
  console.log(`Generating route for ${route} in Your Framework`);
  
  // Example logic:
  // - Parse the route parameter
  // - Create necessary directories
  // - Generate component files
  // - Update routing configuration
  // - Handle nested routes and parameters
};
```

### 4. Create Project Files

In the `project-files/` directory, add all the template files that should be copied to new projects:

#### Required Files

**`calmui.json`**:
```json
{
  "calmui": "1.0.0",
  "template": "your-framework",
  "typescript": true
}
```

#### Directory Structure
Create the standard CalmUI directory structure with appropriate `.gitkeep` files:

```
project-files/
├── calmui.json
└── src/
    ├── components/
    │   └── .gitkeep
    ├── constants/
    │   └── .gitkeep
    ├── hooks/
    │   └── .gitkeep
    ├── lib/
    │   └── .gitkeep
    ├── models/
    │   └── .gitkeep
    ├── modules/
    │   └── .gitkeep (or sample module)
    ├── services/
    │   └── config/
    │       ├── fetch-api.ts
    │       ├── query-urls.ts
    │       └── request.ts (if applicable)
    ├── utils/
    │   ├── cookie-storage.ts
    │   └── query-params-formatter.ts
    └── validators/
        └── .gitkeep
```

### 5. Register Your Template

Add your framework to `src/templates/index.ts`:

```typescript
import { yourFrameworkConfig } from "./your-framework/initiator";
import { yourFrameworkRouteGenerator } from "./your-framework/route-generator";

// Add to the templateConfig object:
const templateConfig: TemplateConfig = {
  // ... existing templates
  "your-framework": {
    init: yourFrameworkConfig,
    generateRoute: yourFrameworkRouteGenerator,
  },
};
```

### Cross-Platform Compatibility

Always ensure your templates work on:
- Windows (use `isWindows` checks for path separators and commands)
- macOS
- Linux

Example:
```typescript
const isWindows = os.platform() === "win32";
const deleteCommand = isWindows ? `del /f ${filePath}` : `rm -f ${filePath}`;
```

### Error Handling

- Include proper error handling for file operations
- Validate required dependencies are available
- Provide meaningful error messages

## Code Style and Standards

### TypeScript Guidelines

1. Use strict TypeScript configuration
2. Define proper interfaces and types
3. Avoid `any` types when possible
4. Use meaningful variable and function names

### File Naming

- Use kebab-case for file names: `my-component.ts`
- Use camelCase for function names: `generateRoute()`
- Use PascalCase for interfaces and types: `ConfigOptions`

### Code Formatting

The project uses standard TypeScript formatting. Ensure your code is properly formatted before submitting.

## Testing Your Changes

### Local Testing

1. Build and install locally:
   ```bash
   npm run build
   npm run local-install
   ```

2. Test project initialization:
   ```bash
   mkdir test-project
   cd test-project
   calmui init
   ```

3. Test route generation:
   ```bash
   calmui route user/profile
   ```

4. Verify the generated structure matches expectations

### Testing Checklist

- [ ] Project initializes without errors
- [ ] All template files are copied correctly
- [ ] Dependencies install successfully
- [ ] Generated project builds and runs
- [ ] Route generation works as expected
- [ ] Cross-platform compatibility (test on different OS if possible)

## Development Workflow

### Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/add-your-framework
   ```

2. Make your changes following the guidelines above

3. Test thoroughly using the local testing process

4. Commit your changes with descriptive commit messages:
   ```bash
   git commit -m "feat: add support for Your Framework template"
   ```

### Build Process

The build process includes:
- TypeScript compilation
- ESM module fixing
- Template file copying

Run the full build:
```bash
npm run build
```

## Submitting a Pull Request

1. **Fork the repository** on GitHub

2. **Create a feature branch** from `main`

3. **Make your changes** following all guidelines in this document

4. **Test thoroughly** using the local testing process

5. **Write clear commit messages** using conventional commit format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `refactor:` for code refactoring

6. **Update documentation** if needed:
   - Update README.md if adding a new framework
   - Update this CONTRIBUTING.md if changing the contribution process

7. **Submit a pull request** with:
   - Clear title describing the change
   - Detailed description of what was added/changed
   - Steps to test the changes
   - Any breaking changes or migration notes

### Pull Request Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] New framework template
- [ ] Bug fix
- [ ] Feature enhancement
- [ ] Documentation update

## Framework Details (if applicable)
- Framework name: 
- Version supported: 
- Key features: 

## Testing
- [ ] Tested project initialization
- [ ] Tested route generation
- [ ] Tested on multiple platforms
- [ ] Generated project builds successfully

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Changes tested locally
```

## Getting Help

- **Issues**: Create an issue for bugs or feature requests
- **Discussions**: Use GitHub discussions for questions
- **Code Review**: Maintainers will review PRs and provide feedback

## Recognition

Contributors who add new framework templates or make significant improvements will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to CalmUI! Your efforts help make frontend development more consistent and enjoyable for developers worldwide.