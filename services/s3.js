const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const s3Client = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: '',
    Body: null,
    ContentType: '',
    ACL: ''
};

const s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

module.exports = s3;