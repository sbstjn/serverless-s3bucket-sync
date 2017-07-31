declare interface Serverless {
  cli: {
    log(message: string): null
  }

  config: {
    servicePath: string
  }

  service: {
    custom: {}
  }

  getProvider(name: string): {
    getRegion: () => string
  }
}