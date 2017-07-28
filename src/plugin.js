const s3 = require('s3')
const util = require('util')

class Plugin {
  constructor (serverless) {
    this.serverless = serverless

    this.commands = {
      sync: { lifecycleEvents: [ 'buckets' ] }
    }

    this.hooks = {
      'after:deploy:deploy': this.sync.bind(this),
      'sync:buckets': this.sync.bind(this)
    }
  }

  options () {
    return {
      maxAsyncS3: 20,
      s3RetryCount: 3,
      s3RetryDelay: 1000,
      multipartUploadThreshold: 20971520,
      multipartUploadSize: 15728640,
      s3Options: {
        region: this.serverless.service.provider.region
      }
    }
  }

  client () {
    return s3.createClient(this.options())
  }

  upload (config) {
    return new Promise(resolve => {
      this.serverless.cli.log(util.format('Syncing folder "%s" to S3 bucket "%s"', config.folder, config.bucket))

      const uploader = this.client().uploadDir(
        {
          localDir: this.serverless.config.servicePath + '/' + config.folder,
          deleteRemoved: true,
          s3Params: {
            Bucket: config.bucket
          }
        }
      )

      uploader.on('error', () => this.serverless.cli.log(' - Failed :('))
      uploader.on('end', () => this.serverless.cli.log(' - Done!') && resolve())
    })
  }

  sync () {
    return Promise.all(
      this.serverless.service.custom['s3-sync'].map(this.upload.bind(this))
    )
  }
}

module.exports = Plugin
