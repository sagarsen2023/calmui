import fs from "fs-extra";
import path from "path";
import { getCalmUiJson } from "../../lib/get-calmui-json";
import textToCamelCase from "../../utils/text-to-camel-case";
import chalk from "chalk";
import { upperCamelCase } from "../../utils/text-to-upper-camel-case";

const successLog = (text: string) => console.log(chalk.greenBright(text));
const infoLog = (text: string) => console.log(chalk.blueBright(text));

const cwd = process.cwd();

// ? Helpers only for route generation with Next JS
/**
 * Converts a route string to the folder structure format by replacing dynamic segments with brackets.
 * @param route - The route pattern (e.g., "/folder1/:folder2/:folder3")
 * @returns The folder structure format (e.g., "folder1/[folder2]/[folder3]")
 */
function routeToNextJsPath(route: string) {
  return route
    .split("/")
    .map((k) => (k.startsWith(":") ? `[${k.slice(1)}]` : k))
    .join(path.sep);
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

// -------------------- FUNCTIONS --------------------
// 1. Route generation
/**
 * Generates the Next JS route files for a given route pattern.
 *
 * @param route - The route pattern (e.g., "/folder1/folder2" or even dynamic routes like: "/folder1/:folder2/:folder3")
 * @returns {void}
 */
const generateRoute = ({
  route,
  fileExtension,
}: {
  route: string;
  fileExtension: string;
}) => {
  const nextJsPath = routeToNextJsPath(route);
  const routePath = path.join(cwd, "src", "app", nextJsPath);
  fs.ensureDirSync(routePath);
  const newRoutePath = `${routePath}/page.${fileExtension}x`;
  const isRouteExists = fs.existsSync(newRoutePath);
  if (!isRouteExists) {
    fs.ensureFileSync(newRoutePath);
    fs.writeFileSync(
      newRoutePath,
      `import React from "react";

function Page() {
  return <div>Page</div>;
}

export default Page;
`
    );
    successLog(`✓ Generated route file: ${newRoutePath}`);
  } else {
    infoLog("! Skipping route file because it already exists");
  }
};

// 2. Generate Modules
/**
 * Generates a module file for a given route.
 * @param parentPath - The parent path of the module.
 * @param lastStaticPath - The last static path of the module.
 */
const generateModule = ({
  parentPath,
  lastStaticPath,
  fileExtension,
}: {
  parentPath: string;
  lastStaticPath: string;
  fileExtension: string;
}) => {
  const modulePath = path.join(
    cwd,
    "src",
    "modules",
    parentPath,
    parentPath.endsWith(lastStaticPath) ? "" : lastStaticPath // ? If route is: /user/:id/:orders/create then the complete route will be /user/create
  );
  fs.ensureDirSync(modulePath);
  const newModulePath = `${modulePath}/index.${fileExtension}x`;
  const isModuleExists = fs.existsSync(newModulePath);
  if (!isModuleExists) {
    fs.ensureFileSync(newModulePath);
    const moduleName =
      upperCamelCase({
        str: lastStaticPath,
        separator: "-",
      }) + "Module";
    fs.writeFileSync(
      newModulePath,
      `function ${moduleName}() {
  return <div>${moduleName}</div>;
}

export default ${moduleName};
`
    );
    successLog(`✓ Generated module file: ${newModulePath}`);
  } else {
    infoLog("! Skipping module file because it already exists");
  }
};

// 3. Generate Service
/**
 * Generates a service file for a given route.
 * @param lastStaticPath - The last static path of the service.
 */
const generateService = ({
  lastStaticPath,
  fileExtension,
}: {
  lastStaticPath: string;
  fileExtension: string;
}) => {
  const servicePath = path.join(cwd, "src", "services");
  fs.ensureDirSync(servicePath);
  const newServicePath = `${servicePath}/${lastStaticPath}.service.${fileExtension}`;
  const isServiceExists = fs.existsSync(newServicePath);
  if (!isServiceExists) {
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
      //       endpoint: \`/\${some-route}?\${queryString}\`,
      //     });
      //   },
};
`
    );
    successLog(`✓ Generated service file: ${newServicePath}`);
  } else {
    infoLog("! Skipping service file because it already exists");
  }
};

// 4. Generate Typescript Type
/**
 * Generates a typescript type file for a given route.
 * @param parentPath - The parent path of the type.
 * @param lastStaticPath - The last static path of the type.
 * @param fileExtension - The file extension for the type file.
 * @returns {void}
 */
const generateTypescriptType = ({
  parentPath,
  lastStaticPath,
  fileExtension,
}: {
  parentPath: string;
  lastStaticPath: string;
  fileExtension: string;
}) => {
  if (fileExtension !== "ts") {
    return;
  }
  const typeFolderRoute = path.join(cwd, "src", "types");
  const typePath = path.join(typeFolderRoute, parentPath || lastStaticPath);
  const gitkeepPathForType = path.join(typeFolderRoute, ".gitkeep");
  if (fs.existsSync(gitkeepPathForType)) {
    fs.removeSync(gitkeepPathForType);
  }
  fs.ensureDirSync(typePath);
  const newTypePath = `${typePath}/index.type.${fileExtension}`;
  const isTypeExists = fs.existsSync(newTypePath);
  if (!isTypeExists) {
    fs.ensureFileSync(newTypePath);
    fs.writeFileSync(
      newTypePath,
      `export interface ${upperCamelCase({
        str: lastStaticPath,
        separator: "-",
      })}Type {
  // Define your type properties here
}
`
    );
    successLog(`✓ Generated typescript type file: ${newTypePath}`);
  } else {
    infoLog("! Skipping typescript type file because it already exists");
  }
};

/**
 * Generates the Next JS route files for a given route pattern.
 *
 * @param route - The route pattern (e.g., "/folder1/folder2" or even dynamic routes like: "/folder1/:folder2/:folder3")
 * @returns {void}
 */
export const nextRouteGenerator = (enteredRoute: string) => {
  const route = enteredRoute.toLowerCase();
  const parentPath = staticParentPath(route);
  const lastStaticPath = lastStaticSegment(route);
  const { fileExtension } = getCalmUiJson();

  // ---------- GENERATING ROUTE FILE ----------
  generateRoute({ route, fileExtension });

  // ---------- GENERATING MODULE FILE ----------
  generateModule({
    lastStaticPath,
    parentPath,
    fileExtension,
  });

  // ---------- GENERATING SERVICE FILE ----------
  generateService({ lastStaticPath, fileExtension });
  // ---------- GENERATING TYPESCRIPT INTERFACES ----------
  generateTypescriptType({
    lastStaticPath,
    parentPath,
    fileExtension,
  });
};
