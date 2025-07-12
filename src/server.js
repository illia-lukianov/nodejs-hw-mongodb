import express, { json } from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';
import getEnvVariables from './utils/getEnvVariables.js';
import ContactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = getEnvVariables('PORT') ?? '3000';

export default function setupServer() {
  const app = express();
  app.use(cors());
  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  app.use(express.json());
  app.use('/contacts', ContactsRouter);
  app.use(errorHandler);
  app.use(notFoundHandler);
}
