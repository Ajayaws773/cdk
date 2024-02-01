import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';

export class Codecommit2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const repository = new codecommit.Repository(this, 'MyRepo', { repositoryName: 'test2' });

  }
}
