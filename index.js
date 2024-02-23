require('dotenv').config();
const express = require('express');
const { Client } = require('cassandra-driver');
const app = express();
const port = 3000;

const client = new Client({
  cloud: { secureConnectBundle: process.env.ASTRA_DB_SECURE_BUNDLE_PATH },
  credentials: {
    username: process.env.ASTRA_DB_CLIENT_ID,
    password: process.env.ASTRA_DB_CLIENT_SECRET,
  },
});

client.connect();

app.get('/data', async (req, res) => {
  try {
    const query = 'SELECT * FROM default_keyspace.npc_shop';
    const result = await client.execute(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
