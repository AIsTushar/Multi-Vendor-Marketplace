import baseSlugify from "slugify";

export const slugify = (text: string): string => {
  return baseSlugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
};

/**
 * Generate a unique slug from multiple fields of a payload
 * @param payload - Object containing fields
 * @param fields - Array of field names to include in slug
 * @param model - Prisma model delegate (e.g., prisma.example)
 * @returns unique slug string
 */
export async function generateSlugFromFields<
  T extends { findUnique: (args: any) => Promise<any> }
>(payload: Record<string, any>, fields: string[], model: T): Promise<string> {
  // Join all the fields into a single string
  const text = fields
    .map((f) => payload[f])
    .filter(Boolean)
    .join(" ");

  // Base slug using your slugify function
  const baseSlug = slugify(text);

  // Ensure uniqueness in the database
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (true) {
    const exists = await model.findUnique({
      where: { slug: uniqueSlug },
    });
    if (!exists) break;

    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}
