import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';


export class CodecommitStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const repository = new codecommit.Repository(this, 'MyRepo', { repositoryName: 'newtest' });
   new codebuild.Project(this, 'MyFirstCodeCommitProject', {
  source: codebuild.Source.codeCommit({ repository }),
});
new cdk.CfnOutput(this, 'codecommitrepo', {
  value: repository.repositoryName,
  description: 'The name of the repo',
 exportName: 'repo',
});

new cdk.CfnOutput(this, 'codebuildproject', {
  value: repository.repositoryName,
  description: 'The name of the codebuild project',
 exportName: 'codebuild',
});

  }
}

//export class CodecommitStacknew extends cdk.Stack {
//  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//    super(scope, id, props);
 ////   const repository = new codecommit.Repository(this, 'MyRepo', { repositoryName: 'newtest' });
  //  const repository = new codecommit.Repository(this, 'MyRepo', { repositoryName: 'test2' });
    
//  }
//}
