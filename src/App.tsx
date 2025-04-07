import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "./components/RecipeCard";
import { RecipeDetail } from "./components/RecipeDetail";
import { Recipe } from "./types/recipe";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery<Recipe[], Error>({
    queryKey: ["recipes", searchTerm],
    queryFn: async () => {
      if (!searchTerm) return [];
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();
      return (
        data.meals?.map((meal: any) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          description: meal.strInstructions.slice(0, 100) + "...",
          image: meal.strMealThumb,
          ingredients: Array.from({ length: 20 }, (_, i) =>
            meal[`strIngredient${i + 1}`]
              ? `${meal[`strIngredient${i + 1}`]} - ${
                  meal[`strMeasure${i + 1}`]
                }`
              : ""
          ).filter(Boolean),
          instructions: meal.strInstructions,
          prepTime: "30-45 minutes",
        })) || []
      );
    },
    enabled: !!searchTerm,
  });

  const toggleFavorite = (recipeId: string) => {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Recipe Finder</h1>

        <div className="mb-6">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes by ingredient or keyword..."
            className="w-full"
          />
        </div>

        {isLoading && <p className="text-center text-gray-600">Loading...</p>}
        {error && (
          <p className="text-center text-red-500">Error: {error.message}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={setSelectedRecipe}
              isFavorite={favorites.includes(recipe.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {!searchTerm && (
          <p className="text-center text-gray-600 mt-6">
            Enter a search term to find recipes!
          </p>
        )}
        {searchTerm && recipes?.length === 0 && (
          <p className="text-center text-gray-600 mt-6">
            No recipes found. Try a different search term!
          </p>
        )}

        {selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}

        {favorites.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Favorite Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recipes
                ?.filter((r) => favorites.includes(r.id))
                .map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={setSelectedRecipe}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
