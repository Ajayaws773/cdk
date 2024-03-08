# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

step 1
========
cdk init app --language typescript ==> to initiate typescript project

step 2
========
update lib and bin files as per requirement

step 3
========
cdk ls

step 4
=======
cdk bootstrap

step 5
=======
npx cdk deploy ===> to deploy the stack

====================

step 6
=======
codecommit-stack.ts is basic code to deploy code commit & code build project
code exports the code commit and code build names into CFT output

=================

step 7
=======

* update the code as per your environment variables and requirements

codepipeline-project1.ts is project for

1.code commit with name

2.code build project with source as code commit 

3.code deploy ((need to create type of deployment EC2/Lambda/ECS) 
*in this code no application is deployed on Ec2/lambda

4.code pipeline with 2 build stages. code commit will trigger the code pipeline

==============


step 8
=======
* update the code as per your environment variables and requirements

codepipeline-project2.ts is project for

1.IAM role creation for code build and policy will be attached

2.code commit repo will be created

3.code build project with build steps

4.code pipeline with code commit as trigger and build stage

====================

step 9
=======

* update the code as per your environment variables and requirements

ec2creation.ts is code for EC2 creation with parameters

1.Security group creation

2.IAM role creation and policy

3.IAM instance profile creation

4.EBS volume definition

5.Ec2 creation with parameters

==================================================


step 10
=======

* update the code as per your environment variables and requirements

aurora-rds-creation.ts is code for Aurora mysql and Aurora Postgre

1.Security group creation

2.RDS cluster creation

3. Secret will be created in secret manager for RDS admin password


==================================================


step 11
=======

* update the code as per your environment variables and requirements

postgrerds.ts is code for postgre rds creation

1.Security group creation

2.RDS cluster creation

3. Secret will be created in secret manager for RDS admin password


