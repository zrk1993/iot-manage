import { useEffect, useState } from 'react'

export default function Test() {
  const [data, setData] = useState({
    page: 1,
    size: 10
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  const onClick = () => {
    setData({
      ...data,
      page: data.page + 1
    })
  }

  return (
    <div>
      1<span onClick={onClick}>ddd</span>
    </div>
  )
}
