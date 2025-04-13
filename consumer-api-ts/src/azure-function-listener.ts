import { app, InvocationContext } from '@azure/functions';

// Define the service bus handler with correct parameter order
export async function serviceBusTrigger(message: unknown, context: InvocationContext): Promise<void> {
  context.log('Service bus queue function processed message:', message);
  context.log('EnqueuedTimeUtc =', context.triggerMetadata?.enqueuedTimeUtc);
  context.log('DeliveryCount =', context.triggerMetadata?.deliveryCount);
  context.log('MessageId =', context.triggerMetadata?.messageId);

  try {
    // Process the message
    const messageContent = message;
    context.log('Processed message:', messageContent);
  } catch (error) {
    context.log('Error processing message:', error);
  }
}

// Register the function correctly
app.serviceBusQueue('serviceBusQueueTrigger1', {
  connection: 'MyServiceBusConnection',
  queueName: 'testqueue',
  handler: serviceBusTrigger
});
