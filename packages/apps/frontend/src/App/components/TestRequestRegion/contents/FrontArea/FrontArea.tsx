import { DEFAULT_REQUEST_URL, METHODS } from '@/constants'
import { Button, Input, Tag, Radio, Popover, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useFrontArea } from './hooks/useFrontArea'
import { ReactComponent as WebIcon } from '@/assets/web.svg'
import { QuestionCircleOutlined } from '@ant-design/icons'

const { Text, Paragraph } = Typography

export const FrontArea = () => {
  const {
    requestURLInputProps,
    requestHeaderKeyInputProps,
    requestHeaderValueInputProps,
    requestHeaderButtonProps,
    requestHeaderTagProps,
    requestMethodRadioProps,
    requestButtonProps,
  } = useFrontArea()

  return (
    <div className="basis-0 grow">
      <div className="ml-auto box flex items-center justify-center relative">
        <div className="absolute top-0">Browser</div>
        <WebIcon viewBox="0 0 48 48" stroke="#555" fill="#555" />
      </div>
      <div className="ant-table-container">
        <table className="w-full">
          <tbody className="ant-table-thead">
            <tr className="ant-table-row">
              <th>
                <Popover
                  placement="topLeft"
                  content={
                    <>
                      <Paragraph>The URL to which you send your request.</Paragraph>
                      <Paragraph>
                        The default is <Text code>{DEFAULT_REQUEST_URL}</Text> because
                        that's where you will create your custom server on in this app,
                        but you may choose to send it to any other URL.
                      </Paragraph>
                    </>
                  }
                  title="Request URL"
                >
                  <div className="hover:underline hover:cursor-help">
                    Request URL
                    <QuestionCircleOutlined className="align-middle" />
                  </div>
                </Popover>
              </th>
              <td className="ant-table-cell p-2">
                <Input placeholder={DEFAULT_REQUEST_URL} {...requestURLInputProps} />
              </td>
            </tr>
            <tr className="ant-table-row">
              <th>
                <Popover
                  placement="topLeft"
                  content={
                    <>
                      <Paragraph>The origin of this app.</Paragraph>
                      <Paragraph>
                        If this value is not on the
                        <Text code>Access-Control-Allow-Origin</Text> list, your request
                        may result in a CORS error.
                      </Paragraph>
                    </>
                  }
                  title="Current Origin"
                >
                  <div className="hover:underline hover:cursor-help">
                    Current Origin
                    <QuestionCircleOutlined className="align-middle" />
                  </div>
                </Popover>
              </th>
              <td className="ant-table-cell p-2">{window.location.origin}</td>
            </tr>
            <tr className="ant-table-row">
              <th>
                <Popover
                  placement="topLeft"
                  content={
                    <>
                      <Paragraph>Headers to append to your request.</Paragraph>
                      <Paragraph>
                        If the header keys are not on the{' '}
                        <Text code>Access-Control-Allow-Headers</Text> list, your request
                        will result in an CORS error.
                      </Paragraph>
                    </>
                  }
                  title="Request Headers"
                >
                  <div className="hover:underline hover:cursor-help">
                    Request Headers
                    <QuestionCircleOutlined className="align-middle" />
                  </div>
                </Popover>
              </th>
              <td className="ant-table-cell p-2">
                <div className="flex">
                  <Input
                    className="grow basis-0"
                    placeholder="X-MY-CUSTOM-HEADER"
                    {...requestHeaderKeyInputProps}
                  />
                  <div className="mx-1 font-bold">:</div>
                  <Input
                    className="grow basis-1/3"
                    placeholder="MY VALUE"
                    {...requestHeaderValueInputProps}
                  />
                  <Button icon={<PlusOutlined />} {...requestHeaderButtonProps} />
                </div>
                <div className="mt-1">
                  {Object.entries(requestHeaderTagProps.headers).map(([key, value]) => (
                    <Tag
                      key={key}
                      closable
                      onClose={(e) => {
                        e.preventDefault()
                        requestHeaderTagProps.onClose(key)
                      }}
                      className="tag"
                    >
                      {key}: {value}
                    </Tag>
                  ))}
                </div>
              </td>
            </tr>
            <tr className="ant-table-row">
              <th>
                <Popover
                  placement="topLeft"
                  content={
                    <>
                      <Paragraph>Method used for your request.</Paragraph>
                      <Paragraph>
                        If the request method you choose is not on the
                        <Text code>Access-Control-Allow-Methods</Text> list, your request
                        may result in an CORS error.
                      </Paragraph>
                    </>
                  }
                  title="Request Method"
                >
                  <div className="hover:underline hover:cursor-help">
                    Request Method
                    <QuestionCircleOutlined className="align-middle" />
                  </div>
                </Popover>
              </th>
              <td className="ant-table-cell p-2">
                <Radio.Group {...requestMethodRadioProps}>
                  {METHODS.map((method) => (
                    <Radio key={method} value={method}>
                      {method}
                    </Radio>
                  ))}
                </Radio.Group>
              </td>
            </tr>
            <tr className="ant-table-row border-0">
              <td colSpan={2}>
                <Button type="primary" className="w-full" {...requestButtonProps}>
                  Send request with this setting!
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
