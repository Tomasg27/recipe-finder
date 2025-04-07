# Recipe Finder Application

Recipe Finder is a modern web application that helps users discover recipes based on ingredients or keywords. It features a responsive design, intuitive UI, and seamless state management.

---

## 🚀 Getting Started

Follow these steps to set up and run the application locally:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd recipe-finder
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser:
   ```
   http://localhost:8080
   ```

---

## 🛠️ Tools and Libraries

This project is built with the following technologies:

### Core Frameworks and Libraries

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Adds static typing to JavaScript for better developer experience.
- **Vite**: A fast build tool and development server.

### UI and Styling

- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Radix UI**: Accessible, unstyled UI primitives.
- **shadcn/ui**: Pre-built components styled with Tailwind CSS.
- **Lucide Icons**: A collection of beautiful, customizable icons.

### State Management and Data Fetching

- **React Query**: Handles server-state management and API requests.
- **LocalStorage**: Used for persisting user favorites.

### Notifications

- **Sonner**: A lightweight toast notification library.

---

## 🌟 Features

- **Search Recipes**: Find recipes by ingredients or keywords.
- **Favorites Management**: Save and manage your favorite recipes.
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **Recipe Details**: View detailed information about recipes, including ingredients and instructions.
- **Error Handling**: Graceful handling of API errors with user-friendly messages.

---

## 📂 Project Structure

The project follows a modular structure for scalability and maintainability:

```
src/
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Application pages
├── services/         # API service functions
├── types/            # TypeScript type definitions
├── App.tsx           # Main application entry point
├── main.tsx          # Application bootstrap file
```

---

## 🌐 API Integration

The application uses the [MealDB API](https://www.themealdb.com/) for fetching recipe data. Note that some data, such as preparation time, is hardcoded due to API limitations.

---

## 🧑‍💻 Development Scripts

- Start Development Server:
  ```bash
  npm run dev
  ```
- Build for Production:
  ```bash
  npm run build
  ```
- Preview Production Build:
  ```bash
  npm run preview
  ```
- TypeScript Check:
  ```bash
  npm run tsc
  ```

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## ✨ Credits

- **Created by**: Tomas Gonzalez
- **Icons by**: Lucide
- **UI components by**: shadcn/ui
