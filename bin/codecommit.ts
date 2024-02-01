#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CodecommitStack } from '../lib/codecommit-stack';
//import { Codecommit2Stack } from '../lib/codecommit2stack';
//import { CodecommitStacknew } from '../lib/codecommit-stack';

const app = new cdk.App();
new CodecommitStack(app, 'CodecommitStack');
//new Codecommit2Stack(app, 'CodecommitStack2');

//new CodecommitStacknew(app, 'CodecommitStacknew');