import express from 'express';
import { default as fetch } from 'node-fetch';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  const indexPath = path.resolve(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.post('/owoify', async (req, res) => {
  const apiUrl = 'https://furry-translator.onrender.com/owoify';
  const pizzaRecipe = `
    Ingredients: 
    - 2 1/4 teaspoons active dry yeast
    
    - 1 1/2 cups warm water
    - 3 1/2 cups all-purpose flour
    - 2 tablespoons olive oil
    - 2 teaspoons salt
    - 1 teaspoon sugar

    Instructions:
    1. In a bowl, dissolve yeast in warm water. Let it sit for 5 minutes until frothy.
    2. In a large mixing bowl, combine flour, olive oil, salt, and sugar. Add the yeast mixture.
    3. Knead the dough on a floured surface until smooth. Place in a greased bowl, cover, and let it rise for 1 hour.
    4. Preheat oven to 475°F (245°C).
    5. Roll out the dough and place it on a pizza pan.
    6. Add your favorite pizza sauce, cheese, and toppings.
    7. Bake for 12-15 minutes or until the crust is golden and the cheese is bubbly.
    8. Remove from the oven, let it cool for a few minutes, and enjoy your owo-licious pizza!
  `;

  const requestData = {
    inputText: pizzaRecipe,
    option: 'uvu',
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    res.json({ owoifiedText: data.owoifiedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
