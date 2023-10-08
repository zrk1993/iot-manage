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
import productModel from '@/model/product.model'
import ResultUtils from '@/utils/result-utils'
import randomString from '@/utils/random-string'
import type { TProduct } from '@/model/product.model'

@Controller('/product')
export default class Product {
  @Get('/info')
  @QuerySchame({
    product_id: joi.string().required()
  })
  async info(@Query() query: Pick<TProduct, 'product_id'>) {
    const product = await productModel.getById(query.product_id)
    if (!product) return { code: 5000, message: '产品不存在！' }
    return ResultUtils.success(product)
  }

  @Get('/page')
  async page(@Query() query: any) {
    const { page, size } = query
    const res = await productModel.page(page, size)
    return ResultUtils.success(res)
  }

  @Get('/list')
  async list(@Query() query: any) {
    const res = await productModel.getAll()
    return ResultUtils.success(res)
  }

  @Post('/add')
  async add(@Body() body: TProduct) {
    const product_key = randomString(10)
    const r = await productModel.insert({
      product_key,
      ...body
    })
    return ResultUtils.success(r)
  }

  @Post('/edit')
  async edit(@Body() body: TProduct) {
    const r = await productModel.updateById(body.product_id, body)
    return ResultUtils.success(r)
  }

  @Post('/del')
  async del(@Body() body: Pick<TProduct, 'product_id'>) {
    const device = await productModel.getById(body.product_id)
    if (!device) {
      return ResultUtils.badRequest('product not exist')
    }
    const result = await productModel.deleteById(device.product_id)
    return ResultUtils.success(result)
  }
}
