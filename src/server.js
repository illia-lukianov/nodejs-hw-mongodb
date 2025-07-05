import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import 'dotenv/config';
import getEnvVariables from './utils/getEnvVariables.js';
import { fetchContactById, fetchContacts } from './services/contacts.js';

const PORT = getEnvVariables('PORT') ?? '3000';

export default function setupServer() {
  const app = express();
  app.use(cors());
  app.use(pinoHttp());
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  app.get('/', fetchContacts)
  app.get('/contacts/:contactId', fetchContactById)
  app.use((req, res, next) => {
  res.status(404).json({status:404, message: 'Not found' });
  });
};