import path from "path";

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

export { routeToNextJsPath };
