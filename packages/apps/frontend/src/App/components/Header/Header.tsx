import { PageHeader, Typography } from 'antd'

const { Title } = Typography

export const Header = () => (
  <PageHeader
    className="bg-blue-700"
    title={
      <Title level={1} className="text-white">
        CORS Test
      </Title>
    }
    subTitle={
      <Title level={5} className="text-white">
        Do you really know how it works?
      </Title>
    }
  />
)
