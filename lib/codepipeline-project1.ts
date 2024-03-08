import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';

export class CodepipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a CodeCommit repository
    const repository = new codecommit.Repository(this, 'MyRepo', { repositoryName: 'testcodebuild' });

    // Create a CodeBuild project
    const codeBuildProject = new codebuild.Project(this, 'MyFirstCodeCommitProject', {
      source: codebuild.Source.codeCommit({ repository }),
    });

    // Create a CodeDeploy application
    const application = new codedeploy.ServerApplication(this, 'CodeDeployApplication', {
      applicationName: 'MyApplication', // optional property
    });

    // Create a CodePipeline
    const pipeline = new codepipeline.Pipeline(this, 'MyFirstPipeline', {
      pipelineName: 'MyPipeline',
    });

    // Create a CodeCommit source action
    const sourceOutput = new codepipeline.Artifact(); // Artifact to store the source code
    const sourceAction = new codepipeline_actions.CodeCommitSourceAction({
      actionName: 'CodeCommitSource',
      repository,
      output: sourceOutput,
      branch: 'main', // Branch to use as the source
    });

    // Add the source action to the pipeline's 'Source' stage
    const sourceStage = pipeline.addStage({
      stageName: 'Source',
      actions: [sourceAction],
    });

    // Add another stage to the pipeline
    const secondStage = pipeline.addStage({
      stageName: 'Build',
    });

    // Add CodeBuild project action to the second stage
    secondStage.addAction(new codepipeline_actions.CodeBuildAction({
      actionName: 'CodeBuild',
      project: codeBuildProject,
      input: sourceOutput, // Pass the artifact produced by the source action
    }));

  }
}