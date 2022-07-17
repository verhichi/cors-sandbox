export type tServerOptions = {
  origin: string
  allowedHeaders: string
  methods: string
}

export type tUseHealthcheckProps = {
  url: string
  intervalMS: number
  serverID: string
}
export type tUseHealthcheckReturn = {
  isServerUp: boolean
}

export type tNoTimer = null
