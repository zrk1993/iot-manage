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
import otaModel from '@/model/ota.model'
import ResultUtils from '@/utils/result-utils'
import type { TOta } from '@/model/ota.model'
import uuid from '@/utils/uuid'
import * as OtaService from '@/service/ota.service'

@Controller('/ota')
export default class Ota {
  @Get('/update/:id')
  @Description('get 参数')
  async hi(@Ctx() ctx: Context) {
    // 304 noupdate, 200
    const currentVersion = ctx.header['x-ESP8266-version']
    const freeSpace = ctx.header['x-ESP8266-free-space']
    const sketchSize = ctx.header['x-ESP8266-sketch-size']
    const id = ctx.params.id
  }

  @Post('/create')
  async create(@Body() body: any) {
    const { firmware_id, device_ids } = body
    const batch_no = uuid()
    const d = device_ids.map((v: number) => {
      return {
        batch_no,
        firmware_id,
        device_id: v
      }
    })
    const res = await otaModel.insert(d)
    return ResultUtils.success(res)
  }

  @Get('/page')
  async page(@Query() query: any) {
    const { page, size } = query
    const res = await otaModel.page(page, size)
    return ResultUtils.success(res)
  }

  @Get('/list')
  async list(@Query() query: any) {
    const { firmware_id } = query
    const res = await otaModel.list(firmware_id)
    return ResultUtils.success(res)
  }

  @Post('/add')
  async add(@Body() body: TOta) {
    const r = await otaModel.insert(body)
    return ResultUtils.success(r)
  }

  @Post('/edit')
  async edit(@Body() body: TOta) {
    const r = await otaModel.updateById(body.ota_id, body)
    return ResultUtils.success(r)
  }

  @Post('/del')
  async del(@Body() body: Pick<TOta, 'ota_id'>) {
    const ota = await otaModel.getById(body.ota_id)
    if (!ota) {
      return ResultUtils.badRequest('ota not exist')
    }
    const result = await otaModel.deleteById(ota.ota_id)
    return ResultUtils.success(result)
  }

  @Post('/device/upgrade')
  async upgrade(@Body() body: Pick<TOta, 'ota_id'>) {
    OtaService.informDevice(body.ota_id)
    return ResultUtils.success()
  }
}
