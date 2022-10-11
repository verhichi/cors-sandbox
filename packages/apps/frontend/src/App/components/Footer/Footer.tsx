import { Avatar } from 'antd'
import { AVATAR_SRC } from '@/constants'

export const Footer = () => (
  <div className="bg-slate-900 p-2 text-white text-center">
    CORS Test ©2022 Created by verhichi
    <Avatar src={AVATAR_SRC} className="ml-2" />
  </div>
)
