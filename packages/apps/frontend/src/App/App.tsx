import { Space } from 'antd'
import { TopRegion } from '@/App/components/TopRegion'
import { BottomRegion } from '@/App/components/BottomRegion'

export const App = () => (
  <Space direction="vertical">
    <TopRegion />
    <hr />
    <BottomRegion />
  </Space>
)
