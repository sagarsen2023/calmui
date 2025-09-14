export default function firstLetterCapitalize({
  str,
  separator,
}: {
  str: string;
  separator: string;
}) {
  return str
    ?.toLowerCase()
    ?.split(separator)
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join(" ");
}
