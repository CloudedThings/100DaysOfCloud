import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as path from 'path';

export class S3LambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // import existing IAM Role
    const lambdaRole = iam.Role.fromRoleArn(this, 'lambda-role',
        `arn:aws:iam::636807406669:role/LambdaBasicRole`,
        {mutable: false},
    );
    
    // create S3 bucket
    const bucket = new s3.Bucket(this, 's3-bucket');
    bucket.grantPublicAccess();
    
    // create Lambda function
    const fn = new lambda.Function(this, 'lambda-function', {
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: 'lab-function.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
        role: lambdaRole,
        environment: {
            'BUCKET_NAME': bucket.bucketName
        }
    });
  }
}
