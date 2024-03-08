import { Duration, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { InstanceClass, InstanceSize, InstanceType, Peer, Port,  SecurityGroup, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { Credentials, DatabaseInstance, DatabaseInstanceEngine, PostgresEngineVersion } from "aws-cdk-lib/aws-rds";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

export class DataBaseStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const engine = DatabaseInstanceEngine.postgres({ version: PostgresEngineVersion.VER_14_5 });
    const instanceType = InstanceType.of(InstanceClass.T3, InstanceSize.MICRO);
    const port = 5432;
    const dbName = "my_awesome_db";
const storageSizeGiB = 120; // Change this value to your desired size


    // create database master user secret and store it in Secrets Manager
    const masterUserSecret = new Secret(this, "db-master-user-secret", {
      secretName: "db-master-user-secret",
      description: "Database master user credentials",
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: "postgres" }),
        generateStringKey: "password",
        passwordLength: 16,
        excludePunctuation: true,
      },
    });

    // We know this VPC already exists
    const myVpc = Vpc.fromLookup(this, "my-vpc", { vpcId: "vpc-0f59b4f5e43888cfd" });

    // Create a Security Group
    const dbSg = new SecurityGroup(this, "Database-SG", {
      securityGroupName: "Database-newSG",
      vpc: myVpc,
    });

    // Add Inbound rule
    dbSg.addIngressRule(
      Peer.ipv4(myVpc.vpcCidrBlock),
      Port.tcp(port),
      `Allow port ${port} for database connection from only within the VPC (${myVpc.vpcId})`
    );

    // create RDS instance (PostgreSQL)
    const dbInstance = new DatabaseInstance(this, "DB-1", {
      vpc: myVpc,
      vpcSubnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
      instanceType,
      engine,
      port,
      allocatedStorage: storageSizeGiB,
      securityGroups: [dbSg],
      databaseName: dbName,
      credentials: Credentials.fromSecret(masterUserSecret),
      backupRetention: Duration.days(0), // disable automatic DB snapshot retention
      deleteAutomatedBackups: true,
      removalPolicy: RemovalPolicy.DESTROY,
      });


    }
}