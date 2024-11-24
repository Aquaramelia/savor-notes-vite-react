import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/globalStyles';
import Header from './components/Header';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';

const lightTheme = { 
  background: '#FFF4E0', 
  text: '#333', 
  accent: '#A3B18A' 
};

const darkTheme = { 
  background: '#2E2E2E', 
  text: '#EAEAEA', 
  accent: '#F4A261' 
};

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Header toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} /> {/* RecipeDetail route */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
