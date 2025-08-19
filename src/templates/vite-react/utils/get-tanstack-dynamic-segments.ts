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
    segments: dynamicSegments
      ? dynamicSegments.map((seg) => {
          const segmentName = seg.slice(1);
          if (/^\d/.test(segmentName)) {
            throw new Error(
              `x Dynamic segments cannot start with a number: ${seg}!`
            );
          }
          if (segmentName.includes("-")) {
            throw new Error(
              `x Dynamic segments cannot contain dashes: ${seg}!`
            );
          }
          if (/[?]/.test(segmentName)) {
            throw new Error(
              `x Dynamic segments cannot contain question marks: ${seg}!`
            );
          }
          if (!/^[A-Za-z_]\w*$/.test(segmentName)) {
            throw new Error(
              `x Dynamic segments can only contain alphanumeric characters and underscores, and must start with a letter or underscore: ${seg}!`
            );
          }
          if (seg.split("-").length > 1) {
            throw new Error(
              `x Dynamic segments cannot contain dashes: ${seg}!`
            );
          }
          return seg.slice(1);
        })
      : [],
  };
}

export { getTanstackDynamicSegments };
