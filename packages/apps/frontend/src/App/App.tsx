import { Space } from 'antd'
import { WhatIsThisRegion } from '@/App/components/WhatIsThisRegion'
import { TestRequestRegion } from '@/App/components/TestRequestRegion'

export const App = () => (
  <Space direction="vertical">
    <WhatIsThisRegion />
    <hr />
    <TestRequestRegion />
  </Space>
)
