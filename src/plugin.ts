import * as s3 from 's3'
import * as util from 'util'

class S3BucketPlugin {
  private commands: {}
  private hooks: {}

  constructor (private serverless: Serverless) {
    this.commands = {
      sync: { lifecycleEvents: [ 'buckets' ] }
    }

    this.hooks = {
      'after:deploy:deploy': this.sync.bind(this),
      'sync:buckets': this.sync.bind(this)
    }
  }

  private options () {
    return {
      maxAsyncS3: 20,
      multipartUploadSize: 15728640,
      multipartUploadThreshold: 20971520,
      s3Options: {
        region: this.serverless.getProvider('aws').getRegion()
      },
      s3RetryCount: 3,
      s3RetryDelay: 1000
    }
  }

  private client () {
    return s3.createClient(this.options())
  }

  private upload (config: BucketConfig) {
    return new Promise((resolve) => {
      this.serverless.cli.log(util.format('Syncing folder "%s" to S3 bucket "%s"', config.folder, config.bucket))

      const uploader = this.client().uploadDir(
        {
          deleteRemoved: true,
          localDir: this.serverless.config.servicePath + '/' + config.folder,
          s3Params: {
            Bucket: config.bucket
          }
        }
      )

      uploader.on('error', () => this.serverless.cli.log(' - Failed :('))
      uploader.on('end', () => this.serverless.cli.log(' - Done!') && resolve())
    })
  }

  private sync () {
    return Promise.all(
      this.serverless.service.custom['s3-sync'].map(this.upload.bind(this))
    )
  }
}

module.exports = S3BucketPlugin
