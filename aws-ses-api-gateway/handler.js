'use strict';
const AWS = require("aws-sdk");
const SES = new AWS.SES();

module.exports.createContact = async (event, context) => {
  console.log("Received::", event);
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
};
