import React from "react";

interface RecipesTabsProps {
  activeTab: "search" | "favorites";
  searchQuery: string;
  favoritesCount: number;
}

const RecipesTabs: React.FC<RecipesTabsProps> = ({
  activeTab,
  searchQuery,
  favoritesCount,
}) => {
  if (activeTab === "search" && searchQuery) {
    return (
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Search Results</h2>
        <p className="text-muted-foreground">
          Showing results for "{searchQuery}"
        </p>
      </div>
    );
  }

  if (activeTab === "favorites") {
    return (
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Your Favorites</h2>
        <p className="text-muted-foreground">
          {favoritesCount > 0
            ? `You have ${favoritesCount} saved recipe${
                favoritesCount > 1 ? "s" : ""
              }`
            : "You have no saved recipes yet. Search and save recipes to see them here!"}
        </p>
      </div>
    );
  }

  return null;
};

export default RecipesTabs;
