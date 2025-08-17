import fs from "fs-extra";
import path from "path";
import { getCalmUiJson } from "../../lib/get-calmui-json";
import textToCamelCase from "../../utils/text-to-camel-case";
import firstLetterCapitalize from "../../utils/first-letter-capitalize";

export const viteRouteGenerator = (route: string) => {
  const cwd = process.cwd();
  const { fileExtension } = getCalmUiJson();

  // Step 1: Creating route under the src/routes directory.
  const routePath = path.join(cwd, "src", "routes", route);

  fs.ensureDirSync(path.dirname(routePath));
  const newRoutePath = `${routePath}/index.${fileExtension}x`;
  fs.ensureFileSync(newRoutePath);
  fs.writeFileSync(
    newRoutePath,
    `import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('${route}')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "${route}"!</div>
}
`
  );

  // Step 2: Creating the service file
  const lastKeyWord = route.split("/").pop();
  const servicePath = path.join(cwd, "src", "services", route);
  fs.ensureDirSync(servicePath);
  const gitkeepPath = path.join(servicePath, ".gitkeep");
  if (fs.existsSync(gitkeepPath)) {
    fs.removeSync(gitkeepPath);
  }
  const newServicePath = `${servicePath}/${lastKeyWord}.service.${fileExtension}`;
  fs.ensureFileSync(newServicePath);
  fs.writeFileSync(
    newServicePath,
    `import queryParamsFormatter from "@/utils/query-params-formatter";
import fetchAPI from "./config/fetchApi";

export const ${textToCamelCase({
      str: route,
      separator: "/",
    })}Service = {
    // Example usage
    //   getDataFromApi: async (
    //     params: SampleParamsType
    //   ): Promise<SampleResponseType> => {
    //     const queryString = queryParamsFormatter(params);
    //     return fetchAPI.get<SampleResponseType>({
    //       endpoint: \`/\${route}?\${queryString}\`,
    //     });
    //   },
};
`
  );

  // Step 3: Generating the typescript interface file
  if (fileExtension !== "ts") {
    return;
  }
  const modelPath = path.join(cwd, "src", "models", route);
  fs.ensureDirSync(modelPath);
  const mewModelPath = `${modelPath}/index.model.${fileExtension}`;
  fs.ensureFileSync(mewModelPath);
  fs.writeFileSync(
    mewModelPath,
    `export interface ${firstLetterCapitalize({
      str: route,
      separator: "/",
    })}Model {
    // Define your model properties here
}
`
  );
};
