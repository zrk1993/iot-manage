export const parseClientId = (id: string) => {
  const v = id.split('/')
  return {
    product_key: v[0],
    device_key: v[1]
  }
}

export const parseTopic = (topic: string) => {
  const v = topic.split('/')
  return {
    product_key: v[0],
    device_key: v[1]
  }
}
