import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 text-recipe-primary">
          <span className="text-7xl font-bold">404</span>
        </div>
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Oops! The recipe you're looking for seems to have gone missing from
          our kitchen.
        </p>
        <Button
          asChild
          className="bg-recipe-primary hover:bg-recipe-primary/90"
        >
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
