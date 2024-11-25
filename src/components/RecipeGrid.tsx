// src/components/RecipeGrid.tsx

import React from "react";
import styled from "styled-components";
import RecipeCard from "./RecipeCard";
import { Recipe } from "../types"; // Import Recipe interface
import { Link } from "react-router-dom";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

interface RecipeGridProps {
  recipes: Recipe[];
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes }) => {
  if (recipes.length === 0) {
    return <div>No recipes available. Try again later.</div>; // Gracefully handle empty recipes list
  }

  return (
    <Grid>
      {recipes.map((recipe) => (
        <Link
          key={recipe.id}
          to={`/recipes/${recipe.id}`}
          style={{ textDecoration: "none" }}
        >
          <RecipeCard recipe={recipe} />
        </Link>
      ))}
    </Grid>
  );
};

export default RecipeGrid;
