import { useState, useEffect } from "react";
import { toast } from "@/lib/toast";
import { Recipe } from "@/types/recipe";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    // Load favorites from localStorage during initialization
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        return JSON.parse(storedFavorites);
      } catch (e) {
        console.error("Failed to parse favorites from localStorage", e);
        localStorage.removeItem("favorites");
      }
    }
    return [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (recipe: Recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      setFavorites((prev) => [...prev, recipe]);
      toast.success(`${recipe.title} added to favorites!`);
    } else {
      toast.info(`${recipe.title} is already in your favorites`);
    }
  };

  const removeFavorite = (id: number) => {
    const recipe = favorites.find((fav) => fav.id === id);
    setFavorites((prev) => prev.filter((recipe) => recipe.id !== id));
    if (recipe) {
      toast.success(`${recipe.title} removed from favorites`);
    }
  };

  const isFavorite = (id: number) => {
    return favorites.some((recipe) => recipe.id === id);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
