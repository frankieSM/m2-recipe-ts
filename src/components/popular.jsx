import React, { useEffect, useState } from 'react';


function Popular() {
    const [popular, setPopular] = useState([]);

    // Running the function
    useEffect(() => {
        getPopular();
    }, []);

    // Fetching recipes from Spoonacular API
    const getPopular = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8`);
        const data = await api.json();
        console.log(data);
        setPopular(data.recipes)
    }

    return (
        <div>
            <h2>Popular Recipes</h2>
            {popular.map(recipe => (
                <div key={recipe.id}>
                    <p>{recipe.title}</p>
                </div>
            ))}
        </div>
    )
}

export default Popular;