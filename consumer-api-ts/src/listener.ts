import { ServiceBusClient } from '@azure/service-bus';
import 'dotenv/config';

const connectionString = process.env.AZURE_SERVICE_BUS_CONNECTION!;
const queueName = process.env.QUEUE_NAME!;

const sbClient = new ServiceBusClient(connectionString);

const receiver = sbClient.createReceiver(queueName, {
  receiveMode: "peekLock",  // Mode to peek without removing from queue immediately
});

// Function to start listening to Azure Service Bus messages
export const startListening = async () => {
  try {
    receiver.subscribe({
      processMessage: async (message) => {
        console.log(`Received message: ${message.body}`);
        
        // Here, you can process the message (e.g., store it in DB, trigger another service, etc.)
      },
      processError: async (err) => {
        console.error("Error receiving message: ", err);
      },
    });
  } catch (error) {
    console.error("Error starting listener: ", error);
  }
};
