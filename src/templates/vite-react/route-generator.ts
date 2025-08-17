import fs from "fs-extra";
import path from "path";
import { getCalmUiJson } from "../../lib/get-calmui-json";
import textToCamelCase from "../../utils/text-to-camel-case";
import firstLetterCapitalize from "../../utils/first-letter-capitalize";
import chalk from "chalk";

const log = (text: string) => console.log(chalk.greenBright(text));

// ? Helpers only for route generation with vite and tanstack
// * Following code gives output as folder1/[folder2]/[folder3] if the route is "/folder1/:folder2/:folder3"
function routeToFolder(route: string) {
  return route
    .split("/")
    .map((k) => (k.startsWith(":") ? `[${k.slice(1)}]` : k))
    .join(path.sep);
}

/**
 * Converts a route string to the TanStack Router format by replacing dynamic segments with the "$" prefix.
 * @param route - The route pattern (e.g., "/folder1/:folder2/:folder3")
 * @returns The TanStack Router format (e.g., "/folder1/$folder2/$folder3")
 */
function routeToTanstackPath(route: string) {
  return route
    .split("/")
    .map((part) => (part.startsWith(":") ? `$${part.slice(1)}` : part))
    .join("/");
}

/**
 * Extracts the last static segment from a route string.
 *
 * @param route - The route pattern (e.g., "/folder1/:folder2/:folder3")
 * @returns The last static segment (e.g., "folder3")
 */
function lastStaticSegment(route: string) {
  const parts = route.split("/");
  let last = "";
  for (const part of parts) {
    if (part.startsWith(":")) break;
    if (part) last = part;
  }
  return last;
}

/**
 * Extracts the parent static segments from a route string.
 *
 * @param route - The route pattern (e.g., "/folder1/:folder2/:folder3")
 * @returns The parent static segments joined by "/" (e.g., "folder1")
 */
function staticParentPath(route: string) {
  const parts = route.split("/");
  let staticParts = [];
  for (const part of parts) {
    if (part.startsWith(":")) break;
    if (part) staticParts.push(part);
  }
  return staticParts.join("/");
}

/**
 * Generates the Vite-Tanstack route files for a given route pattern.
 *
 * @param route - The route pattern (e.g., "/folder1/folder2" or even dynamic routes like: "/folder1/:folder2/:folder3")
 * @returns {void}
 */
export const viteRouteGenerator = (route: string) => {
  const cwd = process.cwd();
  const { fileExtension } = getCalmUiJson();

  // Formatting paths for a better project structure
  const tanstackPath = routeToTanstackPath(route);
  const parentPath = staticParentPath(route);
  const lastStaticPath = lastStaticSegment(route);

  // ---------- GENERATING ROUTES ----------
  const routePath = path.join(cwd, "src", "routes", tanstackPath);
  fs.ensureDirSync(routePath);
  const newRoutePath = `${routePath}/index.${fileExtension}x`;
  fs.ensureFileSync(newRoutePath);
  fs.writeFileSync(
    newRoutePath,
    `import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('${tanstackPath}')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "${route}"!</div>
}
`
  );
  log(`✓ Generated route file: ${newRoutePath}`);

  // ---------- GENERATING MODULES FOR USING IN PAGES ----------
  const modulePath = path.join(
    cwd,
    "src",
    "modules",
    parentPath,
    lastStaticPath !== parentPath ? lastStaticPath : ""
  );
  fs.ensureDirSync(modulePath);
  const newModulePath = `${modulePath}/index.${fileExtension}x`;
  fs.ensureFileSync(newModulePath);
  const moduleName =
    firstLetterCapitalize({
      str: lastStaticPath,
      separator: "/",
    }) + "Module";
  fs.writeFileSync(
    newModulePath,
    `function ${moduleName}() {
  return <div>${moduleName}</div>;
}

export default ${moduleName};
`
  );
  log(`✓ Generated module file: ${newModulePath}`);

  // ---------- GENERATING SERVICE FILE ----------

  if (lastStaticPath) {
    const servicePath = path.join(cwd, "src", "services");
    fs.ensureDirSync(servicePath);
    const newServicePath = `${servicePath}/${lastStaticPath}.service.${fileExtension}`;
    fs.ensureFileSync(newServicePath);
    fs.writeFileSync(
      newServicePath,
      `import queryParamsFormatter from "@/utils/query-params-formatter";
import fetchAPI from "./config/fetch-api";

export const ${textToCamelCase({
        str: lastStaticPath,
        separator: "-",
      })}Service = {
      // Example usage
      //   getDataFromApi: async (
      //     params: SampleParamsType
      //   ): Promise<SampleResponseType> => {
      //     const queryString = queryParamsFormatter(params);
      //     return fetchAPI.get<SampleResponseType>({
      //       endpoint: \`/${route}?\${queryString}\`,
      //     });
      //   },
};
`
    );
    log(`✓ Generated service file: ${newServicePath}`);

    // ---------- GENERATING TYPESCRIPT INTERFACES ----------
    if (fileExtension === "ts") {
      const modelPath = path.join(
        cwd,
        "src",
        "models",
        parentPath || lastStaticPath
      );
      fs.ensureDirSync(modelPath);
      const newModelPath = `${modelPath}/index.model.${fileExtension}`;
      fs.ensureFileSync(newModelPath);
      fs.writeFileSync(
        newModelPath,
        `export interface ${firstLetterCapitalize({
          str: lastStaticPath,
          separator: "-",
        })}Model {
      // Define your model properties here
}
`
      );
      log(`✓ Generated typescript model file: ${newModelPath}`);
    }
  }
};
