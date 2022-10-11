import { Space, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { FrontArea } from './contents/FrontArea'
import { BackArea } from './contents/BackArea'

const { Title, Paragraph, Text } = Typography

export const TestRequestRegion = () => {
  return (
    <Space direction="vertical">
      <Space direction="vertical">
        <Title level={2}>Play around with CORS in the Sandbox</Title>
        <Paragraph>
          <Text className="block">
            I have prepared a sandbox that allows you to create a server with custom CORS
            settings and send requests to the custom server you have created.
          </Text>
          <Text className="block">
            CORS errors can only be seen through the browser's developer tool(open with
            F12) so be sure to have it opened while playing around in the sandbox.
          </Text>
        </Paragraph>
      </Space>
      <div className="flex">
        <FrontArea />
        <div className="basis-0">
          <div className="arrow-box">
            <ArrowRightOutlined />
            <ArrowRightOutlined />
            <ArrowRightOutlined />
            <ArrowRightOutlined />
            <ArrowRightOutlined />
          </div>
        </div>
        <BackArea />
      </div>
    </Space>
  )
}
