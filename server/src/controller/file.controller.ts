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

import dayjs from 'dayjs'
import path from 'path'

const send = require('koa-send')
const multer = require('@koa/multer')

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
      cb(null, './upload/image')
    } else if ('application/macbinary' == file.mimetype) {
      cb(null, './upload/bin')
    } else {
      cb(new Error('mimetype not allow'))
    }
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = dayjs().format('YYMMDD_HHmmss') + '_' + Math.round(Math.random() * 1e3)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

@Controller('/file')
export default class Fl {
  @Post('/upload')
  @Use(multer({ storage }).single('file'))
  async upload(@Ctx() ctx: Context) {
    return { code: 0, data: ctx.file.filename }
  }

  @Get('/:id')
  async file(@Ctx() ctx: Context) {
    await send(ctx, './upload/' + ctx.params.id)
  }
}
