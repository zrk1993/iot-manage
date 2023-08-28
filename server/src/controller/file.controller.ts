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

import fs from 'fs'
import path from 'path'

const send = require('koa-send')
const multer = require('@koa/multer')

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, './upload')
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
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
