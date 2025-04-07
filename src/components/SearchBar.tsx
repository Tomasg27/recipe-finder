import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

export interface SearchBarRef {
  focus: () => void;
}

const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(
  ({ onSearch, className }, ref) => {
    const [searchTerm, setSearchTerm] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        onSearch(searchTerm.trim());
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className={cn("flex w-full max-w-3xl gap-2", className)}
      >
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search recipes by ingredients or keywords (e.g., pasta, vegetarian, quick dinner)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 h-12 text-base"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>
        <Button
          type="submit"
          className="bg-recipe-primary hover:bg-recipe-primary/90 h-12 px-6"
        >
          Search
        </Button>
      </form>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
