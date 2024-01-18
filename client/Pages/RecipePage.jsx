import { useState, useEffect } from "react";
export default function RecipePage() {
  const [familyRecipes, setFamilyRecipes] = useState([]);

  useEffect(() => {
    handleGetFamilyRecipes();
  }, []);

  async function handleGetFamilyRecipes() {
    const response = await fetch("http://localhost:8080/recipes");
    const data = await response.json();

    setFamilyRecipes(data);
  }
  return (
    <>
      <div>
        <h2>Our Collected Recipes</h2>
        <ul>
          {familyRecipes.map((recipe) => {
            return <li key={recipe.id + recipe.name}>{recipe.title}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
