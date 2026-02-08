export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word.length <= 3) {
        return word.charAt(0).toLowerCase() + word.slice(1);
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    })
    .join(' ');
}
