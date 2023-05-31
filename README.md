# Gaggle Tech Infrastructure

This repo holds the CDK stack for the account level AWS infrastructure that is not tied to a specific repo or project.

At the moment, this contains the AWS API Gateway instance.

## System Design

![Infrastructure](./docs/gaggle-tech-infrastructure.drawio.svg)

## Set Up Node

This repo is configured with NVM. Run the `nvm use` command to configure the correct version of NodeJS for this repo.

If you don't have that version installed, run `nvm install` first.

## Install Dependencies

Install NPM dependencies with the following command.

```bash
npm install
```

## Deploy

You may need to bootstrap your environment. You only need to run this once.

```bash
npm run cdk bootstrap
```

You can then deploy changes with the follwoing command.

```bash
npm run cdk deploy
```

## Useful commands

This repo was created with the CDK CLI app template. Use the following commands to interact with the CDK.

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
