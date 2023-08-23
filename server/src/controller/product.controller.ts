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
import products from '../constant/products'

@Controller('/product')
export default class Product {
  @Get('/list')
  async list(@Query() query: any) {
    return { code: 0, data: products }
  }
}
