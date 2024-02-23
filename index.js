require('dotenv').config();
const express = require('express');
const { Client } = require('cassandra-driver');
const app = express();
const port = 3000;


// Mock async function to simulate fetching data from a database
const fetchDataFromDatabase = async () => {
  return new Promise(resolve => setTimeout(() => resolve([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
  ]), 1000));
};

// Handler for the /data route
app.get('/data', async (req, res) => {
  try {
    const data = await fetchDataFromDatabase();
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


app.listen(port, () => console.log(`Server running on http://localhost:${port}/data`));
