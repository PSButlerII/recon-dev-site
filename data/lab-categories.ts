export const labCategories = [
  "3D Printing / Klipper",
  "Product Design",
  "Mechanical Systems",
  "Business Systems",
  "Document Processing",
  "Client Web Application",
] as const;

export type LabCategory = (typeof labCategories)[number];