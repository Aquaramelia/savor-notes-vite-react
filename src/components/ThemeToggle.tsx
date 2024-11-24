import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
`;

interface ThemeToggleProps {
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  return <Button onClick={toggleTheme}>Toggle Theme</Button>;
};

export default ThemeToggle;
