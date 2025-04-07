import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function RecipeCard({
  recipe,
  onClick,
  isFavorite,
  onToggleFavorite,
}: RecipeCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle>{recipe.title}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-md mb-4"
          onClick={() => onClick(recipe)}
        />
        <Button
          variant={isFavorite ? "destructive" : "default"}
          className="w-full"
          onClick={() => onToggleFavorite(recipe.id)}
        >
          {isFavorite ? "Remove Favorite" : "Add to Favorites"}
        </Button>
      </CardContent>
    </Card>
  );
}
