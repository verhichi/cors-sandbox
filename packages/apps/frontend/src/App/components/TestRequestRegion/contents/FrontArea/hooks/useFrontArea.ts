import axios, { Method } from 'axios'
import { useState, ChangeEvent } from 'react'
import { DEFAULT_REQUEST_URL, METHODS } from '@/constants'
import { notification, RadioChangeEvent } from 'antd'

export const useFrontArea = () => {
  const [requestLoading, setRequestLoading] = useState(false)
  const [isNetworkError, setIsNetworkError] = useState(false)
  const [requestMethod, setRequestMethod] = useState<Method>(METHODS[0])
  const [requestURL, setRequestURL] = useState(DEFAULT_REQUEST_URL)
  const [requestHeader, setRequestHeader] = useState<Record<string, string>>({})
  const [requestHeaderKey, setRequestHeaderKey] = useState('')
  const [requestHeaderValue, setRequestHeaderValue] = useState('')

  const handleChangeRequestMethod = (e: RadioChangeEvent) =>
    setRequestMethod(e.target.value)

  const handleChangeRequestURL = (e: ChangeEvent<HTMLInputElement>) =>
    setRequestURL(e.target.value)

  const handleChangeRequestHeaderKey = (e: ChangeEvent<HTMLInputElement>) =>
    setRequestHeaderKey(e.target.value)

  const handleChangeRequestHeaderValue = (e: ChangeEvent<HTMLInputElement>) =>
    setRequestHeaderValue(e.target.value)

  const handleClickAddRequestHeader = () => {
    if (!requestHeaderKey) return
    setRequestHeader({ ...requestHeader, [requestHeaderKey]: requestHeaderValue })
    setRequestHeaderKey('')
    setRequestHeaderValue('')
  }

  const handleCloseRequestHeader = (removedHeader: string) => {
    const { [removedHeader]: deletedKey, ...rest } = requestHeader
    setRequestHeader(rest)
  }

  const handleClickRequestButton = async () => {
    setRequestLoading(true)
    setIsNetworkError(false)

    try {
      await axios.request({
        method: requestMethod,
        url: requestURL || DEFAULT_REQUEST_URL,
        headers: requestHeader,
      })
      notification.success({
        message: 'Request Sent Successfully!',
        description: 'Your request was perfect, so no errors!',
        placement: 'bottom',
      })
    } catch (e) {
      notification.error({
        message: 'Request Error!',
        description:
          'There was an error with your request! Check the Developer Tools for details! We can not pick up CORS errors through code!',
        placement: 'bottom',
      })
      setIsNetworkError(true)
    } finally {
      setRequestLoading(false)
    }
  }

  return {
    requestURLInputProps: {
      value: requestURL,
      onChange: handleChangeRequestURL,
    },
    requestHeaderKeyInputProps: {
      value: requestHeaderKey,
      onChange: handleChangeRequestHeaderKey,
    },
    requestHeaderValueInputProps: {
      value: requestHeaderValue,
      onChange: handleChangeRequestHeaderValue,
    },
    requestHeaderButtonProps: {
      onClick: handleClickAddRequestHeader,
    },
    requestHeaderTagProps: {
      headers: requestHeader,
      onClose: handleCloseRequestHeader,
    },
    requestMethodRadioProps: {
      value: requestMethod,
      onChange: handleChangeRequestMethod,
    },
    requestButtonProps: {
      loading: requestLoading,
      onClick: handleClickRequestButton,
    },
  }
}
