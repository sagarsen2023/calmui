# CalmUI

**CalmUI** is a powerful CLI tool for modern frontend development. It guarantees a clean, scalable, and opinionated project structure from day one, streamlining developer workflows and supporting long-term code quality.


## 🚀 Features & Benefits

- **Automated, consistent project structure** for React (Vite, Next.js) and more.
- **Custom scaffolding** for modules/routes—never worry about file/folder conventions again.
- **Framework-aware**: detects and adapts to Vite, Next.js, etc.
- **Dynamic route generation** supporting nested and parameterized routes.
- **TypeScript-first** setup with zero-config ESM/JS switching.
- **Edge case handling**: guards against accidental overwrites and misconfiguration.
- **Easy extensibility**—add your own templates as your needs grow!


## 📦 Installation

Install CalmUI globally via npm:

```bash
npm install -g calmui
```

_(Or use `npx calmui ...` for one-off commands without installation.)_


## 🛠 Project Initialization

Create a new project in a **specific folder**:

```bash
calmui init my-project
```

Or initialize a project in the **current directory** (checks if folder is empty and prompts accordingly):

```bash
calmui init
```

During initialization, you’ll be prompted to select a framework:

- `Vite` (with Tanstack Router + Tailwind by default)
- `Next.js` (with Tailwind)
- _(React Native—coming soon)_

A local `calmui.json` will be created to store scaffolding config.


## ✨ Route/Module Generation

CalmUI lets you add new routes or modules with a single command, keeping your folder structure consistent.

**Generate a basic route:**

```bash
calmui generate-route /my-route
```

After executing the command you'll see that folder specific files are created.

**Generate a dynamic route:**

```bash
calmui generate-route /my-route/:id
```

**Advanced routes/nesting examples:**

```bash
calmui generate-route /my-route/:id/edit
calmui generate-route /product-details/:slug
calmui generate-route /users/accounts/orders/:id/:status/update
```

- Generates boilerplate, folder structure, and pre-wired modules for each part of the route.
- Works seamlessly for both Vite and Next.js projects.


## 🧩 Other Commands (Coming Soon)

- Route migration



## 📝 Recommended Project Workflow

1. Install CalmUI globally (or use `npx`).
2. Run `calmui init` to start a new project—pick your stack with the arrow keys.
3. Use `calmui generate-route` as needed to build out your app—no more worrying about folder or page naming.
4. Let CalmUI handle your scaffolds, configs, and structure—focus on real features.


## 💡 Contributing

Want to add framework support, templating logic, or new generators? PRs are welcome! See the [CONTRIBUTING.md](CONTRIBUTING.md) for details.


## 🖥 Compatibility

- Node.js v18+
- Works on macOS, Linux, and Windows


## ❓ FAQ

**Q:** Do I need to use TypeScript?  
**A:** TypeScript is the default, but CalmUI supports ESM JS output if required.

**Q:** Can I use CalmUI in an existing (non-empty) folder?  
**A:** Yes, but you’ll be prompted to confirm or clean up the folder first.
