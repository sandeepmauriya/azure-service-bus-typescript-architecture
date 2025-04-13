Deploying both the Producer API and the Consumer API to Azure involves a few key steps. Below, I'll guide you through the process for deploying both APIs to Azure, using Azure App Services for hosting and Azure Service Bus for message communication.

1. Prerequisites
You have Azure Subscription and the Azure CLI installed.

Both Producer API and Consumer API are ready to be deployed to Azure.

Azure Service Bus is already created (or you can create it as part of this process).

2. Steps to Deploy Both APIs to Azure
Step 1: Set Up the Azure Service Bus
If you haven't already created an Azure Service Bus, follow these steps:

Create an Azure Service Bus in the Azure portal:

Go to the Azure portal and search for Service Bus.

Create a new Service Bus instance.

Inside your Service Bus instance, create a Queue (e.g., myQueue).

Copy the Connection String for the Service Bus from the Shared Access Policies section.

Step 2: Deploy the Producer API to Azure
Login to Azure using Azure CLI:

bash
Copy
Edit
az login
Create an Azure App Service for the Producer API:

Open the terminal in the Producer API directory and initialize a new App Service:

bash
Copy
Edit
az webapp up --name producer-api --resource-group <resource-group-name> --plan <app-service-plan-name> --runtime "NODE|16-lts"
Replace <resource-group-name> and <app-service-plan-name> with your own values.

Configure environment variables for the Producer API: After the deployment, configure the environment variables (e.g., AZURE_SERVICE_BUS_CONNECTION and QUEUE_NAME) in the Azure portal:

Go to App Services > Your Producer API app > Configuration > Application settings.

Add the following keys and values:

AZURE_SERVICE_BUS_CONNECTION = <Your Service Bus Connection String>

QUEUE_NAME = <Your Queue Name>

Deploy the Producer API using Git or Zip: You can either:

Deploy using Git: Connect your local Git repo to Azure.

Deploy using Zip: Zip your project and upload it to Azure.

For Git deployment, follow these steps:

bash
Copy
Edit
git remote add azure https://<your-app-name>.scm.azurewebsites.net/<your-app-name>.git
git push azure master
For Zip deployment, first create the .zip file from your project and upload:

bash
Copy
Edit
zip -r producer-api.zip *
az webapp deploy --name producer-api --resource-group <resource-group-name> --src-path producer-api.zip
Step 3: Deploy the Consumer API to Azure
Create an Azure App Service for the Consumer API:

Go to the terminal in the Consumer API directory and deploy the Consumer API:

bash
Copy
Edit
az webapp up --name consumer-api --resource-group <resource-group-name> --plan <app-service-plan-name> --runtime "NODE|16-lts"
Configure environment variables for the Consumer API: After the deployment, configure the environment variables (e.g., AZURE_AD_JWKS_URI, AZURE_AD_AUDIENCE, AZURE_AD_ISSUER, etc.) in the Azure portal:

Go to App Services > Your Consumer API app > Configuration > Application settings.

Add the following keys and values:

AZURE_AD_JWKS_URI = <Your Azure AD JWKS URI>

AZURE_AD_AUDIENCE = <Your Azure AD Audience>

AZURE_AD_ISSUER = <Your Azure AD Issuer>

AZURE_SERVICE_BUS_CONNECTION = <Your Service Bus Connection String>

QUEUE_NAME = <Your Queue Name>

Deploy the Consumer API using Git or Zip: Similar to the Producer API, you can either use Git or Zip for deployment:

For Git deployment:

bash
Copy
Edit
git remote add azure https://<your-app-name>.scm.azurewebsites.net/<your-app-name>.git
git push azure master
For Zip deployment:

bash
Copy
Edit
zip -r consumer-api.zip *
az webapp deploy --name consumer-api --resource-group <resource-group-name> --src-path consumer-api.zip
3. Set Up the Service Bus Listener for Consumer API
The Consumer API should listen to messages from the Azure Service Bus Queue. The code in listener.ts is already configured to listen to the Service Bus. As long as the Consumer API is running on Azure, it will continue to listen to the queue and process messages.

4. Test the Deployment
Test the Producer API:

Once deployed, you can test the Producer API by sending a POST request to the send endpoint with a message payload.

Example using Postman:

json
Copy
Edit
POST https://<your-producer-api-url>/send
Content-Type: application/json

{
  "message": "Hello, Azure!"
}
Test the Consumer API:

The Consumer API will automatically listen for any messages that the Producer API sends to the Azure Service Bus Queue.

Check the logs of the Consumer API in the Azure portal to confirm that it receives and processes messages.

5. Monitor and Scale
Monitor:

Both Producer and Consumer APIs can be monitored using Azure Monitor and App Insights to track health, performance, and logs.

Scale:

You can scale both the Producer and Consumer APIs based on the traffic/load using Azure App Service's Scaling features.

6. Automate Deployment (Optional)
To streamline the deployment process, you can use Azure DevOps or GitHub Actions to set up CI/CD pipelines that automate the deployment of both APIs to Azure whenever you push changes to your Git repository.

Summary
Producer API and Consumer API are deployed to Azure App Services.

Azure Service Bus is used to send and receive messages between both APIs.

Azure Monitor can be used to track the health and logs of your deployed APIs.