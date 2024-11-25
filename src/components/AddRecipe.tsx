import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import api from "../utils/api";

// Define the Recipe interface to match the API response structure
export interface Recipe {
  id: string;
  title: string;
  image: File | null;
  ingredients: string[];
  instructions: string;
}

const AddRecipe: React.FC = () => {
  const [recipe, setRecipe] = useState<Partial<Recipe>>({
    title: "",
    image: null,
    ingredients: [],
    instructions: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const ingredientsArray = value.split(",").map((item) => item.trim()).filter(Boolean);
    setRecipe({ ...recipe, ingredients: ingredientsArray });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setRecipe({ ...recipe, image: file });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!recipe.title || recipe.ingredients?.length === 0 || !recipe.instructions) {
      alert("Please fill in all fields");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    if (recipe.title) formData.append("recipe[title]", recipe.title);
    if (recipe.image) formData.append("recipe[image]", recipe.image);
    if (recipe.ingredients) {
      recipe.ingredients.forEach((ingredient, index) => {
        formData.append(`recipe[ingredients][${index}]`, ingredient);
      });
    }
    if (recipe.instructions) formData.append("recipe[instructions]", recipe.instructions);

    api
      .post("/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Recipe added:", response.data);

        // Redirect to homepage after successfully adding the recipe
        navigate("/"); // This will take you to the homepage (or modify the URL as needed)
      })
      .catch((error) => {
        console.error("Error adding recipe:", error);
        alert("Failed to add recipe, please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          name="title"
          value={recipe.title || ""}
          onChange={handleChange}
          placeholder="Recipe Title"
        />
      </div>

      <div>
        <label>Image</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        {recipe.image && (
          <div>
            <img
              src={URL.createObjectURL(recipe.image)}
              alt="Selected Recipe"
              style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain" }}
            />
          </div>
        )}
      </div>

      <div>
        <label>Ingredients</label>
        <textarea
          name="ingredients"
          value={recipe.ingredients?.join(", ") || ""}
          onChange={handleIngredientsChange}
          placeholder="Enter ingredients, comma-separated"
        />
      </div>

      <div>
        <label>Instructions</label>
        <textarea
          name="instructions"
          value={recipe.instructions || ""}
          onChange={handleChange}
          placeholder="Recipe Instructions"
        />
      </div>

      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;
