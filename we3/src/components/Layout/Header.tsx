import { isMobile } from '@/utils/tools'
import { AlignLeftOutlined } from '@ant-design/icons'
import { FC } from 'react'

import './Header.scss'

const Header: FC<{ showDrawer: () => void }> = props => {
  return (
    <header className='relative h-14 shrink-0'>
      <div className='header-wrap flex items-center pl-6 h-14'>
        {isMobile() && <AlignLeftOutlined className='pr-4' onClick={props.showDrawer} />}
        <div className='text-xl font-medium'>Iot Manage</div>
      </div>
    </header>
  )
}

export default Header
