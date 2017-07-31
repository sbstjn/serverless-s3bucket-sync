declare module 's3' {
  namespace s3 {
    interface ClientConfig {
      maxAsyncS3: number,
      multipartUploadSize: number,
      multipartUploadThreshold: number,
      s3Options: {
        region: string
      },
      s3RetryCount: number,
      s3RetryDelay: number
    }

    interface UploadConfig {
      deleteRemoved: boolean,
      localDir: string,
      s3Params: {
        Bucket: string
      }
    }

    interface Upload {
      on(event: string, handler: () => any): null
    }

    interface Client {
      uploadDir(config: s3.UploadConfig): s3.Upload
    }
  }

  export function createClient(config: s3.ClientConfig): s3.Client
}
