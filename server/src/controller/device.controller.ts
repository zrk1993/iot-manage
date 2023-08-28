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
import uuid from '../utils/uuid'
import ResultUtils from '../utils/result-utils'
import * as deviceService from '../service/device.service'

@Controller('/device')
export default class Device {
  @Get('/list')
  async list(@Query() query: any) {
    const { page, size } = query
    const res = await deviceModel.getPage()
    res.forEach(v => {
      v.product_type_name = products.find(p => p.type == v.product_type).name
    })
    return ResultUtils.success(res)
  }

  @Post('/add')
  @BodySchame({
    name: joi.string().required(),
    product_type: joi.string().required()
  })
  async add(@Body() body: TDevice) {
    body.id = uuid()
    body.create_time = new Date()
    const r = await deviceModel.insert(body)
    return ResultUtils.success(r)
  }

  @Post('/edit')
  async edit(@Body() body: TDevice) {
    const r = await deviceModel.updateById(body.id, body)
    return ResultUtils.success(r)
  }

  @Get('/info')
  @QuerySchame({
    id: joi.string().required()
  })
  async info(@Query() query: Pick<TDevice, 'id'>) {
    const device = await deviceModel.getById(query.id)
    if (!device) return { code: 5000, message: '设备不存在！' }
    device.product_type_name = products.find(p => p.type == device.product_type)?.name
    return ResultUtils.success(device)
  }

  @Post('/subscribebemfa')
  @BodySchame({
    id: joi.string().required(),
    flag: joi.number().required()
  })
  async subscribebemfa(@Body() body: any) {
    if (body.flag) {
      await deviceService.subscribeBemfa(body.id)
    } else {
      await deviceService.unsubscribeBemfa(body.id)
    }
    return ResultUtils.success()
  }

  @Post('/del')
  @BodySchame({
    id: joi.string().required()
  })
  async del(@Body() body: Pick<TDevice, 'id'>) {
    const device = await deviceModel.getById(body.id)
    if (!device) return { code: 5000 }
    if (device.bemfa_iot) {
      await deviceService.unsubscribeBemfa(device.id)
    }
    const result = await deviceModel.deleteById(device.id)
    return ResultUtils.success(result)
  }
}
