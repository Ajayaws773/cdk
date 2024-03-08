import { Stack, StackProps, CfnOutput} from 'aws-cdk-lib/core';
import { Instance, InstanceType, AmazonLinuxImage, Vpc, IVpc, Subnet, VpcAttributes, BlockDevice, SubnetType, SecurityGroup, Port, Peer } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { aws_ec2, aws_iam as iam} from 'aws-cdk-lib';
import { Ec2Action } from 'aws-cdk-lib/aws-cloudwatch-actions';


export class ec2creationstack extends Stack {
  public readonly my_virtual_machine: Instance;
  public readonly myVpc: IVpc;
  public readonly myRole: iam.Role;
  public readonly instanceProfile: iam.CfnInstanceProfile;


  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.myVpc = Vpc.fromLookup(this, 'external-vpc', {
      vpcName: 'vpc/TheVPC',
      
    });
    
    const securityGroup = new SecurityGroup(this, 'MySecurityGroup', {
      vpc: this.myVpc,
      securityGroupName: 'MySecurityGroup',
      description: 'Allow SSH and HTTP traffic',
      allowAllOutbound: true,
          });
          
      securityGroup.connections.allowFrom(
        Peer.anyIpv4(),
        Port.tcp(22),
        "ssh" 
      )
      securityGroup.connections.allowFrom(
        Peer.ipv4('10.0.0.0/16'),
        Port.tcp(22),
        "ssh" 
      )

    this.myRole = new iam.Role(this, 'MyRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'), // Assume the role by EC2 service
      roleName: 'MyRole2', // Name of the IAM role
      description: 'My custom IAM Role', // Description of the IAM role
    });

    const inlinePolicy = {
      statements: [
        new iam.PolicyStatement({
          actions: [
            's3:GetObject',
            's3:PutObject',
            's3:DeleteObject',
          ], // List of actions for the policy
          resources: ['arn:aws:s3:::my-bucket/*'], // List of resources for the policy
        }),
      ],
    };

    this.myRole.attachInlinePolicy(
      new iam.Policy(this, 'InlinePolicy', {
        statements: inlinePolicy.statements,
      })
    );
    
    // Creating IAM instance profile and associating it with the IAM role
    this.instanceProfile = new iam.CfnInstanceProfile(this, 'InstanceProfile', {
      roles: [this.myRole.roleName],
    });

     // Define the size of the block device (EBS volume)
    //  const volumeSizeGiB = 50; // Change this value to your desired size

    //  // Define the block device mapping
    //  const blockDevices: BlockDevice[] = [
    //    {
    //      deviceName: '/dev/xvda',
    //      volume: {
    //        volumeType: 'gp2',
    //        volumeSize: volumeSizeGiB
    //      },
    //    },
    //  ];
      // Creating EC2 instance with the associated instance profile
    this.my_virtual_machine = new Instance(this, 'single-instance', {
      instanceType: new InstanceType('t2.micro'),
      machineImage: new AmazonLinuxImage(),
      vpc: this.myVpc,
      role: this.myRole,
      // availabilityZone: 'ap-south-1a',
      instanceName: 'MyInstanceName2', // Instance name
      keyName: 'newkey', // SSH key pair name
    //   associatePublicIpAddress: true,
      // privateIpAddress: '20.0.1.10',
      securityGroup: securityGroup,
      // blockDevices,
      vpcSubnets:     {
        subnetType: SubnetType.PUBLIC,
        availabilityZones: ['ap-south-1b'],
  
    },
    });

   
    // Output the VPC ID
    new CfnOutput(this, 'VPC1', { value: this.myVpc.vpcId });
    new CfnOutput(this, 'instanceprofile', { value: this.instanceProfile.attrArn });
    new CfnOutput(this, 'ec2', { value: this.my_virtual_machine. instanceId });
    // new CfnOutput(this, 'ec2privateIP', { value: this.my_virtual_machine. instancePrivateIp });
    new CfnOutput(this, 'ec2privateIP', {
      value: this.my_virtual_machine. instancePrivateIp,
      description: 'ec2 instance IP',
      exportName: 'instancePrivateIP1',
    });
  }
}