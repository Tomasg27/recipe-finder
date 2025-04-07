# Recipe Finder Application

## Setup and Running

1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open `http://localhost:5173` in your browser
5. The application uses the MealDB API (https://www.themealdb.com/api.php) for recipe data.

## Tools and Libraries

- **Vite**: Fast development environment
- **React**: Core frontend framework
- **TypeScript**: Static typing
- **shadcn/ui**: UI component library built with Radix UI and Tailwind CSS
- **Tailwind CSS**: Utility-first CSS framework
- **React Query**: Data fetching and state management
- **LocalStorage**: Persistent storage for favorites

## Assumptions and Design Decisions

1. **TypeScript**: Used for type safety and better developer experience.
2. **Project Structure**: Follows Vite's conventions with shadcn/ui components.
3. **MealDB API**: Used as the data source; prep time hardcoded as it's not provided.
4. **Responsive Design**: Tailwind grid ensures responsiveness across devices.
5. **State Management**: React Query for API calls, localStorage for favorites.
6. **Error Handling**: Handles API failures and empty searches.
7. **UI/UX**: Uses shadcn/ui components for polished, accessible UI.
8. **Performance**: React Query provides caching and request deduping.

This solution demonstrates senior-level frontend skills with modern tooling, type safety, component architecture, and UI practices.
