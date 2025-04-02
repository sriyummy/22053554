const express = require('express');
const numberController = require('./controllers/numberController');

const app = express();
const PORT = 9876;

app.use(express.json());

app.get('/numbers/:numberId', numberController.getAverage);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});