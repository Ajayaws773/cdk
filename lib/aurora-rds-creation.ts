import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib/core';
import { Instance, InstanceClass, InstanceSize, InstanceType, Peer, Port, SecurityGroup, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import * as rds from 'aws-cdk-lib/aws-rds';
import { InsightType } from 'aws-cdk-lib/aws-cloudtrail';
import { DatabaseInstance, DatabaseInstanceEngine } from 'aws-cdk-lib/aws-rds';
import { aws_ec2 } from 'aws-cdk-lib';


// declare const vpc: ec2.vpc;
const vpc: string = 'vpc-0f59b4f5e43888cfd';

export class rdsDB extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const existingVpc = Vpc.fromLookup(this, 'ExistingVpc', {
            // vpcName: 'vpc/TheVPC',
            vpcId: vpc,
        });

        const securityGroup = new SecurityGroup(this, 'MySecurityGroup', {
          vpc: existingVpc,
          securityGroupName: 'RDSSecurityGroup',
          description: 'Allow RDS traffic',
          allowAllOutbound: true,
              });
              
          // securityGroup.connections.allowFrom(
          //   Peer.anyIpv4(),
          //   Port.tcp(22),
          //   "ssh" 
          // )
          securityGroup.connections.allowFrom(
            Peer.ipv4('10.0.0.0/16'),
            Port.tcp(5432),
            "RDS traffic" 
          )
  const instanceType = InstanceType.of(InstanceClass.T3, InstanceSize.MICRO);
// Define the storage size for the RDS instance
const storageSizeGiB = 100; // Change this value to your desired size

const cluster = new rds.DatabaseCluster(this, 'Database', {
  // engine: rds.DatabaseClusterEngine.auroraMysql({ version: rds.AuroraMysqlEngineVersion.VER_3_01_0 }),
  engine: rds.DatabaseClusterEngine.auroraMysql({ version: rds.AuroraMysqlEngineVersion.VER_2_07_9 }),
  // engine: rds.DatabaseClusterEngine.auroraPostgres({ version: rds.AuroraPostgresEngineVersion.VER_13_10 }),
  defaultDatabaseName: 'newrdscdk',
  clusterIdentifier: 'clusternewrdsmysql',
  securityGroups: [securityGroup],
  credentials: rds.Credentials.fromGeneratedSecret('clusteradmin'), // Optional - will default to 'admin' username and generated password
  vpc: existingVpc,
  writer: rds.ClusterInstance.provisioned('writer', {
    publiclyAccessible: false,
  }),
  storageEncrypted: true,
  // readers: [
  //   rds.ClusterInstance.provisioned('reader1', { promotionTier: 1 }),
  //   rds.ClusterInstance.serverlessV2('reader2'),
  // ],
  vpcSubnets: {
    subnetType: SubnetType.PRIVATE_WITH_EGRESS,
  },

});
    }
}