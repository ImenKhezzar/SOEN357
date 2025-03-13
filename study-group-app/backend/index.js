const express = require('express');
const app = express();
const routes = require('./routes');

const PORT = process.env.BACKEND_PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
  });

routes(app);

app.listen(PORT, () => {console.log(`listening on port ${PORT}`);