#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';
import { NetworkStack } from '../lib/networkStack';
import { PostgresRdsStack } from '../lib/postgresRdsStack';

const app = new cdk.App();

const networkStack = new NetworkStack(app, 'NetworkStack');
const postgresRdsStack = new PostgresRdsStack(app, 'PostgresRdsStack', {vpc: networkStack.vpc})