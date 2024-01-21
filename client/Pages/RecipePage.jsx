import { useState, useEffect } from "react";
export default function RecipePage() {
  const [familyRecipes, setFamilyRecipes] = useState([]);

  useEffect(() => {
    handleGetFamilyRecipes();
  }, []);

  async function handleGetFamilyRecipes() {
    const response = await fetch(
      "https://family-recipe-builder-server.onrender.com/recipes"
    );
    const data = await response.json();

    setFamilyRecipes(data);
  }

  return (
    <>
      <div>
        <h2>Our Collected Recipes</h2>
        <ul>
          {familyRecipes.map((recipe) => {
            return (
              <>
                <li key={recipe.id + recipe.name}>
                  <p>{recipe.name}</p>
                  <p>{recipe.title}</p>
                  <p>{recipe.ingredients}</p>
                  <p>{recipe.instructions}</p>
                  <p>{recipe.genres && recipe.genres[0].name}</p>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}
