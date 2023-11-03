const iUser = require("./userModel");
const mongoose1 = require("mongoose");

// Function to handle user registration (signup)
const signup = async (
  req: {
    body: { name: any; email: any; password: any; age: any; gender: any };
  },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string; status: number }): void; new (): any };
    };
  }
) => {
  try {
    // Extract user data from the request body
    const { name, email, password, age, gender } = req.body;
    console.log(req.body);

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    console.log(existingUser);

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already registered", status: 400 });
    }

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password, // Remember to hash the password before storing it
      age,
      gender,
      recipes: [], // Initialize with an empty recipe list
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", status: 200 });
  } catch (error) {
    console.log("Error in signup:", error);

    res.status(500).json({ message: "Internal server error", status: 500 });
  }
};

// Function to handle user login
const login = async (
  req: { body: { email: any; password: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string; user?: any }): void; new (): any };
    };
  }
) => {
  try {
    // Extract login credentials from the request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await iUser.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    if (!(password === user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getProfile = async (
  req: { params: { id: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: {
          message?: string;
          user?: {
            _id: any;
            name: any;
            email: any;
            age: any;
            gender: any;
            recipes: any;
          };
        }): void;
        new (): any;
      };
    };
  }
) => {
  try {
    const { id } = req.params;

    // Check if the provided user ID is valid (e.g., a valid MongoDB ObjectId)
    if (!mongoose1.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find the user by ID
    const user = await iUser.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove sensitive information (e.g., password) before sending the user data
    const { _id, name, email, age, gender, recipes } = user;

    res.status(200).json({
      user: {
        _id,
        name,
        email,
        age,
        gender,
        recipes,
      },
    });
  } catch (error) {
    console.error("Error in getProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addRecipe = async (
  req: { params: { id: any }; body: { recipeId: any; recipeTitle: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
    };
  }
) => {
  try {
    const { id } = req.params;
    const { recipeId, recipeTitle } = req.body;

    // Check if the provided user ID is valid (e.g., a valid MongoDB ObjectId)
    if (!mongoose1.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find the user by ID
    const user = await iUser.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the recipe already exists in the user's favorites
    const isRecipeAlreadyAdded = user.recipes.some(
      (recipe: { id: any }) => recipe.id === recipeId
    );

    if (isRecipeAlreadyAdded) {
      return res.status(400).json({ message: "Recipe already in favorites" });
    }

    // Add the recipe to the user's favorites
    const newRecipe = {
      id: recipeId,
      title: recipeTitle,
    };

    user.recipes.push(newRecipe);

    // Save the updated user document
    await user.save();

    res.status(201).json({ message: "Recipe added to favorites" });
  } catch (error) {
    console.error("Error in addRecipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteRecipe = async (
  req: { params: { id: any }; body: { recipeId: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): any; new (): any };
    };
  }
) => {
  try {
    const { id } = req.params;

    const { recipeId } = req.body;

    // Find the user by their ID
    const user = await iUser.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user, recipeId);
    // Find the index of the recipe in the user's recipes array
    const recipeIndex = user.recipes.findIndex(
      (recipe: { id: any }) => recipe.id === recipeId
    );

    // Check if the recipe was found
    if (recipeIndex === -1) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Remove the recipe from the user's recipes array
    user.recipes.splice(recipeIndex, 1);

    // Save the updated user object
    await user.save();

    return res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error in deleteRecipe:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
  signup,
  getProfile,
  addRecipe,
  deleteRecipe,
};
