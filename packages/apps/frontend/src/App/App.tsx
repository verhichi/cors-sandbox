import { Space } from 'antd'
import { WhatIsThisRegion } from '@/App/components/WhatIsThisRegion'
import { WhatIsCORSRegion } from '@/App/components/WhatIsCORSRegion'
import { TestRequestRegion } from '@/App/components/TestRequestRegion'

export const App = () => (
  <Space direction="vertical">
    <WhatIsThisRegion />
    <hr />
    <WhatIsCORSRegion />
    <hr />
    <TestRequestRegion />
  </Space>
)
