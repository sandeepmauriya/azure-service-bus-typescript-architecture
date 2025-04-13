import 'dotenv/config';
import express, { Request, Response } from 'express';
import { ServiceBusClient } from '@azure/service-bus';
import jwtCheck from './middleware/auth';
import rateLimiter from './middleware/rateLimit';

const app = express();
app.use(express.json());
app.use(jwtCheck);
app.use(rateLimiter);

const connectionString = process.env.AZURE_SERVICE_BUS_CONNECTION!;
const queueName = process.env.QUEUE_NAME!;

app.post('/send', async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) return res.status(400).send('Message is required');

  const sbClient = new ServiceBusClient(connectionString);
  const sender = sbClient.createSender(queueName);

  try {
    await sender.sendMessages({ body: message });
    res.status(200).send('Message sent!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to send message');
  } finally {
    await sender.close();
    await sbClient.close();
  }
});

app.listen(3000, () => console.log('Producer API (TS) running on port 3000'));
