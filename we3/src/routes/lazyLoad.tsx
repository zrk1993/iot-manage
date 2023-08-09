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
          <Spin
            size='large'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}
          ></Spin>
        )
      }
    >
      <Comp />
    </Suspense>
  )
}
