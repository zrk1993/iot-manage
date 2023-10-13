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
import type { TDevice } from '@/model/device.model'
import deviceModel from '@/model/device.model'
import tslModel from '@/model/tsl.model'
import ResultUtils from '@/utils/result-utils'
import cache from '@/utils/cache'
import * as deviceService from '@/service/device.service'

@Controller('/device')
export default class Device {
  @Get('/suggestDeviceKey')
  async suggestDeviceKey(@Query() query: any) {
    return ResultUtils.success(cache.suggestDeviceKey)
  }

  @Get('/list')
  async list(@Query() query: any) {
    const { page, size } = query
    const res = await deviceModel.page(page, size)
    return ResultUtils.success(res)
  }

  @Post('/add')
  @BodySchame({
    product_id: joi.number().required(),
    device_name: joi.string().required(),
    device_key: joi.string().required()
  })
  async add(@Body() body: TDevice) {
    const r = await deviceModel.insert(body)
    return ResultUtils.success(r)
  }

  @Post('/edit')
  async edit(@Body() body: TDevice) {
    const device = await deviceModel.getById(body.device_id)
    if (!device) {
      return ResultUtils.badRequest('device not exist')
    }
    const r = await deviceModel.updateById(body.device_id, body)
    return ResultUtils.success(r)
  }

  @Get('/info')
  @QuerySchame({
    device_id: joi.string().required()
  })
  async info(@Query() query: Pick<TDevice, 'device_id'>) {
    const device = await deviceModel.getById(query.device_id)
    if (!device) return { code: 5000, message: '设备不存在！' }
    return ResultUtils.success(device)
  }

  @Post('/subscribebemfa')
  @BodySchame({
    device_id: joi.string().required(),
    flag: joi.number().required()
  })
  async subscribebemfa(@Body() body: any) {
    if (body.flag) {
      await deviceService.subscribeBemfa(body.device_id)
    } else {
      await deviceService.unsubscribeBemfa(body.device_id)
    }
    return ResultUtils.success()
  }

  @Post('/del')
  @BodySchame({
    device_id: joi.number().required()
  })
  async del(@Body() body: Pick<TDevice, 'device_id'>) {
    const device = await deviceModel.getById(body.device_id)
    if (!device) return { code: 5000 }
    // if (device.bemfa_iot) {
    //   await deviceService.unsubscribeBemfa(device.device_id)
    // }
    const result = await deviceModel.deleteById(device.device_id)
    return ResultUtils.success(result)
  }

  @Get('/tsl/property')
  async property(@Query() query: any) {
    const { device_id } = query
    const res = await tslModel.deviceProperty(device_id)
    return ResultUtils.success(res)
  }

  @Get('/tsl/data')
  async event(@Query() query: any) {
    const { device_id, page = 1, size = 10 } = query
    const res = await tslModel.tslData({ device_id, page, size })
    return ResultUtils.success(res)
  }
}
