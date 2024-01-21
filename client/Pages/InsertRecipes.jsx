import { useState } from "react";

export default function InsertRecipes() {
  const options = [
    { value: "Sweet", label: "Sweet" },
    { value: "Savoury", label: "Savoury" },
    { value: "Dessert", label: "Dessert" },
    { value: "Snack", label: "Snack" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0].value); // Set the initial value

  // Inside InsertRecipes component
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    ingredients: "",
    instructions: "",
    genre: options[0].value, // Set initial value for genre
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://family-recipe-builder-server.onrender.com/recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const json = await response.json();
      console.log("Response from server:", json);

      // Clear the form after successful submission
      setFormData({
        name: "",
        title: "",
        ingredients: "",
        instructions: "",
        genre: options[0].value,
      });
    } catch (error) {
      console.error("Error submitting recipe:", error);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  };

  // Update form JSX:
  // <form onSubmit={handleSubmit}>{/* ... */}</form>;

  return (
    <div>
      <form id="addRecipes" onSubmit={handleSubmit}>
        <div>
          <img src="/" />
        </div>
        <label>Name</label>
        <input
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
        />
        <label>Name of the dish</label>
        <input
          name="title"
          placeholder="Name of Dish"
          required
          onChange={handleChange}
        />
        <label>Ingredients</label>
        <input
          name="ingredients"
          placeholder="List of Ingredients"
          required
          onChange={handleChange}
        />
        <label>Instructions</label>
        <input
          name="instructions"
          placeholder="List of Instructions"
          required
          onChange={handleChange}
        />
        <label htmlFor="myDropdown">Select an option:</label>
        <select
          id="myDropdown"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button className="submit">Thank you - now submit your recipe</button>
      </form>
    </div>
  );
}
