#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CodecommitStack } from '../lib/codecommit-stack';
import { CodepipelineStack } from '../lib/codepipeline-project1';

const app = new cdk.App();
new CodecommitStack(app, 'CodecommitStack');
new CodepipelineStack(app, 'CodepipelineStack2');
