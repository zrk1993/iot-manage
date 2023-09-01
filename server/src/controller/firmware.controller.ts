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
import firmwareModel from '@/model/firmware.model'
import ResultUtils from '@/utils/result-utils'
import type { TFirmware } from '@/model/firmware.model'

@Controller('/firmware')
export default class Firmware {
  @Get('/page')
  async page(@Query() query: any) {
    const { page, size } = query
    const res = await firmwareModel.page(page, size)
    return ResultUtils.success(res)
  }

  @Get('/list')
  async list(@Query() query: any) {
    const res = await firmwareModel.getAll()
    return ResultUtils.success(res)
  }

  @Post('/add')
  async add(@Body() body: TFirmware) {
    const r = await firmwareModel.insert(body)
    return ResultUtils.success(r)
  }

  @Post('/edit')
  async edit(@Body() body: TFirmware) {
    const firmware = await firmwareModel.getById(body.firmware_id)
    if (!firmware) {
      return ResultUtils.badRequest('firmware not exist')
    }
    const r = await firmwareModel.updateById(body.firmware_id, body)
    return ResultUtils.success(r)
  }

  @Post('/del')
  async del(@Body() body: Pick<TFirmware, 'firmware_id'>) {
    const firmware = await firmwareModel.getById(body.firmware_id)
    if (!firmware) {
      return ResultUtils.badRequest('firmware not exist')
    }
    const result = await firmwareModel.deleteById(firmware.firmware_id)
    return ResultUtils.success(result)
  }
}
