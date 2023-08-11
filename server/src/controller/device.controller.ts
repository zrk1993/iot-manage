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
import * as deviceModel from '../model/device.model'

@Controller('/device')
export default class Device {
  @Get('/list')
  async list(@Query() query: any) {
    const { page, size } = query
    const res = await deviceModel.page({ page, size })
    return { code: 0, data: res }
  }

  @Post('/add')
  @BodySchame({
    username: joi.string().required(),
    password: joi.string().required()
  })
  async login(@Body() body: any) {}
}
