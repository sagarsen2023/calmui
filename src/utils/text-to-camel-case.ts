export default function textToCamelCase({
  str,
  separator,
}: {
  str: string;
  separator: string;
}): string {
  const words = str
    .split(separator)
    .filter(Boolean)
    .map((w) => w.toLowerCase());

  return words
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
}
