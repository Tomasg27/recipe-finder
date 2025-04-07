import { toast } from "@/lib/toast";
import { Ingredient, Recipe, RecipeDetails } from "@/types/recipe";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Helper to convert MealDB meal to our Recipe format
const convertMealToRecipe = (meal: any): Recipe => {
  return {
    id: parseInt(meal.idMeal),
    title: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    tags: meal.strTags,
    source: meal.strSource,
  };
};

// Helper to extract ingredients from a meal
const extractIngredients = (meal: any): Ingredient[] => {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientName = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredientName && ingredientName.trim()) {
      ingredients.push({
        id: i,
        name: ingredientName,
        measure: measure || "",
        original: measure ? `${measure} ${ingredientName}` : ingredientName,
      });
    }
  }

  return ingredients;
};

export const searchRecipesByIngredients = async (
  ingredients: string
): Promise<Recipe[]> => {
  try {
    // MealDB doesn't have a specific endpoint for searching by multiple ingredients
    // So I will just take the first ingredient and search for recipes that include it
    const mainIngredient = ingredients.split(",")[0].trim();
    const response = await fetch(`${BASE_URL}/filter.php?i=${mainIngredient}`);

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();

    if (!data.meals) {
      return [];
    }

    return data.meals.slice(0, 12).map(convertMealToRecipe);
  } catch (error) {
    console.error("Error searching recipes:", error);
    toast.error("Failed to fetch recipes. Please try again.");
    return [];
  }
};

export const searchRecipesByQuery = async (
  query: string
): Promise<Recipe[]> => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${query}`);

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();

    if (!data.meals) {
      return [];
    }

    return data.meals.slice(0, 12).map(convertMealToRecipe);
  } catch (error) {
    console.error("Error searching recipes:", error);
    toast.error("Failed to fetch recipes. Please try again.");
    return [];
  }
};

export const getRecipeDetails = async (
  id: number
): Promise<RecipeDetails | null> => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch recipe details");
    }

    const data = await response.json();

    if (!data.meals || data.meals.length === 0) {
      return null;
    }

    const meal = data.meals[0];
    const ingredients = extractIngredients(meal);

    const instructions = meal.strInstructions || "No instructions available.";
    const summary = meal.strInstructions
      ? meal.strInstructions.slice(0, 150) + "..."
      : "No summary available.";

    return {
      ...convertMealToRecipe(meal),
      summary: summary,
      instructions: instructions,
      ingredients: ingredients,
      readyInMinutes: 30,
      servings: 4,
    };
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    toast.error("Failed to fetch recipe details. Please try again.");
    return null;
  }
};
