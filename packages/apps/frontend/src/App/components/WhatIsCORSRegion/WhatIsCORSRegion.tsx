import { Space, Typography } from 'antd'
import OriginImage from '@/assets/origin.jpg'

const { Paragraph, Title, Text } = Typography

export const WhatIsCORSRegion = () => (
  <Space direction="vertical" className="gap-4">
    <Title level={2}>What is CORS?</Title>
    <Paragraph>
      If you want a full explanation, read the{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
        target="_blank"
        rel="noreferrer"
      >
        Mozilla document
      </a>
      .
    </Paragraph>
    <Paragraph>
      Otherwise, here is my simplified explanation of <Text code>CORS</Text>:
      <blockquote>
        CORS is a mechanism that allows or prevents web pages from accessing resources
        from a different origin server
      </blockquote>
      That's it. If you didn't get it, just keep reading and come back later.
    </Paragraph>
    <Paragraph>
      <Text className="block">
        You also need to know what an <Text code>origin</Text> is. This one is straight
        forward:
        <blockquote>An origin is the protocol, hostname, and port of a URL</blockquote>
        So in the sample URL below, the colored part is the origin.
      </Text>
      <img src={OriginImage} style={{ width: '600px' }} />
      <Text className="block">
        If 2 URLs have any difference in the origin, they are considered to be{' '}
        <Text code>cross-origin</Text>, and cross-origin requests are usually denied by
        default for security reasons.
      </Text>
    </Paragraph>
    <Paragraph>
      <Text className="block">
        So what is the cause of a CORS error? To put it simply:
        <blockquote>
          CORS errors are caused by a mismatch between the web pages request and the
          requested cross-origin server's access settings
        </blockquote>
      </Text>
      <Text className="block">
        Because it's a mismatch between the server and the request, know that to resolve
        the CORS error, you should be requesting help from both the frontend and the
        backend engineers.
      </Text>
    </Paragraph>
  </Space>
)
