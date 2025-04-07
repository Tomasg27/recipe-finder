import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import React from "react";

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
  const isMobile = useIsMobile();

  const navigationItems = (
    <>
      <NavigationMenuItem>
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
      </NavigationMenuItem>
      <NavigationMenuItem>
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
      </NavigationMenuItem>
    </>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col gap-2 pt-10">
          <div className="flex flex-col gap-2">
            <Button
              variant={activeTab === "search" ? "default" : "outline"}
              onClick={() => onTabChange("search")}
              className={cn(
                activeTab === "search" &&
                  "bg-recipe-primary hover:bg-recipe-primary/90"
              )}
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
            >
              Favorites
              {favoritesCount > 0 && (
                <span className="ml-2 bg-white text-recipe-primary text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-2">
        {navigationItems}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
