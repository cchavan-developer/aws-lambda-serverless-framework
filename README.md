# aws-lambda-serverless-framework
Develop and Deploy AWS Lambda Functions with Serverless, Learn Lambda Real World Integrations with Amazon Web Services


## Commands

```
// Create Project
sls or serverless

// Choose starter project based on your requirement

// To run function locally
sls invoke local --function nameOfTheFunction

// Deploy serverless application
sls deploy --aws-profile serverless-admin

// Remove serverless application: remove s3 objects, cloudformation, database tables, lambda function altogether
sls remove --aws-profile serverless-admin

```

### Example: REST API with NodeJS
Branch Name - feature/aws-lambda-rest-api-nodejs

### serverless.yml configuration for REST API CRUD Operations - 


```
functions:
  create:
    handler: handler/createTodo.createTodo
    events:
      - http:
          path: todos
          method: post
          cors: true

  list:
    handler: handler/listTodos.listTodos
    events:
      - http:
          path: todos/list
          method: get
          cors: true

  get:
    handler: handler/getTodo.getTodo
    events:
      - http:
          path: todos/{todoId}
          method: get
          cors: true
       
  delete:
    handler: handler/deleteTodo.deleteTodo
    events:
      - http:
          path: todos/delete/{todoId}
          method: delete
          cors: true

  update:
    handler: handler/updateTodo.updateTodo
    events:
      - http:
          path: todos/update/{todoId}
          method: put
          cors: true

```
### Example: Contact Us Form - SES, API Gateway

SES - E-mail platform for sending & receiving email using your own email address & domains.

Benefits - 
- Cost Effective
- No need to deal with servers, network config, IP address
- Pay-as-you-go

```
// serverless.yml iam role config changes

  iam:
    role: 
      statements:
        - Effect: "Allow"
          Action:
            - "ses:*"
          Resource:
            - "*"

// SES usage sample - 

  const { to, from, subject, message } = JSON.parse(event.body);

  if( !to || !from || !subject || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "to or from... are not set properly"
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'
      }
    }
  }

  const params = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Text: { Data: message }
      },
      Subject: {
        Data: subject
      }
    },
    Source: from
  };

  try {
    await SES.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email sent successfully!',
        success: true
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'
      }
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Failed to send an email!',
        success: false
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'
      }
    }
  }

```

#### Deploying SES Service and Training

Go to AWS SES > Create Identity > Choose Email / Domain > Click on Create Identity > Email Verification