import axios, { Method } from 'axios'
import { useState } from 'react'
import { DEFAULT_REQUEST_URL, METHODS } from '@/constants'
import { Input, Space, Typography, Select, Table, Tag } from 'antd'

const { Option } = Select
const { Search, TextArea } = Input
const { Paragraph, Text, Title } = Typography

export const App = () => {
  const [loading, setLoading] = useState(false)
  const [isNetworkError, setIsNetworkError] = useState(false)
  const [method, setMethod] = useState<Method>(METHODS[0])

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
        <div className="right box">backend</div>
      </Space>
      <Space>
        <TextArea />
        <div className="middle">→→→→→→→</div>
        <TextArea />
      </Space>
    </Space>
  )
}
