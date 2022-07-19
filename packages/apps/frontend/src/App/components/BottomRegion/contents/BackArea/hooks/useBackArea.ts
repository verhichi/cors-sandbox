import axios, { Method } from 'axios'
import { useState, ChangeEvent } from 'react'
import {
  HEALTHCHECK_REQUEST_URL,
  HEALTHCHECK_REQUEST_INTERVAL_MS,
  INITIAL_SERVER_ID,
  METHODS,
} from '@/constants'
import { useHealthcheck } from '@/hooks'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { v4 } from 'uuid'

export const useBackArea = () => {
  const [createServerLoading, setCreateServerLoading] = useState(false)
  const [allowedOrigin, setAllowedOrigin] = useState('')
  const [allowedHeaders, setAllowedHeaders] = useState<string[]>([])
  const [headerInputValue, setHeaderInputValue] = useState('')

  const [allowedMethods, setAllowedMethods] = useState<Method[]>([])
  const [serverID, setServerID] = useState(INITIAL_SERVER_ID)

  const { isServerUp } = useHealthcheck({
    url: HEALTHCHECK_REQUEST_URL,
    intervalMS: HEALTHCHECK_REQUEST_INTERVAL_MS,
    serverID,
  })

  const handleChangeAllowedOrigin = (e: ChangeEvent<HTMLInputElement>) =>
    setAllowedOrigin(e.target.value)

  const handleChangeHeaderInputValue = (e: ChangeEvent<HTMLInputElement>) =>
    setHeaderInputValue(e.target.value)

  const handleClickHeaderButton = () => {
    if (!headerInputValue) return
    if (allowedHeaders.includes(headerInputValue)) return
    setAllowedHeaders([...allowedHeaders, headerInputValue])
    setHeaderInputValue('')
  }

  const handleCloseHeaderTag = (removedHeader: string) => {
    setAllowedHeaders(allowedHeaders.filter((header) => header !== removedHeader))
  }

  const handleChangeAllowedMethods = (checkedvalues: CheckboxValueType[]) =>
    setAllowedMethods(checkedvalues as Method[])

  const handleClickCreateServer = async () => {
    setCreateServerLoading(true)

    try {
      await axios.post('http://localhost:8080/api/createServer', {
        origin: allowedOrigin || 'http://localhost:3000',
        allowedHeaders,
        methods: allowedMethods.join(','),
      })
      setServerID(v4())
    } catch (e) {
      console.log(e)
    } finally {
      setCreateServerLoading(false)
    }
  }

  return {
    backendBoxProps: {
      style: { stroke: isServerUp ? 'green' : 'red', fill: isServerUp ? 'green' : 'red' },
    },
    allowedOriginInputProps: {
      value: allowedOrigin,
      onChange: handleChangeAllowedOrigin,
    },
    allowedHeaderInputProps: {
      value: headerInputValue,
      onChange: handleChangeHeaderInputValue,
    },
    allowedHeaderAddButtonProps: {
      onClick: handleClickHeaderButton,
    },
    allowedHeaderTagProps: {
      headers: allowedHeaders,
      onClose: handleCloseHeaderTag,
    },
    allowedMethodInputProps: {
      options: METHODS,
      onChange: handleChangeAllowedMethods,
    },
    createServerButtonProps: {
      loading: createServerLoading,
      onClick: handleClickCreateServer,
    },
  }
}
