import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/globalStyles";
import Header from "./components/Header";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Login from "./components/Login";
import RecipeGrid from "./components/RecipeGrid";
import AddRecipePage from "./pages/AddRecipePage";

const lightTheme = {
  background: "#FFF4E0",
  text: "#333",
  accent: "#A3B18A",
};

const darkTheme = {
  background: "#2E2E2E",
  text: "#EAEAEA",
  accent: "#F4A261",
};

function App() {
  const [theme, setTheme] = useState(lightTheme);

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme(darkTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);

    // Save the new theme in localStorage
    localStorage.setItem("theme", newTheme === darkTheme ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Header toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipeGrid recipes={[]} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
