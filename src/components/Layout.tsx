import React from "react";
import { cn } from "@/lib/utils";
import { Utensils } from "lucide-react";
import MainNavigation from "./MainNavigation";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  activeTab: "search" | "favorites";
  onTabChange: (tab: "search" | "favorites") => void;
  favoritesCount: number;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  activeTab,
  onTabChange,
  favoritesCount,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-recipe-primary" />
            <h1 className="text-xl font-bold">Recipe Finder</h1>
          </div>
          <MainNavigation
            activeTab={activeTab}
            onTabChange={onTabChange}
            favoritesCount={favoritesCount}
          />
        </div>
      </header>
      <main className={cn("container py-8 flex-grow", className)}>
        {children}
      </main>
      <footer className="bg-white border-t py-6 mt-auto">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Recipe Finder. Created by Tomas Gonzalez.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
