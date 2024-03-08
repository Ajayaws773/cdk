#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CodecommitStack } from '../lib/codecommit-stack';
import { CodepipelineStack } from '../lib/codepipeline-project1';
import { CICDPipelineStack1 } from '../lib/codepipeline-project2';
import { ec2creationstack } from '../lib/ec2creation';


const app = new cdk.App();
new CodecommitStack(app, 'CodecommitStack');
new CodepipelineStack(app, 'CodepipelineStack1');
new CICDPipelineStack1(app, 'CodepipelineStack2');
new ec2creationstack(app, 'ec2creationcft', {
    env: { 
      account: process.env.CDK_DEFAULT_ACCOUNT,     
         region: process.env.CDK_DEFAULT_REGION,
           },
  });