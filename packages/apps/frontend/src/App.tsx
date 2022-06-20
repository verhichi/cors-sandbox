import axios from 'axios'
import { useState } from 'react'
import { DEFAULT_REQUEST_URL } from '@/constants'
import { Input, Space, Typography } from 'antd'

const { Search } = Input
const { Paragraph, Text, Title } = Typography

export const App = () => {
  const [loading, setLoading] = useState(false)
  const [isNetworkError, setIsNetworkError] = useState(false)

  const handleClickButton = async (value: string) => {
    setLoading(true)
    setIsNetworkError(false)

    try {
      await axios.get(value || DEFAULT_REQUEST_URL)
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
      <Space>
        <Search
          placeholder={DEFAULT_REQUEST_URL}
          enterButton="Send Request"
          onSearch={handleClickButton}
          size="large"
          loading={loading}
        />
        {isNetworkError && <Text type="danger">Network Error!</Text>}
      </Space>
    </Space>
  )
}
