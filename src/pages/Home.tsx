import React, { useState, useEffect } from "react";
import RecipeGrid from "../components/RecipeGrid";
import SearchBar from "../components/SearchBar";
import api from "../utils/api"; // Axios instance
import { Recipe } from "../types"; // Import the Recipe type

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch recipes from the API
    api
      .get("/recipes") // Ensure the endpoint matches the Rails route
      .then((response) => {
        // Transform the response to match the expected data structure
        const fetchedRecipes = Array.isArray(response.data)
          ? response.data.map((item) => ({
              id: String(item.id),
              title: item.title,
              image: item.image,
              ingredients: item.ingredients || [],
              instructions: item.instructions || "",
            }))
          : [];

        setRecipes(fetchedRecipes); // Set the recipes state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError("Error fetching recipes");
        setLoading(false);
        console.error("Error fetching recipes:", error);
      });
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show an error message if fetching fails
  }

  return (
    <div>
      <SearchBar />
      {/* Pass recipes data to RecipeGrid */}
      <RecipeGrid recipes={recipes} />
    </div>
  );
};

export default Home;
