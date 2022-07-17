import axios, { Method } from 'axios'
import { useState, ChangeEvent, useRef, useEffect } from 'react'
import {
  DEFAULT_REQUEST_URL,
  METHODS,
  HEALTHCHECK_REQUEST_URL,
  HEALTHCHECK_REQUEST_INTERVAL_MS,
  INITIAL_SERVER_ID,
} from '@/constants'
import { useHealthcheck } from '@/hooks'
import { Button, Input, Space, Typography, Select, Checkbox, Tag, InputRef } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { v4 } from 'uuid'
import { PlusOutlined } from '@ant-design/icons'

const { Option } = Select
const { Search } = Input
const { Paragraph, Text, Title } = Typography

export const App = () => {
  const [loading, setLoading] = useState(false)
  const [createServerloading, setCreateServerLoading] = useState(false)
  const [isNetworkError, setIsNetworkError] = useState(false)
  const [method, setMethod] = useState<Method>(METHODS[0])
  const [allowedOrigin, setAllowedOrigin] = useState('')
  const [allowedHeaders, setAllowedHeaders] = useState<string[]>([])
  const [headerInputValue, setHeaderInputValue] = useState('')
  const [headerInputVisible, setHeaderInputVisible] = useState(false)
  const headerInputRef = useRef<InputRef>(null)

  const [allowedMethods, setAllowedMethods] = useState<Method[]>([])
  const [serverID, setServerID] = useState(INITIAL_SERVER_ID)

  const { isServerUp } = useHealthcheck({
    url: HEALTHCHECK_REQUEST_URL,
    intervalMS: HEALTHCHECK_REQUEST_INTERVAL_MS,
    serverID,
  })

  useEffect(() => {
    if (headerInputVisible) headerInputRef.current?.focus()
  }, [headerInputVisible])

  const handleChangeAllowedOrigin = (e: ChangeEvent<HTMLInputElement>) =>
    setAllowedOrigin(e.target.value)

  const handleChangeHeaderInputValue = (e: ChangeEvent<HTMLInputElement>) =>
    setHeaderInputValue(e.target.value)
  const handleInputConfirm = () => {
    if (headerInputValue && allowedHeaders.indexOf(headerInputValue) === -1) {
      setAllowedHeaders([...allowedHeaders, headerInputValue])
    }
    setHeaderInputVisible(false)
    setHeaderInputValue('')
  }
  const showInput = () => {
    setHeaderInputVisible(true)
  }
  const handleClose = (removedHeader: string) => {
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

  const handleChangeMethod = (value: Method) => setMethod(value)

  const handleClickButton = async (value: string) => {
    setLoading(true)
    setIsNetworkError(false)

    try {
      await axios.request({
        method,
        url: value || DEFAULT_REQUEST_URL,
      })
    } catch (e) {
      console.log(e)
      setIsNetworkError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Space direction="vertical">
      <Space direction="vertical">
        <Title level={1}>What is this?</Title>
        <Paragraph>
          This app helps you understand what is causing the CORS error by visualizing the
          frontend request as well as the backend server setting and highlighting the key
          factors that lead to the CORS error.
        </Paragraph>
      </Space>
      <hr />
      <Space direction="vertical">
        <Title level={1}>Try sending a request!</Title>
        <Search
          placeholder={DEFAULT_REQUEST_URL}
          enterButton="Send Request"
          onSearch={handleClickButton}
          size="large"
          loading={loading}
          addonBefore={
            <Select<Method> defaultValue={METHODS[0]} onChange={handleChangeMethod}>
              {METHODS.map((method) => (
                <Option key={method} value={method}>
                  {method}
                </Option>
              ))}
            </Select>
          }
        />
        {isNetworkError && <Text type="danger">Network Error!</Text>}
      </Space>
      <Space>
        <div className="left box">frontend</div>
        <div className="middle">→→→→→→→</div>
        <div className="right box" style={{ background: isServerUp ? 'green' : 'red' }}>
          backend
        </div>
      </Space>
      <Space>
        <div className="ant-table-container">
          <table className="server-table">
            <tbody className="ant-table-thead">
              <tr className="ant-table-row">
                <th>Access-Control-Allow-Origin</th>
                <td className="ant-table-cell p-2">
                  <Input
                    placeholder="http://localhost:3000"
                    value={allowedOrigin}
                    onChange={handleChangeAllowedOrigin}
                  />
                </td>
              </tr>
              <tr className="ant-table-row">
                <th>Access-Control-Allow-Headers</th>
                <td className="ant-table-cell p-2">
                  <div className="mb-2">
                    {allowedHeaders.map((header) => (
                      <Tag
                        key={header}
                        closable
                        onClose={(e) => {
                          e.preventDefault()
                          handleClose(header)
                        }}
                        className="tag"
                      >
                        {header}
                      </Tag>
                    ))}
                  </div>
                  <div>
                    {headerInputVisible ? (
                      <Input
                        ref={headerInputRef}
                        type="text"
                        size="small"
                        placeholder="X-MY-CUSTOM-HEADER"
                        value={headerInputValue}
                        onChange={handleChangeHeaderInputValue}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                      />
                    ) : (
                      <Tag onClick={showInput} className="tag-plus">
                        <PlusOutlined className="mr-1" /> Click to add Header
                      </Tag>
                    )}
                  </div>
                </td>
              </tr>
              <tr className="ant-table-row">
                <th>Access-Control-Allow-Origin</th>
                <td className="ant-table-cell p-2">
                  {/* TODO: add generics for return type once available */}
                  <Checkbox.Group
                    options={METHODS}
                    onChange={handleChangeAllowedMethods}
                  />
                </td>
              </tr>
              <tr className="ant-table-row">
                <td colSpan={2}>
                  <Button
                    type="primary"
                    loading={createServerloading}
                    onClick={handleClickCreateServer}
                  >
                    Setup a server with this setting!
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Space>
    </Space>
  )
}
