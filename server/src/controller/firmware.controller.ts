import {
  joi,
  Use,
  Context,
  createParamDecorator,
  Controller,
  Description,
  Get,
  QuerySchame,
  Ctx,
  Query,
  Post,
  Body,
  BodySchame
} from 'koast'

@Controller('/firmware')
export default class firmware {
  @Get('/update/:id')
  @Description('get 参数')
  async hi(@Ctx() ctx: Context) {
    // 304 noupdate, 200
    const currentVersion = ctx.header['x-ESP8266-version']
    const freeSpace = ctx.header['x-ESP8266-free-space']
    const sketchSize = ctx.header['x-ESP8266-sketch-size']
    const id = ctx.params.id
  }

  @Post('/test2')
  @BodySchame({
    username: joi.string().required(),
    password: joi.string().required()
  })
  changeName(@Body() body: any) {
    return { code: 0, data: body }
  }
}
