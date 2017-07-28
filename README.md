# ⚡️ Serverless Plugin for S3 Sync

[![npm](https://img.shields.io/npm/v/serverless-s3bucket-sync.svg)](https://www.npmjs.com/package/serverless-s3bucket-sync)
[![CircleCI](https://img.shields.io/circleci/project/github/sbstjn/serverless-s3bucket-sync/master.svg)](https://circleci.com/gh/sbstjn/serverless-s3bucket-sync)
[![license](https://img.shields.io/github/license/sbstjn/serverless-s3bucket-sync.svg)](https://github.com/sbstjn/serverless-s3bucket-sync/blob/master/LICENSE.md)
[![Coveralls](https://img.shields.io/coveralls/sbstjn/serverless-s3bucket-sync.svg)](https://coveralls.io/github/sbstjn/serverless-s3bucket-sync)

With this plugin for [serverless](https://serverless.com), you can sync local folders to S3 buckets after your service is deployed.

## Usage

Add the [NPM package](https://www.npmjs.com/package/serverless-s3bucket-sync) to your project:

```bash
# Via yarn
$ yarn add serverless-s3bucket-sync

# Via npm
$ npm install serverless-s3bucket-sync
```

Add the plugin to your `serverless.yml`:

```yaml
plugins:
  - serverless-s3bucket-sync
```

## Configuration

Configure S3 Bucket syncing Auto Scaling in `serverless.yml` with references to your local folder and the name of the S3 bucket.

```yaml
custom:
  s3-sync:
    - folder: relative/folder
      bucket: bucket-name
```

That's it! With the next deployment, [serverless](https://serverless.com) will sync your local folder `relative/folder` with the S3 bucket named `bucket-name`. 

## License

Feel free to use the code, it's released using the [MIT license](LICENSE.md).

## Contribution

You are welcome to contribute to this project! 😘 

To make sure you have a pleasant experience, please read the [code of conduct](CODE_OF_CONDUCT.md). It outlines core values and beliefs and will make working together a happier experience.
