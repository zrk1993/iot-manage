import React, { FC, Fragment, Suspense } from 'react'
import { Spin } from 'antd'

export function lazyLoad(
  Comp: React.LazyExoticComponent<any>,
  { fallback }: { fallback?: React.ReactNode } = {}
) {
  return (
    <Suspense
      fallback={
        fallback ? (
          fallback
        ) : (
          <Spin size='large' className='h-full flex items-center justify-center'></Spin>
        )
      }
    >
      <Comp />
    </Suspense>
  )
}
