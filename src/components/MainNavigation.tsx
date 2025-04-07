import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React from "react";
// import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MainNavigationProps {
  activeTab: "search" | "favorites";
  onTabChange: (tab: "search" | "favorites") => void;
  favoritesCount: number;
}

const MainNavigation: React.FC<MainNavigationProps> = ({
  activeTab,
  onTabChange,
  favoritesCount,
}) => {
  //   const isMobile = useIsMobile();

  const navigationItems = (
    <div className="flex gap-2">
      <Button
        variant={activeTab === "search" ? "default" : "outline"}
        onClick={() => onTabChange("search")}
        className={cn(
          activeTab === "search" &&
            "bg-recipe-primary hover:bg-recipe-primary/90"
        )}
        aria-current={activeTab === "search" ? "page" : undefined}
      >
        Search Recipes
      </Button>
      <Button
        variant={activeTab === "favorites" ? "default" : "outline"}
        onClick={() => onTabChange("favorites")}
        className={cn(
          activeTab === "favorites" &&
            "bg-recipe-primary hover:bg-recipe-primary/90"
        )}
        aria-current={activeTab === "favorites" ? "page" : undefined}
      >
        Favorites
        {favoritesCount > 0 && (
          <span className="ml-2 bg-white text-recipe-primary text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {favoritesCount}
          </span>
        )}
      </Button>
    </div>
  );

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-2">
        <NavigationMenuItem>{navigationItems}</NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
