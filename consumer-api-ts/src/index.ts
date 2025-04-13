import 'dotenv/config';
import express, { Request, Response } from 'express';
import jwtCheck from './middleware/auth';
import { startListening } from './listener';

const app = express();
app.use(express.json());
app.use(jwtCheck);  // Apply JWT validation middleware

app.get('/status', (_req: Request, res: Response) => {
  res.status(200).send('Consumer API (TS) is running');
});

// Start listening to the Azure Service Bus
startListening();

app.listen(4000, () => {
  console.log('Consumer API (TS) is running on port 4000');
});
