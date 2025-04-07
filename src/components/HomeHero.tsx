import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HomeHeroProps {
  onGetStarted: () => void;
}

const HomeHero: React.FC<HomeHeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-gradient-to-r from-recipe-primary/20 to-recipe-tertiary/20 rounded-lg"
        aria-hidden="true"
      />
      <div className="relative py-12 px-6 md:py-20 md:px-10 rounded-lg overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-slide-up">
            Discover Delicious Recipes with Recipe Finder
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            Enter ingredients you have or dishes you're craving to find the
            perfect recipe for any occasion
          </p>
          <Button
            onClick={onGetStarted}
            className="bg-recipe-primary hover:bg-recipe-primary/90 px-8 py-6 text-lg h-auto animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            Find Recipes <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
