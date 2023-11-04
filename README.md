# Dish Delight

## Description

Dish Delight is a recipe search app intended to help users find recipes by searching or filtering by relevant tags. The app interfaces with the free Spoonacular API to source recipes along with
images, tags, and ingredient lists. The user must create a free account and then will be able to add favorites to their profile that they can later reference by viewing their detailed profile.


## Technologies

- HTML
- CSS
- JavaScript
- React
- React Router
- Styled Components
- Splide
- Node.js
- Express
- Axios
- Antd
- Typescript
- MongoDB

## Technical Information

### Front-end Setup

1. Clone the repository: `git clone [https://github.com/yourusername/yourproject.git`](https://github.com/frankieSM/m2-recipe-ts)
2. Change directory to the client folder: `cd client`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

### Back-end Setup

1. Clone the repository: `git clone [https://github.com/yourusername/yourproject.git`](https://github.com/frankieSM/m2-recipe-ts)
2. Change directory to the server folder: `cd server`
3. Install dependencies: `npm install`
4. Start the server: `npm start`


## Issues

- Project connects to DB when hosted locally, however does not connect when deployed.

## API
## API Documentation

### Search Endpoint
- **Description**: This endpoint allows you to search for a term.
- **HTTP Method**: GET
- **Route**: `/searched/:search`
- **Request Parameters**:
  - `search` (String): The term you want to search for.
- **Response**:
  - Status Code: 200 OK
  - Response Data: A string with the search term.

### Login
- **Description**: Log in as a user.
- **HTTP Method**: POST
- **Route**: `/login`
- **Request Body**:
  - `username` (String): The user's username.
  - `password` (String): The user's password.
- **Response**:
  - Status Code: 200 OK (on successful login)
  - Response Data: Information about the user.

### Signup
- **Description**: Create a new user account.
- **HTTP Method**: POST
- **Route**: `/signup`
- **Request Body**:
  - `username` (String): The desired username.
  - `password` (String): The desired password.
- **Response**:
  - Status Code: 200 OK (on successful signup)
  - Response Data: Information about the newly created user.

### Get User Profile
- **Description**: Retrieve user profile information.
- **HTTP Method**: GET
- **Route**: `/profile/:id`
- **Request Parameters**:
  - `id` (String): The user's ID.
- **Response**:
  - Status Code: 200 OK
  - Response Data: User profile information.

### Add Recipe
- **Description**: Add a new recipe to a user's profile.
- **HTTP Method**: POST
- **Route**: `/addRecipe/:id`
- **Request Parameters**:
  - `id` (String): The user's ID.
- **Request Body**:
  - Recipe data (Object): Details of the recipe.
- **Response**:
  - Status Code: 200 OK
  - Response Data: Confirmation message.

### Delete Recipe
- **Description**: Delete a recipe from a user's profile.
- **HTTP Method**: POST
- **Route**: `/deleteRecipe/:id`
- **Request Parameters**:
  - `id` (String): The user's ID.
- **Request Body**:
  - Recipe ID (String): The ID of the recipe to delete.
- **Response**:
  - Status Code: 200 OK
  - Response Data: Confirmation message.



