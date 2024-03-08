import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CICDPipelineStack1 extends cdk.Stack {
        constructor(scope: Construct, id: string, props?: cdk.StackProps) {
          super(scope, id, props);

    // Define IAM role for CodeBuild project
    const codeBuildRole = new iam.Role(this, 'CodeBuildRole', {
      assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com')
    });

    // Attach policies to CodeBuild role
    codeBuildRole.addToPolicy(new iam.PolicyStatement({
      actions: ['cloudformation:UpdateStackSet'],
      resources: ['*'] // You may want to limit this to specific stacksets
    }));

    const repository = new codecommit.Repository(this, 'MyRepo', { repositoryName: 'testcodebuild1' });
 
    // Define CodeBuild project
    const codeBuildProject = new codebuild.PipelineProject(this, 'CodeBuildProject', {
      role: codeBuildRole,
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [
              'npm install -g aws-cdk',
              'npm install',
            ],
          },
          build: {
            commands: [
              'cdk deploy --require-approval never',
            ],
          },
        },
      }),
    });

    // Define CodePipeline
    const pipeline = new codepipeline.Pipeline(this, 'Pipeline');

// Create a CodeCommit source action
     const sourceOutput = new codepipeline.Artifact(); // Artifact to store the source code
     const sourceAction = new codepipeline_actions.CodeCommitSourceAction({
       actionName: 'CodeCommitSource',
       repository,
       output: sourceOutput,
       branch: 'main', // Branch to use as the source
     });
 
 
    // Add source stage to pipeline
    pipeline.addStage({
      stageName: 'Source',
      actions: [sourceAction],
    });

    // Define build action
    const buildAction = new codepipeline_actions.CodeBuildAction({
      actionName: 'CodeBuild',
      project: codeBuildProject,
      input: sourceOutput,
      outputs: [], // No outputs in this example
    });

    // Add build stage to pipeline
    pipeline.addStage({
      stageName: 'Build',
      actions: [buildAction],
    });
  }
}