import { Space, Typography } from 'antd'
const { Paragraph, Title } = Typography

export const WhatIsThisRegion = () => (
  <Space direction="vertical">
    <Title level={2}>What is this?</Title>
    <Paragraph>
      This app helps you understand what is causing the CORS error by visualizing the
      frontend request as well as the backend server setting and highlighting the key
      factors that lead to the CORS error.
    </Paragraph>
  </Space>
)
