import {
  Controller,
  Get,
  Post,
  Use,
  Query,
  Body,
  Ctx,
  Context,
  Description,
  joi,
  QuerySchame,
  BodySchame
} from 'koast'
import type { TDevice } from '../model/device.model'
import deviceModel from '../model/device.model'
import products from '../constant/products'
import { addTopic, delTopic } from '../api/bemfa'
import uuid from '../utils/uuid'

@Controller('/device')
export default class Device {
  @Get('/list')
  async list(@Query() query: any) {
    const { page, size } = query
    const res = await deviceModel.getPage()
    return { code: 0, data: res }
  }

  @Post('/add')
  @BodySchame({
    name: joi.string().required(),
    product_type: joi.string().required(),
    bemfa_iot: joi.string().required()
  })
  async add(@Body() body: TDevice) {
    body.id = uuid()
    if (body.bemfa_iot == 1) {
      body.bemfa_topic = body.id + products.find(v => v.type === body.product_type).code
      const res = await addTopic(body.bemfa_topic, body.name)
      if (res.code !== 0) {
        return res
      }
    }
    const r = await deviceModel.insert(body)
    return { code: 0, data: r }
  }

  @Post('/edit')
  async edit(@Body() body: TDevice) {
    const r = await deviceModel.updateById(body.id, body)
    return { code: 0, data: r }
  }

  @Post('/del')
  @BodySchame({
    id: joi.string().required()
  })
  async del(@Body() body: Pick<TDevice, 'id'>) {
    const device = await deviceModel.getById(body.id)
    if (!device) return { code: 5000 }
    if (device.bemfa_iot == 1) {
      const res = await delTopic(device.bemfa_topic)
      if (res.code != 0) {
        return res
      }
    }
    const result = await deviceModel.deleteById(device.id)
    return { code: 0, data: result }
  }
}
