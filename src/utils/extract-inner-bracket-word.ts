export function extractInnerWord(s: string) {
  if (s.startsWith("(") && s.endsWith(")")) {
    return s.slice(1, -1);
  }
  return s;
}
