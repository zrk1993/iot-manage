import { Badge } from 'antd'
import React from 'react'

const StatusTag: React.FC<{ status: string; progress?: number }> = ({ status }) => {
  let type: any = 'default'
  let text = ''
  if (status == '0') {
    type = 'default'
    text = '等待升级'
  }
  if (status == '1') {
    type = 'processing'
    text = '升级中'
  }
  if (status == '2') {
    type = 'success'
    text = '升级成功'
  }
  if (status == '3') {
    type = 'error'
    text = '升级失败'
  }
  return <Badge status={type} text={text}></Badge>
}

export default React.memo(StatusTag)
