import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bookmark, Clock, Users, Globe, Tag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeDetails as RecipeDetailsType } from "@/types/recipe";

interface RecipeDetailsProps {
  recipe: RecipeDetailsType | null;
  isOpen: boolean;
  onClose: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  recipe,
  isOpen,
  onClose,
  onFavorite,
  isFavorite,
}) => {
  if (!recipe) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2">
          <div className="flex items-center gap-4">
            <DialogTitle className="text-2xl font-bold">
              {recipe.title}
            </DialogTitle>
            <Button
              variant="outline"
              size="icon"
              className={cn(isFavorite && "text-recipe-primary")}
              onClick={onFavorite}
            >
              <Bookmark
                className={cn("h-5 w-5", isFavorite && "fill-recipe-primary")}
              />
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {recipe.category && (
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-recipe-primary" />
                <span>{recipe.category}</span>
              </div>
            )}
            {recipe.area && (
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-recipe-primary" />
                <span>{recipe.area}</span>
              </div>
            )}
            {recipe.readyInMinutes && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-recipe-primary" />
                <span>{recipe.readyInMinutes} minutes</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-recipe-primary" />
                <span>{recipe.servings} servings</span>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="mb-4 overflow-hidden rounded-md">
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            className="w-full h-64 object-cover"
          />
        </div>

        <Tabs defaultValue="ingredients">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients" className="mt-4 space-y-4">
            <h3 className="font-semibold text-lg">Ingredients</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-recipe-primary"></span>
                    <span>
                      {ingredient.original ||
                        `${ingredient.measure} ${ingredient.name}`}
                    </span>
                  </li>
                ))}
            </ul>
          </TabsContent>

          <TabsContent value="instructions" className="mt-4 space-y-4">
            <h3 className="font-semibold text-lg">Instructions</h3>
            {recipe.instructions ? (
              <div className="prose max-w-none">
                {recipe.instructions
                  .split("\r\n")
                  .map(
                    (instruction, index) =>
                      instruction.trim() && <p key={index}>{instruction}</p>
                  )}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No instructions available for this recipe.
              </p>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={onFavorite}
            className={cn(
              "bg-recipe-primary hover:bg-recipe-primary/90",
              isFavorite && "bg-gray-200 hover:bg-gray-300 text-gray-800"
            )}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetails;
