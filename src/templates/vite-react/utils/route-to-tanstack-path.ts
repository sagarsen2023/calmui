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

export { routeToTanstackPath };
