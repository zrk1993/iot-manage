import {
  joi,
  Use,
  Context,
  createParamDecorator,
  Controller,
  Description,
  Get,
  QuerySchame,
  Ctx,
  Query,
  Post,
  Body,
  BodySchame
} from 'koast'
import { allTopic } from '@/mqtt/topics'
import deviceModel from '@/model/device.model'
import ResultUtils from '@/utils/result-utils'
import topics from '@/mqtt/topics'
import { getcClients } from '@/mqtt/broker'
import { getClientId, parseClientId } from '@/utils/mtqq-tool'

@Controller('/mqtt')
@Description('MQTT')
export default class Mqtt {
  @Get('/topics')
  async topics() {
    return ResultUtils.success(topics)
  }

  @Get('/device/subscriptions')
  async subscriptions(@Query() query: any) {
    const { device_id } = query
    const device = await deviceModel.getById(device_id)
    const client: any = getcClients().find(v => v.id === getClientId(device))
    if (!client) {
      return ResultUtils.success([])
    }
    const subscriptions = Object.keys(client.subscriptions || {})
    const res = subscriptions.map(v => {
      const t = v.replace(client.id, '${productKey}/${deviceKey}')
      const a = allTopic.find(v => v.topic == t)
      return {
        topic: v,
        desc: a?.desc || '未定义'
      }
    })
    return ResultUtils.success(res)
  }
}
