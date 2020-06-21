import express from 'express';
import * as dotenv from 'dotenv-safe';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Auth from '@src/authentication/Auth';
import User from './authentication/User';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())
dotenv.config();

app.post('/auth/login', (req, res, next) => {
  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  const auth: Auth = new Auth();
  auth.basicUser = username;
  auth.basicPass = password;

  if (auth.checkBasicLogin()) {
    const user: User = new User();
    user.username = 'luciano';
    user.password = '123';
    if (req.body.user === user.username && req.body.pwd === user.password) {
      user.id = 1;
      var token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 300
      })
      return res.json({ auth: true, token: token });
    }
  }



  res.status(500).json({ message: 'invalid authentication!' });
});

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

app.listen(4000);
