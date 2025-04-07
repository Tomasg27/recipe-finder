import ErrorRecipes from "@/components/ErrorRecipes";
import HomeHero from "@/components/HomeHero";
import Layout from "@/components/Layout";
import RecipeDetails from "@/components/RecipeDetails";
import RecipeGrid from "@/components/RecipeGrid";
import RecipesTabs from "@/components/RecipesTabs";
import SearchBar, { SearchBarRef } from "@/components/SearchBar";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "@/lib/toast";
import {
  getRecipeDetails,
  searchRecipesByQuery,
} from "@/services/recipeService";
import { Recipe, RecipeDetails as RecipeDetailsType } from "@/types/recipe";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab("search");
  };

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

  const handleCloseDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedRecipe(null);
    setRecipeDetails(null);
  };

  const handleToggleFavorite = () => {
    if (!selectedRecipe) return;

    if (isFavorite(selectedRecipe.id)) {
      removeFavorite(selectedRecipe.id);
    } else {
      addFavorite(selectedRecipe);
    }
  };

  const handleCardFavorite = (recipe: Recipe) => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  const handleGetStarted = () => {
    const searchElement = document.getElementById("search-section");
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: "smooth" });
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

        <RecipesTabs
          activeTab={activeTab}
          searchQuery={searchQuery}
          favoritesCount={favorites.length}
        />

        {activeTab === "search" && isError && (
          <ErrorRecipes onRetry={refetch} />
        )}

        <RecipeGrid
          recipes={activeTab === "search" ? recipes : favorites}
          onRecipeClick={handleRecipeClick}
          onFavorite={handleCardFavorite}
          isFavorite={isFavorite}
          loading={isLoading}
          hasSearched={!!searchQuery}
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
