export default function generateSlug(
  title: String,
  maxCharacters: number = 30
): string {
  // Normalize the string to NFD (Normalization Form Decomposed)
  // and remove diacritical marks with a regex
  let normalizedTitle = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Convert to lowercase, replace spaces and special chars with hyphens, and trim leading/trailing hyphens
  let slug = normalizedTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace spaces and special chars with hyphens
    .replace(/(^-|-$)+/g, ''); // Remove leading and trailing hyphens

  // Truncate slug to maxCharacters, ensuring it does not end with a hyphen
  if (slug.length > maxCharacters) {
    slug = slug.substring(0, maxCharacters);
    // If the truncation results in a trailing hyphen, remove it
    if (slug.endsWith('-')) {
      slug = slug.substring(0, slug.length - 1);
    }
  }

  return slug;
}