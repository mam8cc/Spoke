import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { AuroraPostgresEngineVersion, ClusterInstance, DatabaseCluster, DatabaseClusterEngine } from 'aws-cdk-lib/aws-rds';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface PostgresRdsStackProps extends cdk.StackProps {
    vpc: Vpc,
}

export class PostgresRdsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: PostgresRdsStackProps) {
    super(scope, id, props);

    const rdsCluster = new DatabaseCluster(this, 'postgres-cluster', {
        vpc: props?.vpc,
        engine: DatabaseClusterEngine.auroraPostgres({ version: AuroraPostgresEngineVersion.VER_15_3 }),
        defaultDatabaseName: 'spoke_prod',
        writer: ClusterInstance.serverlessV2('writer', {
            publiclyAccessible: true,
        }),
        vpcSubnets: {
            subnetType: SubnetType.PUBLIC,
        },
    })
  }
}
