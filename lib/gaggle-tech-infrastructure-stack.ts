import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class GaggleTechInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a shared API Gateway instanced that contains API resources from multiple repos
    const restApi = new apigateway.RestApi(this, "GaggleTechApi", {
      restApiName: "GaggleTechApi",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
      },
      deploy: true,
    });

    // Configure a mock endpoint to prevent the no API resources error
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

    // Create outputs for the API gateway values that will be imported by other repos to add their routes
    // to this API Gateway instance
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
