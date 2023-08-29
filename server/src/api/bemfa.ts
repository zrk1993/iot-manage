import axios from 'axios'
import config from '@/config'

type TResponse<T> = {
  code: number
  message: string
  data: T
}

/**
 * 所有主题
 * @returns code: { "0": "成功" }
 */
export async function allTopic(): Promise<
  TResponse<
    {
      topic: string
      online: boolean
    }[]
  >
> {
  try {
    const res = await axios.get('https://apis.bemfa.com/va/alltopic', {
      params: {
        uid: config.BEMFA_CLIENT_ID,
        type: 1
      }
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

/**
 * 创建主题
 * @param topic 主题
 * @returns code: { "0": "成功" }
 */
export async function addTopic(topic: string, name?: string): Promise<TResponse<any>> {
  try {
    const res = await axios.post('https://pro.bemfa.com/v1/addtopic', {
      uid: config.BEMFA_CLIENT_ID,
      topic,
      name,
      type: 1
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

/**
 * 删除主题
 * @param topic 主题
 * @returns code: { "0": "成功" }
 */
export async function delTopic(topic: string): Promise<TResponse<any>> {
  try {
    const res = await axios.post('https://pro.bemfa.com/v1/deltopic', {
      uid: config.BEMFA_CLIENT_ID,
      topic,
      type: 1
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}
