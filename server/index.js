const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//Middleware 
app.use(cors());
app.use(express.json()); //req body

//Routes

//Create a recipe
app.post("/recipe", async (req, res) => {
  try {
    const { description } = req.body;
    const newRecipe = await pool.query(
      "INSERT INTO recipe (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newRecipe.rows[0]);
  } catch (err){
    console.error(err.message);
  }
});

//Get all recipe

app.get("/recipe", async (req, res) => {
  try {
    const allRecipe = await pool.query("SELECT * FROM recipe");
    res.json(allRecipe.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get a recipe

app.get("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await pool.query("SELECT * FROM recipe WHERE recipe_id = $1", [
      id
    ]);

    res.json(recipe.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


//Update a recipe

app.put("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateRecipe = await pool.query(
      "UPDATE recipe SET description = $1 WHERE recipe_id = $2",
      [description, id]
    );

    res.json("Recipe was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//Delete a recipe

app.delete("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRecipe = await pool.query("DELETE FROM recipe WHERE recipe_id = $1", [
      id
    ]);
    res.json("Recipe was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});


app.listen(3000, () => {
  console.log("server has started on port 3000");
});
