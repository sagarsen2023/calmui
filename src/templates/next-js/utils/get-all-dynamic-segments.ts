/**
 * @param route - The route pattern (e.g., "/folder1/:folder2/:folder3")
 * @returns An array of dynamic segment names (e.g., ["folder2", "folder3"])
 */
function getAllDynamicSegments(route: string) {
  const dynamicSegments = route.match(/:([^/]+)/g);
  return dynamicSegments ? dynamicSegments.map((seg) => seg.slice(1)) : [];
}

export { getAllDynamicSegments };
