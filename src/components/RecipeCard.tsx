// src/components/RecipeCard.tsx

import React from 'react';
import styled from 'styled-components';
import { Recipe } from '../types'; // Import Recipe interface

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const Title = styled.h3`
  margin: 0.5rem;
`;

interface RecipeCardProps {
  recipe: Recipe; // Use the imported Recipe interface here
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Card>
      <Image src={recipe.image || 'placeholder.jpg'} alt={recipe.title} />
      <Title>{recipe.title}</Title>
    </Card>
  );
};

export default RecipeCard;
