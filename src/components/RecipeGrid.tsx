import { Recipe } from "@/types/recipe";
import React from "react";
import RecipeCard from "./RecipeCard";

interface RecipeGridProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
  onFavorite: (recipe: Recipe) => void;
  isFavorite: (id: number) => boolean;
  loading?: boolean;
  hasSearched?: boolean; // New prop to track if a search has been performed
}

const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  onRecipeClick,
  onFavorite,
  isFavorite,
  loading = false,
  hasSearched = false, // Default to false
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-72 bg-gray-100 animate-pulse rounded-md"
          ></div>
        ))}
      </div>
    );
  }

  if (hasSearched && recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
        <p className="text-muted-foreground">
          Try searching for different ingredients or keywords
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={onRecipeClick}
          onFavorite={onFavorite}
          isFavorite={isFavorite(recipe.id)}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;
