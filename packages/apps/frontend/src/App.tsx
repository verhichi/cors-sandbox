import axios from 'axios'
import { useState } from 'react'
import { Button, Space } from 'antd'

export const App = () => {
  const [loading, setLoading] = useState(false)

  const handleClickButton = async () => {
    setLoading(true)
    try {
      await axios.get('http://localhost:8080/api')
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Space>
      <Button type="primary" loading={loading} onClick={handleClickButton}>
        Send Request!
      </Button>
    </Space>
  )
}
