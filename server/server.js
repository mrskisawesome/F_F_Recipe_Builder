import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const PORT = 8080;
const app = express();
app.use(cors());
app.use(express.json());

const dbConnectionString = process.env.DATABASE_URL; //retrieving the connection string
const db = new pg.Pool({ connectionString: dbConnectionString });
//Database Pool: A database pool manages a collection of reusable database connections, improving performance and efficiency by avoiding the overhead of establishing new connections for each database interaction.

//testing the response
app.get("/", (request, response) => {
  response.json("This is my root route. How roude.");
});

app.get("/recipes", async (request, response) => {
  const result = await db.query(
    `SELECT
    recipes.id,
    recipes.title,
    recipes.ingredients,
    recipes.instructions,
    recipes.name,
    STRING_AGG(genres.name, ',') AS genres
  FROM recipes
  JOIN recipe_genre ON recipe_genre.recipe_id = recipes.id
  JOIN genres ON genres.id = recipe_genre.genre_id
  GROUP BY recipes.id;`
  );
  response.json(result.rows);
  // console.log(result.rows);
});

app.post("/recipes", async function (request, response) {
  //finds the data from the body which is the writer of the message

  const name = request.body.name;
  //finds the data from the body which is the name of the submitter
  const title = request.body.title;
  const ingredients = request.body.ingredients;
  const instructions = request.body.instructions;
  const genre = request.body.genre;
  console.log(genre);

  //stored in newRecipe
  const newRecipe = await db.query(
    `INSERT INTO recipes (name, title, ingredients, instructions) VALUES ($1, $2, $3, $4) RETURNING * `,
    [name, title, ingredients, instructions]
  );
  console.log(newRecipe);
  const recipeId = newRecipe.rows[0].id;
  console.log(recipeId);
  const genre_id = await db.query(
    `SELECT genres.id AS genre_id FROM recipes JOIN genres ON recipes.genre_id = genres.id WHERE recipes.id = $1`,
    [recipeID]
  );
  console.log(genre_id);
  const genreIdValue = genreId.rows[0].genre_id; //
  console.log(genreIdValue);
  const newRecipeG = await db.query(
    `INSERT INTO recipe_genre (recipe_id, genre_id) VALUES ($1, ($2))`,
    [recipeId, genreIdValue]
  );

  console.log(name);
  console.log(title);
  console.log(ingredients);
  console.log(instructions);
  console.log("newRecipe", newRecipe);
  //sends a json response back to the client
  response.json({
    recipe: newRecipe.rows[0],
    genres: [newRecipeG.rows[0].genre_id],
  });
});

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));
//started to work on rendering one full recipe but had to prioritise requirements
//app.get("/fullRecipe/:id", async (request, response) => {
//   const recipeId = parseInt(request.params.id); //gets the recipe id from the URL
//   // Handle fetching full recipe details here - don't forget the dependency as parameter to pass
//   const result_full = await db.query(
//     `SELECT recipes.id, names.name, recipes.title, recipes.ingredients, recipes.instructions,
//     STRING_AGG(genres.name, ',' ORDER BY genres.name) AS genres
//     FROM recipes JOIN names ON names.id = recipes.name_id JOIN recipe_genre ON recipe_genre.recipe_id = recipes.id JOIN genres ON genres.id = recipe_genre.genre_id GROUP BY recipes.id, recipes.title, recipes.ingredients, recipes.instructions, names.name;`,
//     [recipeId]
//   );
//   const fullRecipe = result_full.rows[0]; //just get one row - is this how you do this?
//   response.json(fullRecipe);
//   console.log(fullRecipe);
// });
