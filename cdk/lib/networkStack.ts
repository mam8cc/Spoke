import * as cdk from 'aws-cdk-lib';
import { Vpc, IpAddresses, SecurityGroup, Peer, Port } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class NetworkStack extends cdk.Stack {
    readonly vpc: Vpc;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.vpc = new Vpc(this, 'spoke-network', {
            vpcName: 'TextForCampaign',
            ipAddresses: IpAddresses.cidr('10.0.0.0/16'),
        })
        
        const lambdaSecuritGroup = new SecurityGroup(this, 'spoke-lambda-sg', {
            vpc: this.vpc,
            securityGroupName: 'Spoke - Lambda',
            description: 'Security group for Lambda function access'
        });

        lambdaSecuritGroup.addIngressRule(lambdaSecuritGroup, Port.tcp(80), 'Web traffic')
        lambdaSecuritGroup.addIngressRule(lambdaSecuritGroup, Port.tcp(443), 'Encrypted web traffic')

        const rdsSecuritGroup = new SecurityGroup(this, 'spoke-rds-sg', {
            vpc: this.vpc,
            securityGroupName: 'Spoke - RDS',
            description: 'Security group for RDS access'
        });

        lambdaSecuritGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(5432), 'Allow all DB access')
  }
}
