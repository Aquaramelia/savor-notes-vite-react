import React from 'react';
import styled from 'styled-components';
import ThemeToggle from './ThemeToggle';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.accent};
  color: #fff;
`;

const Title = styled.h1`
  font-family: 'Merriweather', serif;
`;

interface HeaderProps {
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  return (
    <HeaderContainer>
      <Title>SavorNotes</Title>
      <ThemeToggle toggleTheme={toggleTheme} />
    </HeaderContainer>
  );
};

export default Header;
