import axios, { Method } from 'axios'
import { useState, ChangeEvent } from 'react'
import { DEFAULT_REQUEST_URL, METHODS } from '@/constants'
import { Button, Input, Tag, Radio, RadioChangeEvent } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useFrontArea } from './hooks/useFrontArea'

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
      <div className="ml-auto box">frontend</div>
      <div className="ant-table-container">
        <table className="w-full">
          <tbody className="ant-table-thead">
            <tr className="ant-table-row">
              <th>Request URL</th>
              <td className="ant-table-cell p-2">
                <Input placeholder={DEFAULT_REQUEST_URL} {...requestURLInputProps} />
              </td>
            </tr>
            <tr className="ant-table-row">
              <th>Current Origin</th>
              <td className="ant-table-cell p-2">{window.location.origin}</td>
            </tr>
            <tr className="ant-table-row">
              <th>Request Headers</th>
              <td className="ant-table-cell p-2">
                <div className="flex">
                  <Input
                    className="grow basis-0"
                    placeholder="X-KEY-NAME"
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
              <th>Request Method</th>
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
            <tr className="ant-table-row">
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
