import { store } from '@/store'
import globalMsg from '@/utils/global-msg'
import { Upload } from 'antd'
import type { UploadProps } from 'antd'
import { FC } from 'react'

type TProps = {
  children: React.ReactNode
  onSuccess: (url: string) => void
}

const UploadComp: FC<TProps> = props => {
  const uploadProps: UploadProps = {
    name: 'file',
    action: '/api/file/upload',
    headers: {
      authorization: store.getState().globalSlice.token || ''
    },
    itemRender: () => <></>,
    defaultFileList: [],
    onChange(info) {
      if (info.file.status !== 'uploading') {
        //console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.code != 0) {
          globalMsg.error(info.file.response.message)
        } else {
          props.onSuccess(info.file.response.data)
        }
      } else if (info.file.status === 'error') {
        globalMsg.error(`${info.file.name} file upload failed.`)
      }
    }
  }

  return <Upload {...uploadProps}>{props.children}</Upload>
}

export default UploadComp
