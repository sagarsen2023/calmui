import fs from "fs-extra";
import path from "path";
import { getCalmUiJson } from "../../lib/get-calmui-json";
import textToCamelCase from "../../utils/text-to-camel-case";
import firstLetterCapitalize from "../../utils/first-letter-capitalize";

// Helper functions
// ? Helpers
// * Following code gives output as folder1/[folder2]/[folder3] if the route is "/folder1/:folder2/:folder3"
function routeToFolder(route: string) {
  return route
    .split("/")
    .map((k) => (k.startsWith(":") ? `[${k.slice(1)}]` : k))
    .join(path.sep);
}

// * Following code gives output as $folder1/$folder2/$folder3 if the route is "/folder1/:folder2/:folder3"
function routeToTanstackPath(route: string) {
  return route
    .split("/")
    .map((part) => (part.startsWith(":") ? `$${part.slice(1)}` : part))
    .join("/");
}

// * Following code gives output as the last static segment if the route is "/folder1/:folder2/:folder3"
function lastStaticSegment(route: string) {
  const parts = route.split("/");
  let last = "";
  for (const part of parts) {
    if (part.startsWith(":")) break;
    if (part) last = part;
  }
  return last;
}

// * Following code gives output as the parent static segments if the route is "/folder1/:folder2/:folder3"
function staticParentPath(route: string) {
  const parts = route.split("/");
  let staticParts = [];
  for (const part of parts) {
    if (part.startsWith(":")) break;
    if (part) staticParts.push(part);
  }
  return staticParts.join("/");
}

export const viteRouteGenerator = (route: string) => {
  const cwd = process.cwd();
  const { fileExtension } = getCalmUiJson();

  const routeFolder = routeToFolder(route);
  // Get tanstack router relative path:
  const tanstackPath = routeToTanstackPath(route);

  // Step 1: Create route file
  const routePath = path.join(cwd, "src", "routes", routeFolder);
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

  // Step 2: Model/Service files generation for last static segment
  // Only if there IS a static segment (so NOT starting with ':')
  const lastStatic = lastStaticSegment(route);
  if (lastStatic) {
    const servicePath = path.join(cwd, "src", "services");
    fs.ensureDirSync(servicePath);
    const newServicePath = `${servicePath}/${lastStatic}.service.${fileExtension}`;
    fs.ensureFileSync(newServicePath);
    fs.writeFileSync(
      newServicePath,
      `import queryParamsFormatter from "@/utils/query-params-formatter";
import fetchAPI from "./config/fetch-api";

export const ${textToCamelCase({
        str: lastStatic,
        separator: "/",
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

    const modelParent = staticParentPath(route);

    console.log("modelParent:", modelParent);

    if (fileExtension === "ts") {
      const modelPath = path.join(
        cwd,
        "src",
        "models",
        modelParent || lastStatic
      );
      fs.ensureDirSync(modelPath);
      const newModelPath = `${modelPath}/index.model.${fileExtension}`;
      fs.ensureFileSync(newModelPath);
      fs.writeFileSync(
        newModelPath,
        `export interface ${firstLetterCapitalize({
          str: lastStatic,
          separator: "/",
        })}Model {
      // Define your model properties here
}
`
      );
    }
  }
};
