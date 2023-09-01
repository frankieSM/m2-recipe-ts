import React, { useEffect } from 'react';

function Popular() {
    //const [popular, setPopular] = useState([]);

    // Running the function
    useEffect(() => {
        getPopular();
    }, []);

    // Fetching recipes from Spoonacular API
    const getPopular = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8`);
        const data = await api.json();
        console.log(data);

    }

    return (
        <div>Popular Recipes</div>
    )
}

export default Popular;