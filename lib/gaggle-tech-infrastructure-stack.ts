import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class GaggleTechInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const restApi = new apigateway.RestApi(this, "GaggleTechApi", {
      restApiName: "GaggleTechApi",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
      },
      deploy: true,
    });

    restApi.root.addResource("health").addMethod(
      "GET",
      new apigateway.MockIntegration({
        integrationResponses: [{ statusCode: "200" }],
        passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
        requestTemplates: {
          "application/json": JSON.stringify({ statusCode: 200 }),
        },
      })
    );

    new cdk.CfnOutput(this, "GaggleTechRestApiId", {
      value: restApi.restApiId,
      exportName: "GaggleTechRestApiId",
    });
    new cdk.CfnOutput(this, "GaggleTechRestApiRootResourceId", {
      value: restApi.restApiRootResourceId,
      exportName: "GaggleTechRestApiRootResourceId",
    });
  }
}
