import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import SearchBar, { SearchBarRef } from "@/components/SearchBar";
import RecipeGrid from "@/components/RecipeGrid";
import RecipeDetails from "@/components/RecipeDetails";
import HomeHero from "@/components/HomeHero";
import {
  searchRecipesByQuery,
  getRecipeDetails,
} from "@/services/recipeService";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "@/lib/toast";
import { Recipe, RecipeDetails as RecipeDetailsType } from "@/types/recipe";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsType | null>(
    null
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"search" | "favorites">("search");
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const searchBarRef = useRef<SearchBarRef>(null);

  // Query for recipe search results
  const {
    data: recipes = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["recipes", searchQuery],
    queryFn: () => searchRecipesByQuery(searchQuery),
    enabled: searchQuery.length > 0,
  });

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab("search");
  };

  // Handle recipe selection and fetch details
  const handleRecipeClick = async (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDetailsModalOpen(true);

    try {
      const details = await getRecipeDetails(recipe.id);
      if (details) {
        setRecipeDetails(details);
      }
    } catch (error) {
      console.error("Failed to fetch recipe details:", error);
      toast.error("Failed to load recipe details. Please try again.");
    }
  };

  // Handle closing the recipe details modal
  const handleCloseDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedRecipe(null);
    setRecipeDetails(null);
  };

  // Handle favorite action from the details modal
  const handleToggleFavorite = () => {
    if (!selectedRecipe) return;

    if (isFavorite(selectedRecipe.id)) {
      removeFavorite(selectedRecipe.id);
    } else {
      addFavorite(selectedRecipe);
    }
  };

  // Handle favorite action from recipe card
  const handleCardFavorite = (recipe: Recipe) => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  // Scroll to search when "Get Started" is clicked on the hero and focus the search input
  const handleGetStarted = () => {
    const searchElement = document.getElementById("search-section");
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: "smooth" });
      // Use setTimeout to ensure the focus happens after the scrolling
      setTimeout(() => {
        searchBarRef.current?.focus();
      }, 500);
    }
  };

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      favoritesCount={favorites.length}
    >
      {activeTab === "search" && !searchQuery && (
        <HomeHero onGetStarted={handleGetStarted} />
      )}

      <div id="search-section" className="mt-8">
        {activeTab === "search" && (
          <div className="mb-8 flex justify-center">
            <SearchBar ref={searchBarRef} onSearch={handleSearch} />
          </div>
        )}

        {activeTab === "search" && searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-1">Search Results</h2>
            <p className="text-muted-foreground">
              Showing results for "{searchQuery}"
            </p>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-1">Your Favorites</h2>
            <p className="text-muted-foreground">
              {favorites.length > 0
                ? `You have ${favorites.length} saved recipe${
                    favorites.length > 1 ? "s" : ""
                  }`
                : "You have no saved recipes yet. Search and save recipes to see them here!"}
            </p>
          </div>
        )}

        {activeTab === "search" && isError && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2 text-red-500">
              Oops! Something went wrong
            </h3>
            <p className="text-muted-foreground mb-4">
              We couldn't fetch the recipes. Please try again later.
            </p>
            <button
              onClick={() => refetch()}
              className="text-recipe-primary hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        <RecipeGrid
          recipes={activeTab === "search" ? recipes : favorites}
          onRecipeClick={handleRecipeClick}
          onFavorite={handleCardFavorite}
          isFavorite={isFavorite}
          loading={isLoading}
        />
      </div>

      <RecipeDetails
        recipe={recipeDetails}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetails}
        onFavorite={handleToggleFavorite}
        isFavorite={selectedRecipe ? isFavorite(selectedRecipe.id) : false}
      />
    </Layout>
  );
};

export default Index;
