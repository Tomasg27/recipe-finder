export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType?: string;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
  missedIngredients?: Ingredient[];
  usedIngredients?: Ingredient[];
  unusedIngredients?: Ingredient[];
  likes?: number;
  summary?: string;
  instructions?: string;
  readyInMinutes?: number;
  servings?: number;
  category?: string;
  area?: string;
  tags?: string;
  source?: string;
}

export interface Ingredient {
  id: number;
  amount?: number;
  unit?: string;
  unitLong?: string;
  unitShort?: string;
  aisle?: string;
  name: string;
  original?: string;
  originalName?: string;
  meta?: string[];
  image?: string;
  measure?: string;
}

export interface RecipeDetails extends Recipe {
  summary: string;
  instructions: string;
  readyInMinutes?: number;
  servings?: number;
  ingredients: Ingredient[];
}
