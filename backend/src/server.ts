import express from 'express';
import '@controllers/UsersController';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

app.listen(4000);
