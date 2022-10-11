import { Space } from 'antd'
import { WhatIsThisRegion } from '@/App/components/WhatIsThisRegion'
import { WhatIsCORSRegion } from '@/App/components/WhatIsCORSRegion'
import { TestRequestRegion } from '@/App/components/TestRequestRegion'
import { Header } from '@/App/components/Header'

export const App = () => (
  <Space direction="vertical">
    <Header />
    <Space direction="vertical" className="p-3">
      <WhatIsThisRegion />
      <hr />
      <WhatIsCORSRegion />
      <hr />
      <TestRequestRegion />
    </Space>
  </Space>
)
