const AWS = require('aws-sdk');
const uuid = require('uuid');

const  TODO_TABLE = process.env.TODO_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

exports.createTodo = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    if (typeof data.todo !== 'string') {
        console.error('Validation Failed');
        return;
    }

    const params = {
        TableName: TODO_TABLE,
        Item: {
            todoId: uuid.v1(),
            todo: data.todo,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp 
        }
    }

    dynamoDbClient.put(params, (error, data) => {
        if (error) {
            console.log(error);
            callback(new Error(error));
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        }
        callback(null, response);
    })
}