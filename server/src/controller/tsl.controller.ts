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
import tslModel from '@/model/tsl.model'
import ResultUtils from '@/utils/result-utils'
import type { TTSL } from '@/model/tsl.model'

@Controller('/tsl')
export default class Tsl {
  @Get('/page')
  async page(@Query() query: any) {
    const { page, size } = query
    const res = await tslModel.page(page, size)
    return ResultUtils.success(res)
  }

  @Get('/list')
  async list(@Query() query: any) {
    const { product_id } = query
    const res = await tslModel.list(product_id)
    return ResultUtils.success(res)
  }

  @Post('/add')
  async add(@Body() body: TTSL) {
    const r = await tslModel.insert(body)
    return ResultUtils.success(r)
  }

  @Post('/edit')
  async edit(@Body() body: TTSL) {
    const tsl = await tslModel.getById(body.tsl_id)
    if (!tsl) {
      return ResultUtils.badRequest('tsl not exist')
    }
    const r = await tslModel.updateById(body.tsl_id, body)
    return ResultUtils.success(r)
  }

  @Post('/del')
  async del(@Body() body: Pick<TTSL, 'tsl_id'>) {
    const tsl = await tslModel.getById(body.tsl_id)
    if (!tsl) {
      return ResultUtils.badRequest('tsl not exist')
    }
    const result = await tslModel.deleteById(tsl.tsl_id)
    return ResultUtils.success(result)
  }
}
