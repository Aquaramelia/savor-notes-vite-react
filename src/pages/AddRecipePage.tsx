// src/pages/AddRecipePage.tsx
import React from 'react';
import AddRecipe from '../components/AddRecipe'; // Make sure the path is correct

const AddRecipePage: React.FC = () => {
  return (
    <div>
      <h1>Add a New Recipe</h1>
      <AddRecipe />
    </div>
  );
};

export default AddRecipePage;
