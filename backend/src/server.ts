import express from 'express';
import * as dotenv from 'dotenv-safe';
import cookieParser from 'cookie-parser';
import { Auth } from '@controller/Auth';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())
dotenv.config();

const auth: Auth = new Auth();
app.post('/auth/login', auth.login);
app.post('/auth/register', auth.register);

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

app.listen(4000);
