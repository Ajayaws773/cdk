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

codecommit-stack.ts is basic code to deploy code commit & code build project
code exports the code commit and code build names into CFT output

=================

Step 7


codepipeline-project1.ts is project for

1.code commit with name
2.code build project with source as code commit
3.code deploy
4.code pipeline with 2 build stages. code commit will trigger the code pipeline

==============




