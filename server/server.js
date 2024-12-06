const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Serwuj statyczne tekstury z folderu public/textures
app.use('/textures', express.static(path.join(__dirname, '../public/textures')));

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
