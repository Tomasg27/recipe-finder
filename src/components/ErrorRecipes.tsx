import React from "react";

interface ErrorRecipesProps {
  onRetry: () => void;
}

const ErrorRecipes: React.FC<ErrorRecipesProps> = ({ onRetry }) => (
  <div className="text-center py-12">
    <h3 className="text-xl font-semibold mb-2 text-red-500">
      Oops! Something went wrong
    </h3>
    <p className="text-muted-foreground mb-4">
      We couldn't fetch the recipes. Please try again later.
    </p>
    <button onClick={onRetry} className="text-recipe-primary hover:underline">
      Try again
    </button>
  </div>
);

export default ErrorRecipes;
