import axios, { Method } from 'axios'
import { useState, ChangeEvent } from 'react'
import {
  DEFAULT_REQUEST_URL,
  METHODS,
  HEALTHCHECK_REQUEST_URL,
  HEALTHCHECK_REQUEST_INTERVAL_MS,
  INITIAL_SERVER_ID,
} from '@/constants'
import { useHealthcheck } from '@/hooks'
import { Button, Input, Space, Typography, Select } from 'antd'
import { v4 } from 'uuid'

const { Option } = Select
const { Search } = Input
const { Paragraph, Text, Title } = Typography

export const App = () => {
  const [loading, setLoading] = useState(false)
  const [createServerloading, setCreateServerLoading] = useState(false)
  const [isNetworkError, setIsNetworkError] = useState(false)
  const [method, setMethod] = useState<Method>(METHODS[0])
  const [allowedOrigin, setAllowedOrigin] = useState('')
  const [allowedHeaders, setAllowedHeaders] = useState('')
  const [allowedMethods, setAllowedMethods] = useState('')
  const [serverID, setServerID] = useState(INITIAL_SERVER_ID)

  const { isServerUp } = useHealthcheck({
    url: HEALTHCHECK_REQUEST_URL,
    intervalMS: HEALTHCHECK_REQUEST_INTERVAL_MS,
    serverID,
  })

  const handleChangeAllowedOrigin = (e: ChangeEvent<HTMLInputElement>) =>
    setAllowedOrigin(e.target.value)
  const handleChangeAllowedHeaders = (e: ChangeEvent<HTMLInputElement>) =>
    setAllowedHeaders(e.target.value)
  const handleChangeAllowedMethods = (e: ChangeEvent<HTMLInputElement>) =>
    setAllowedMethods(e.target.value)

  const handleClickCreateServer = async () => {
    setCreateServerLoading(true)

    try {
      await axios.post('http://localhost:8080/api/createServer', {
        origin: allowedOrigin || 'http://localhost:3000',
        allowedHeaders,
        methods: allowedMethods,
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
                <td className="ant-table-cell">
                  <Input
                    placeholder="http://localhost:3000"
                    value={allowedOrigin}
                    onChange={handleChangeAllowedOrigin}
                  />
                </td>
              </tr>
              <tr className="ant-table-row">
                <th>Access-Control-Allow-Headers</th>
                <td className="ant-table-cell">
                  <Input
                    placeholder="X-MY-CUSTOM-HEADER"
                    value={allowedHeaders}
                    onChange={handleChangeAllowedHeaders}
                  />
                </td>
              </tr>
              <tr className="ant-table-row">
                <th>Access-Control-Allow-Origin</th>
                <td className="ant-table-cell">
                  <Input
                    placeholder="GET, POST, DELETE, PUT, PATCH"
                    value={allowedMethods}
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
