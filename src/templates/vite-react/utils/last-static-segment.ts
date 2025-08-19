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

export { lastStaticSegment };
