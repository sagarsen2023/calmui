import fs from "fs-extra";
import path from "path";
import { getCalmUiJson } from "../../lib/get-calmui-json";
import textToCamelCase from "../../utils/text-to-camel-case";
import firstLetterCapitalize from "../../utils/first-letter-capitalize";
import chalk from "chalk";

const successLog = (text: string) => console.log(chalk.greenBright(text));
const infoLog = (text: string) => console.log(chalk.blueBright(text));

const cwd = process.cwd();
const { fileExtension } = getCalmUiJson();

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
const generateRoute = (route: string) => {
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
 * @param param0.parentPath - The parent path of the module.
 * @param param0.lastStaticPath - The last static path of the module.
 */
const generateModule = ({
  parentPath,
  lastStaticPath,
}: {
  parentPath: string;
  lastStaticPath: string;
}) => {
  const modulePath = path.join(
    cwd,
    "src",
    "modules",
    parentPath,
    parentPath.endsWith(lastStaticPath) ? "" : lastStaticPath // ? If route is: /user/:id/:orders/create then the complete route will be /user/create
  );
  console.log("modulePath:", modulePath);
  fs.ensureDirSync(modulePath);
  const newModulePath = `${modulePath}/index.${fileExtension}x`;
  const isModuleExists = fs.existsSync(newModulePath);
  if (!isModuleExists) {
    fs.ensureFileSync(newModulePath);
    const moduleName =
      firstLetterCapitalize({
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
const generateService = (lastStaticPath: string) => {
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

const generateTypescriptModel = ({
  parentPath,
  lastStaticPath,
}: {
  parentPath: string;
  lastStaticPath: string;
}) => {
  if (fileExtension !== "ts") {
    return;
  }
  const moduleFolderRoute = path.join(cwd, "src", "models");
  const modelPath = path.join(moduleFolderRoute, parentPath || lastStaticPath);
  const gitkeepPathForModel = path.join(moduleFolderRoute, ".gitkeep");
  if (fs.existsSync(gitkeepPathForModel)) {
    fs.removeSync(gitkeepPathForModel);
  }
  fs.ensureDirSync(modelPath);
  const newModelPath = `${modelPath}/index.model.${fileExtension}`;
  const isModelExists = fs.existsSync(newModelPath);
  if (!isModelExists) {
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
    successLog(`✓ Generated typescript model file: ${newModelPath}`);
  } else {
    infoLog("! Skipping typescript model file because it already exists");
  }
};

/**
 * Generates the Next JS route files for a given route pattern.
 *
 * @param route - The route pattern (e.g., "/folder1/folder2" or even dynamic routes like: "/folder1/:folder2/:folder3")
 * @returns {void}
 */
export const nextRouteGenerator = (route: string) => {
  const parentPath = staticParentPath(route);
  const lastStaticPath = lastStaticSegment(route);

  // ---------- GENERATING ROUTE FILE ----------
  generateRoute(route);

  // ---------- GENERATING MODULE FILE ----------
  generateModule({
    lastStaticPath,
    parentPath,
  });

  if (lastStaticPath) {
    // ---------- GENERATING SERVICE FILE ----------
    generateService(lastStaticPath);
    // ---------- GENERATING TYPESCRIPT INTERFACES ----------
    generateTypescriptModel({
      lastStaticPath,
      parentPath,
    });
  }
};
