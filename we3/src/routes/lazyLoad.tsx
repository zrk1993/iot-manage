import { Spin } from 'antd'
import React, { Suspense } from 'react'

export default function lazyLoad(
  Comp: React.LazyExoticComponent<any>,
  { fallback }: { fallback?: React.ReactNode } = {}
) {
  return (
    <Suspense
      fallback={
        fallback ? (
          fallback
        ) : (
          <div className='text-center'>
            <Spin></Spin>
          </div>
        )
      }
    >
      <Comp />
    </Suspense>
  )
}
