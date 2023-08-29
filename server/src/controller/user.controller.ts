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
import userModel from '../model/user.model'
import CurUser from '../decorators/cur-user'
import ResultUtils from '../utils/result-utils'
import * as appJwt from '../middleware/app-jwt'

@Controller('/user')
export default class User {
  @Get('/info')
  async info(@CurUser() curUser: any) {
    const user = await userModel.getUserByName(curUser.username)
    return ResultUtils.success(user)
  }

  @Post('/login')
  @BodySchame({
    username: joi.string().required(),
    password: joi.string().required()
  })
  async login(@Body() body: any, @Ctx() ctx: Context) {
    const { username, password } = body
    const user = await userModel.getUserByName(username)
    if (!user || user.password != password) {
      return ResultUtils.badRequest('账号或密码错误')
    }
    const token = appJwt.sign({
      id: user.id,
      username: user.username
    })
    ctx.cookies.set('authorization', token)
    return ResultUtils.success({ token })
  }

  @Post('/logout')
  @Description('退出')
  async logout(@Ctx() ctx: Context) {
    ctx.cookies.set('authorization', '')
    return ResultUtils.success()
  }

  @Post('/password')
  @Description('修改密码')
  async password(@CurUser() curUser: any, @Body() body: any) {
    const user = await userModel.getUserByName(curUser.username)
    // todo
    return ResultUtils.success()
  }
}
