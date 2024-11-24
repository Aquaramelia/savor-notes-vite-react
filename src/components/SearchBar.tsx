import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchBar: React.FC = () => {
  return <Input type="text" placeholder="Search recipes..." />;
};

export default SearchBar;
