import { Space, Typography } from 'antd'
const { Paragraph, Title } = Typography
import { LinkOutlined } from '@ant-design/icons'

export const WhatIsThisRegion = () => (
  <Space direction="vertical">
    <a id="what-is-this" href="#what-is-this" className="group inline-flex text-black">
      <LinkOutlined
        className="invisible group-hover:visible self-center"
        style={{ fontSize: '32px' }}
      />
      <Title className="m-0" level={2}>
        What is this?
      </Title>
    </a>
    <Paragraph>
      This app helps you understand what is causing the CORS error by visualizing the
      frontend request as well as the backend server setting and highlighting the key
      factors that lead to the CORS error.
    </Paragraph>
  </Space>
)
