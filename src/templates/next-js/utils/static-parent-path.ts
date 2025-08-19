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

export { staticParentPath };
