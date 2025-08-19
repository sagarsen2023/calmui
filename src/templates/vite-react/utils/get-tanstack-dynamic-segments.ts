/**
 * Extracts dynamic segment names from a route pattern.
 * @param route - The route pattern (e.g., "/folder1/:folder2/:folder3")
 * @returns An object containing:
 *   - isDynamic: boolean indicating if the route has dynamic segments
 *   - segments: array of dynamic segment names (e.g., ["folder2", "folder3"])
 */
function getTanstackDynamicSegments(route: string): {
  isDynamic: boolean;
  segments: string[];
} {
  const dynamicSegments = route.match(/:([^/]+)/g);
  return {
    isDynamic: !!dynamicSegments,
    segments: dynamicSegments ? dynamicSegments.map((seg) => seg.slice(1)) : [],
  };
}

export { getTanstackDynamicSegments };
