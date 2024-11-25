export interface Recipe {
  id: string; // Use string for id
  title: string;
  images: (File | string)[]; // Allow both File objects and URLs
  ingredients: string[];
  instructions: string;
}
