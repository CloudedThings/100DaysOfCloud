![diagram](img/002_diagram.jpg)

## [Defining Cloud Infrastructure with the AWS Cloud Development Kit and TypeScript](https://cloudacademy.com/lab/defining-cloud-infrastructure-aws-cloud-development-kit-and-typescript/?context_id=3576&context_resource=lp)

## Introduction



## Prerequisite

* AWS Account
* AWS credentials configured on your local machine

## Use Case

- 

- 

## Cloud Research

- [AWS CDK Role Construct (Python)](https://docs.aws.amazon.com/cdk/api/latest/python/aws_cdk.aws_iam/Role.html)
- [AWS CDK Function Construct (Python)](https://docs.aws.amazon.com/cdk/api/latest/python/aws_cdk.aws_lambda/Function.html)
- [AWS CDK Bucket Construct (Python)](https://docs.aws.amazon.com/cdk/api/latest/python/aws_cdk.aws_s3/Bucket.html)

## Try yourself

### Step 1 — Create a new CDK project

Create a project folder called `s3lambda` and change directories into by entering the following in the terminal. Then run:

```
cdk init app --language=typescript
```

Use the following code for you `s3lambda.ts`

```
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { S3LambdaStack } from '../lib/s3lambda-stack';
         
const app = new cdk.App();
new S3LambdaStack(app, 'S3LambdaStack', {});
```

### Step 2 — Use AWS CDK resource constructs to define an Amazon S3 bucket and an AWS Lambda function

Install your resource construct dependencies, enter the following in the terminal:

```
npm install path @aws-cdk/aws-s3 @aws-cdk/aws-lambda @aws-cdk/aws-iam
```

In `s3lambda-stack.ts`, replace the import statement on line 1 with the following:

```
import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as path from 'path';
```

Replace the comment, **// The code that defines your stack goes here** with the following:

```
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
```

### Step 3 — Create Lambda function

In `s3lambda` folder create a new folder called `lamda` and within it create `lab-function.js` file. with following code:

```
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
```



### Step 4 — Use CDK Toolkit to synthesize and deploy stack

Run:

```
cdk bootstrap
```

And then:

```
cdk synth
```

To deploy this AWS CloudFormation template, enter the following in the terminal:

```
cdk deploy
```



## ☁️ Cloud Outcome



## Next Steps

[Cloudofthings.net](https://cloudofthings.net/)

[link](link)
