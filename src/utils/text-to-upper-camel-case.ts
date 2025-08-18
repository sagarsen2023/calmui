export const upperCamelCase = ({
  str,
  separator,
}: {
  str: string;
  separator: string;
}): string => {
  const words = str.split(separator);
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join("");
};
