declare namespace Serverless {
  interface Plugin {
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
}
