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
import tslDataModel from '@/model/tsl_data.model'
import type { TTSL_DATA } from '@/model/tsl_data.model'
import ResultUtils from '@/utils/result-utils'

@Controller('/firmware')
export default class Firmware {
  @Get('/page')
  async page(@Query() query: any) {
    const { page, size } = query
    const res = await tslDataModel.page(page, size)
    return ResultUtils.success(res)
  }

  @Get('/list')
  async list(@Query() query: any) {
    const res = await tslDataModel.getAll()
    return ResultUtils.success(res)
  }
}
