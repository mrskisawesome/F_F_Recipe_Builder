import { Link, Routes, Route } from "react-router-dom";
import RecipePage from "../Pages/RecipePage";
import GFPage from "../Pages/GFPage";
import InsertRecipes from "../Pages/InsertRecipes";
import Home from "../Pages/Home";
import React from "react";

export default function App() {
  return (
    <>
      <div className="header">
        <Link className="navlink home" to="/">
          Home
        </Link>
        <Link className="navlink insertrecipes" to="/insertrecipes">
          Add a recipe
        </Link>
        <Link className="navlink gfpage" to="/gfpage">
          Find a recipe
        </Link>
        <Link className="navlink our_recipes" to="/recipes">
          Add a recipe
        </Link>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gfpage" element={<GFPage />} />
          <Route path="/insertrecipes" element={<InsertRecipes />} />
          <Route path="/recipes" element={<RecipePage />} />
        </Routes>
      </div>
    </>
  );
}
