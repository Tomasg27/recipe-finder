import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Recipe } from "../types/recipe";

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
}

export function RecipeDetail({ recipe, onClose }: RecipeDetailProps) {
  return (
    <Dialog open={!!recipe} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-md"
          />
          <div>
            <h3 className="font-semibold text-lg">Ingredients:</h3>
            <ul className="list-disc pl-5 text-sm">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Instructions:</h3>
            <p className="text-sm">{recipe.instructions}</p>
          </div>
          <p className="text-gray-600 text-sm">Prep Time: {recipe.prepTime}</p>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
