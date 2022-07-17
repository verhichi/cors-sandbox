import axios from 'axios'
import { tUseHealthcheckProps, tNoTimer, tUseHealthcheckReturn } from '@/types'
import { useEffect, useState } from 'react'
import { NO_TIMER, HEALTHCHECK_REQUEST_INTERVAL_MS, SERVER_STATE } from '@/constants'

export const useHealthcheck = ({
  url,
  intervalMS = HEALTHCHECK_REQUEST_INTERVAL_MS,
  serverID,
}: tUseHealthcheckProps): tUseHealthcheckReturn => {
  const [intervalTimer, setIntervalTimer] = useState<NodeJS.Timer | tNoTimer>(NO_TIMER)
  const [isServerUp, setIsServerUp] = useState(false)

  useEffect(() => {
    if (!serverID) return
    if (intervalTimer) clearInterval(intervalTimer)

    const callHealthCheck = async () => {
      return await axios.get(url)
    }

    const intervalCallback = async () => {
      try {
        const data = await callHealthCheck()
        setIsServerUp(data.data === SERVER_STATE.SUCCESS)
      } catch {
        setIsServerUp(false)
      }
    }

    intervalCallback() // call at 0 second mark, setInterval doesn't call first time until intervalMS has passed
    if (!isServerUp) return // stop calling healthcheck if it fails
    const timer = setInterval(intervalCallback, intervalMS)
    setIntervalTimer(timer)

    return () => {
      if (intervalTimer) clearInterval(intervalTimer)
    }
  }, [serverID, isServerUp])

  return { isServerUp }
}
