import fs from "fs-extra";
import path from "path";
import { getCalmUiJson } from "../../lib/get-calmui-json";
import textToCamelCase from "../../utils/text-to-camel-case";
import chalk from "chalk";
import { upperCamelCase } from "../../utils/text-to-upper-camel-case";
import { staticParentPath } from "./utils/static-parent-path";
import { lastStaticSegment } from "./utils/last-static-segment";
import { routeToTanstackPath } from "./utils/route-to-tanstack-path";
import { getTanstackDynamicSegments } from "./utils/get-tanstack-dynamic-segments";

const successLog = (text: string) => console.log(chalk.greenBright(text));
const infoLog = (text: string) => console.log(chalk.blueBright(text));

const cwd = process.cwd();

// -------------------- FUNCTIONS --------------------
// 1. Route generation
/**
 * Generates the tanstack route files for a given route pattern.
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
  const tanstackPath = routeToTanstackPath(route);
  const routePath = path.join(cwd, "src", "routes", tanstackPath);
  const { isDynamic, segments } = getTanstackDynamicSegments(route);
  fs.ensureDirSync(routePath);
  const newRoutePath = `${routePath}/index.${fileExtension}x`;
  const isRouteExists = fs.existsSync(newRoutePath);
  if (!isRouteExists) {
    fs.ensureFileSync(newRoutePath);
    fs.writeFileSync(
      newRoutePath,
      `import { createFileRoute, ${
        isDynamic ? "useParams" : ""
      } } from '@tanstack/react-router'

export const Route = createFileRoute('${tanstackPath}')({
  component: RouteComponent,
})

function RouteComponent() {
  ${
    isDynamic
      ? `const { ${segments.join(", ")} } = useParams({
    from: '${tanstackPath}/',
  });`
      : ""
  }
  return <div>Hello "${route}"!</div>
}
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

// 4. Generate Typescript type
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
 * Generates the Vite-Tanstack route files for a given route pattern.
 *
 * @param route - The route pattern (e.g., "/folder1/folder2" or even dynamic routes like: "/folder1/:folder2/:folder3")
 * @returns {void}
 */
export const viteRouteGenerator = (route: string) => {
  const { fileExtension } = getCalmUiJson();

  const parentPath = staticParentPath(route);
  const lastStaticPath = lastStaticSegment(route);

  // ---------- GENERATING ROUTES ----------
  generateRoute({
    route,
    fileExtension,
  });

  // ---------- GENERATING MODULES FOR USING IN PAGES ----------
  generateModule({
    fileExtension,
    lastStaticPath,
    parentPath,
  });

  // ---------- GENERATING SERVICE FILE ----------
  generateService({ fileExtension, lastStaticPath });

  // ---------- GENERATING TYPESCRIPT INTERFACES ----------
  generateTypescriptType({ fileExtension, lastStaticPath, parentPath });
};
