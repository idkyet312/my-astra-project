require('dotenv').config();
const express = require('express');
const { Client } = require('cassandra-driver');
const app = express();
const port = process.env.PORT || 8080; // Fallback to 3000 if process.env.PORT is not set
require('dotenv').config();
const express = require('express');
const { Client } = require('cassandra-driver');
const { Configuration, OpenAIApi } = require("openai");

// Initialize express app
const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse JSON body in POST requests
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}));

// Initialize Cassandra client for Astra DB
const client = new Client({
    cloud: { secureConnectBundle: 'secure-connect-npc-one' },
    credentials: { username: process.env.ASTRA_DB_CLIENT_ID, password: process.env.ASTRA_DB_CLIENT_SECRET },
    keyspace: 'default_keyspace'
});

client.connect()
    .then(() => console.log('Connected to Astra DB'))
    .catch(e => console.error('Failed to connect to Astra DB:', e));

// Handler for receiving input and fetching prediction
app.post('/predict', async (req, res) => {
    const userInput = req.body.input;
    if (!userInput) {
        return res.status(400).send('Input is required');
    }

    try {
        // Send input to OpenAI and get the prediction
        const openaiResponse = await openai.createCompletion({
            model: "text-davinci-003", // or any other model
            prompt: userInput,
            max_tokens: 50,
        });

        const prediction = openaiResponse.data.choices[0].text.trim();

        // Store input and prediction in Astra DB
        const


// Mock async function to simulate fetching data from a database
const fetchDataFromDatabase = async () => {
  return new Promise(resolve => setTimeout(() => resolve([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
  ]), 1000));
};

// Handler for the /data route
app.get('/data', async (req, res) => {
  try {
    //const data = await fetchDataFromDatabase();
    await data = fetchDataFromDatabase()
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('An error occurred while fetching data.');
  }
});

// Add a route handler for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the API. Access /data to fetch data.');
});



app.listen(port, () => console.log(`Server running on http://localhost:${port}/data`));//

