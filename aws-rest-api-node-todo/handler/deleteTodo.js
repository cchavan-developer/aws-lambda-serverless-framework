const AWS = require('aws-sdk');
const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

module.exports.deleteTodo = (event, context, callback) => {
    const params = {
        TableName: TODO_TABLE,
        Key: {
            todoId: event.pathParameters.todoId
        }
    };

    dynamoDBClient.delete(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Deletion Successful!'
            })
        };

        callback(null, response);
    })
}