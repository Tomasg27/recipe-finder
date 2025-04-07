import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  onFavorite: (recipe: Recipe) => void;
  isFavorite: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onClick,
  onFavorite,
  isFavorite,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full animate-fade-in">
      <div
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={() => onClick(recipe)}
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white",
            isFavorite && "text-recipe-primary"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(recipe);
          }}
        >
          <Bookmark
            className={cn("h-5 w-5", isFavorite && "fill-recipe-primary")}
          />
        </Button>
      </div>
      <CardContent className="p-4 flex flex-col flex-1">
        <h3
          className="font-semibold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-recipe-primary transition-colors"
          onClick={() => onClick(recipe)}
        >
          {recipe.title}
        </h3>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {recipe.readyInMinutes && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{recipe.readyInMinutes} min</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center text-sm text-muted-foreground ml-auto">
              <Users className="h-4 w-4 mr-1" />
              <span>{recipe.servings} servings</span>
            </div>
          )}
          {recipe.usedIngredientCount !== undefined && (
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="text-recipe-secondary font-medium">
                {recipe.usedIngredientCount} ingredients matched
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
