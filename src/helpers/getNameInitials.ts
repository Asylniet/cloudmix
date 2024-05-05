export function getNameInitials(name: string): string {
  const [firstName, lastName] = name.toUpperCase().split(" ");
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
}
