import { useState } from "react";

export default function InsertRecipes() {
  const options = [
    { value: "Sweet", label: "Sweet" },
    { value: "Savoury", label: "Savoury" },
    { value: "Dessert", label: "Dessert" },
    { value: "Snack", label: "Snack" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0].value); // Set the initial value

  return (
    <div>
      <form id="recipesIn">
        <div>
          <img src="/" />
        </div>
        <label>Name</label>
        <input name="name" placeholder="Name" required />
        <label>Name of the dish</label>
        <input name="title" placeholder="Name of Dish" required />
        <label>Ingredients</label>
        <input name="ingredients" placeholder="List of Ingredients" required />
        <label>Name of the dish</label>
        <input
          name="instructions"
          placeholder="List of Instructions"
          required
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
