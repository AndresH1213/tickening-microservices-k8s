import express from 'express';
import 'express-async-errors';
import { errorHandler, NotFoundError, currentUser } from '@eahbtickets/common';
import cookieSession from 'cookie-session';
import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

app.use(createChargeRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
