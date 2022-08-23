import { Button, Input, Checkbox, Tag, Popover, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useBackArea } from './hooks/useBackArea'
import { ReactComponent as DNSIcon } from '@/assets/dns.svg'
import { QuestionCircleOutlined } from '@ant-design/icons'

const { Text, Paragraph } = Typography

export const BackArea = () => {
  const {
    isServerUp,
    backendBoxProps,
    allowedOriginInputProps,
    allowedHeaderInputProps,
    allowedHeaderAddButtonProps,
    allowedHeaderTagProps,
    allowedMethodInputProps,
    createServerButtonProps,
  } = useBackArea()

  return (
    <div className="basis-0 grow">
      <div className="box flex items-center justify-center relative">
        <div className="absolute top-0">Server({isServerUp ? 'Running' : 'Down'})</div>
        <DNSIcon viewBox="-4 -3 55 55" {...backendBoxProps} />
      </div>
      <div className="ant-table-container">
        <table className="w-full">
          <tbody className="ant-table-thead">
            <tr className="ant-table-row empty-row">
              <td colSpan={2} />
            </tr>
            <tr className="ant-table-row">
              <th>
                <Popover
                  placement="topRight"
                  content={
                    <>
                      <Paragraph>
                        The server will only accept requests from the origin set here.
                      </Paragraph>
                      <Paragraph>
                        The default is <Text code>http://localhost:3000</Text>(which is
                        also the origin of this app) because you'll be sending requests
                        from this app.
                      </Paragraph>
                    </>
                  }
                  title="Access-Control-Allow-Origin"
                >
                  <div className="hover:underline hover:cursor-help">
                    Access-Control-Allow-Origin
                    <QuestionCircleOutlined className="align-middle" />
                  </div>
                </Popover>
              </th>
              <td className="ant-table-cell p-2">
                <Input placeholder="http://localhost:3000" {...allowedOriginInputProps} />
              </td>
            </tr>
            <tr className="ant-table-row">
              <th>
                <Popover
                  placement="topRight"
                  content={
                    <>
                      <Paragraph>The server will only accept headers set here.</Paragraph>
                      <Paragraph>
                        If you send a request with any other headers, your request may not
                        be accepted.
                      </Paragraph>
                    </>
                  }
                  title="Access-Control-Allow-Headers"
                >
                  <div className="hover:underline hover:cursor-help">
                    Access-Control-Allow-Headers
                    <QuestionCircleOutlined className="align-middle" />
                  </div>
                </Popover>
              </th>
              <td className="ant-table-cell p-2">
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="X-MY-CUSTOM-HEADER"
                    {...allowedHeaderInputProps}
                  />
                  <Button icon={<PlusOutlined />} {...allowedHeaderAddButtonProps} />
                </div>
                <div className="mt-1">
                  {allowedHeaderTagProps.headers.map((header) => (
                    <Tag
                      key={header}
                      closable
                      onClose={(e) => {
                        e.preventDefault()
                        allowedHeaderTagProps.onClose(header)
                      }}
                      className="tag"
                    >
                      {header}
                    </Tag>
                  ))}
                </div>
              </td>
            </tr>
            <tr className="ant-table-row">
              <th>
                <Popover
                  placement="topRight"
                  content={
                    <>
                      <Paragraph>
                        The server will only accept requests sent with the methods set
                        here.
                      </Paragraph>
                      <Paragraph>
                        If you send a request with any other methods, your request may not
                        be accepted.
                      </Paragraph>
                    </>
                  }
                  title="Access-Control-Allow-Methods"
                >
                  <div className="hover:underline hover:cursor-help">
                    Access-Control-Allow-Methods
                    <QuestionCircleOutlined className="align-middle" />
                  </div>
                </Popover>
              </th>
              <td className="ant-table-cell p-2">
                {/* TODO: add generics for return type once available */}
                <Checkbox.Group {...allowedMethodInputProps} />
              </td>
            </tr>
            <tr className="ant-table-row border-0">
              <td colSpan={2}>
                <Button type="primary" className="w-full" {...createServerButtonProps}>
                  Setup a server with this setting!
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
