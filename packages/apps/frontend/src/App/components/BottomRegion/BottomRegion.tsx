import { Space, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { FrontArea } from './contents/FrontArea'
import { BackArea } from './contents/BackArea'

const { Title } = Typography

export const BottomRegion = () => {
  return (
    <Space direction="vertical">
      <Space direction="vertical">
        <Title level={1}>Try sending a request!</Title>
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
