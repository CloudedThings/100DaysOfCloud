// Load AWS SDK and create a new S3 object
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const bucketName = process.env.BUCKET_NAME; 
     
exports.handler = async message => {
     
    // Construct parameters for the putObject call
    const params = {
        Bucket: bucketName,
        Body: 'Sample Text',
        Key: 'sample-object'
    };
     
    let response = await s3.putObject(params).promise();
    return {
        statusCode: 200,
        body: response
    }
}