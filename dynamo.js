'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "eu-central-1"});

exports.handler = async (event, context, callback) => {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1"});
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //var tstamp = today.getTime();
 
    var bigc = 1300000000000; 
    function generateRowId(shardId) {
      var ts = new Date().getTime() - bigc; 
      var randid = Math.floor(Math.random() * 512);
       ts = (ts * 64);
        ts = ts + shardId;
        return (ts * 512) + randid;
    }
    var newPrimaryHashKey = generateRowId(4);

    const params = {
        TableName: "LogTest",
        Item: {
            timestamp: 1,
            id: newPrimaryHashKey,
            date: date,
            "ip_address": event.requestContext.identity.sourceIp,
        }
    }

    try {
        const data = await documentClient.put(params).promise();
        console.log(data);
        callback(null, { statusCode: 200, body: 'Hello   ' + event.requestContext.identity.sourceIp });
    } catch (err) {
        console.log(err);
    }
}
