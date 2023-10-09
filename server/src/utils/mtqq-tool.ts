export const parseClientId = (id: string) => {
  const v = id.split('/')
  return {
    product_key: v[0],
    device_key: v[1]
  }
}
