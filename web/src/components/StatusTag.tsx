import { Tag } from 'antd'
import React from 'react'

const StatusTag: React.FC<{ status: string }> = ({ status }) => {
  let color = ''
  let text = ''
  if (!status) {
    color = 'default'
    text = '未连接'
  }
  if (status == '-1') {
    color = 'warning'
    text = '离线'
  }
  if (status == '1') {
    color = 'success'
    text = '在线'
  }
  return <Tag color={color}>{text}</Tag>
}

export default React.memo(StatusTag)
