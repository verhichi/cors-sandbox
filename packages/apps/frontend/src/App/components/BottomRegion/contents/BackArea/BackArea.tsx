import { Button, Input, Checkbox, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useBackArea } from './hooks/useBackArea'
import { ReactComponent as DNSIcon } from '@/assets/dns.svg'

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
              <th>Access-Control-Allow-Origin</th>
              <td className="ant-table-cell p-2">
                <Input placeholder="http://localhost:3000" {...allowedOriginInputProps} />
              </td>
            </tr>
            <tr className="ant-table-row">
              <th>Access-Control-Allow-Headers</th>
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
              <th>Access-Control-Allow-Methods</th>
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
