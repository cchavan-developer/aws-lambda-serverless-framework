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
