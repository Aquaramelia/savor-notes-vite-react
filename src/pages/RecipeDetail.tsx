import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import styled from 'styled-components';
import { Recipe } from '../types'; // Import the Recipe type from your types file

// Styled components
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 80%;
  max-width: 600px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const IngredientsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Ingredient = styled.li`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Instructions = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2rem;
  margin-top: 1rem;
`;

// Using `useParams` with a proper type
const RecipeDetail: React.FC = () => {
  // Directly typing `useParams` for the `id` parameter
  const { id } = useParams<{ id: string }>(); // Type the `id` as string directly in useParams

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Manage error state

  useEffect(() => {
    if (id) {
      // Fetch the recipe details from the API
      api.get(`/recipes/${id}`)
        .then((response) => {
          setRecipe(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching recipe details:', error);
          setError('Failed to fetch recipe details');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!recipe) {
    return <div>Recipe not found!</div>;
  }

  return (
    <DetailContainer>
      <Title>{recipe.title}</Title>
      <Image src={recipe.image || 'placeholder.jpg'} alt={recipe.title} />
      
      <h3>Ingredients</h3>
      <IngredientsList>
        {recipe.ingredients.map((ingredient, index) => (
          <Ingredient key={index}>{ingredient}</Ingredient>
        ))}
      </IngredientsList>

      <h3>Instructions</h3>
      <Instructions>{recipe.instructions}</Instructions>
    </DetailContainer>
  );
};

export default RecipeDetail;
