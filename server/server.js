import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const PORT = 8080;
const app = express();
app.use(cors());

const dbConnectionString = process.env.DATABASE_URL; //retrieving the connection string
const db = new pg.Pool({ connectionString: dbConnectionString });
//Database Pool: A database pool manages a collection of reusable database connections, improving performance and efficiency by avoiding the overhead of establishing new connections for each database interaction.

//testing the response
app.get("/", (request, response) => {
  response.json("This is my root route. How roude.");
});

app.get("/recipes", async (request, response) => {
  const result = await db.query("SELECT * FROM recipes");
  response.json(result.rows);
  console.log(result.rows);
});

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));
