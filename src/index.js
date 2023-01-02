const express = require('express');
const path = require('path'); // core node module

const app = express();

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

// Setup static directory to serve up
app.use(express.static(publicDirectoryPath));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })