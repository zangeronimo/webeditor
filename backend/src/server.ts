import express from 'express';
import * as dotenv from 'dotenv-safe';
import cookieParser from 'cookie-parser';
import Auth from '@controller/Auth';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
dotenv.config();

app.post('/auth/login', Auth.login);

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

app.listen(4000);
