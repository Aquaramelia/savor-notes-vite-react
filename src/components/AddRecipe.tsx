import React, { useState, ChangeEvent, FormEvent } from 'react';
import api from '../utils/api';

// Define the Recipe interface to match the API response structure
export interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string;
}

const AddRecipe: React.FC = () => {
  // Define the state to match the Recipe interface
  const [recipe, setRecipe] = useState<Partial<Recipe>>({
    title: '',
    image: '',
    ingredients: [],
    instructions: '',
  });

  // Update the change handler type to match the input and textarea elements
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  // Handle form submission with the correct event type
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Convert ingredients from comma-separated string to an array
    const formattedRecipe = {
      ...recipe,
      ingredients: recipe.ingredients ? recipe.ingredients.map(item => item.trim()) : [],
      image: '', // You might want to handle the image upload logic here
    };

    api.post('/recipes', formattedRecipe)
      .then((response) => console.log('Recipe added:', response.data))
      .catch((error) => console.error('Error adding recipe:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={recipe.title || ''}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="image"
        value={recipe.image || ''}
        onChange={handleChange}
        placeholder="Cooking Time"
      />
      <textarea
        name="ingredients"
        value={recipe.ingredients || ''}
        onChange={handleChange}
        placeholder="Ingredients (comma-separated)"
      />
      <textarea
        name="instructions"
        value={recipe.instructions || ''}
        onChange={handleChange}
        placeholder="Instructions"
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;
