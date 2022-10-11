import { Method } from 'axios'
import { v4 } from 'uuid'

// my profile image url
export const AVATAR_SRC = 'https://avatars.githubusercontent.com/u/33770652?v=4'

// app related constants
export const DEFAULT_REQUEST_URL = 'http://localhost:8000/api'
export const HEALTHCHECK_REQUEST_URL = 'http://localhost:8080/api/healthcheck'
export const METHODS: Method[] = [
  'GET',
  'DELETE',
  'HEAD',
  'OPTIONS',
  'POST',
  'PUT',
  'PATCH',
]
export const HEALTHCHECK_REQUEST_INTERVAL_MS = 15000
export const NO_TIMER = null
export const INITIAL_SERVER_ID = v4()

export const SERVER_STATE = {
  SUCCESS: 'success',
  FAILURE: 'failure',
}
