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
import * as userModel from '../model/user.model'
import { generateToken, verifyToken } from '../utils/auth-jwt'

@Controller('/user')
export default class User {
  @Post('/info')
  @BodySchame({
    username: joi.string().required(),
    password: joi.string().required()
  })
  async info(@Ctx() ctx: Context) {
    const { Authorization } = ctx.headers
    const username = verifyToken(Authorization as string)
    const user = await userModel.getUserByName(username)
    if (!user) {
      return { code: 5001, message: '请重新登录' }
    }
    return { code: 0, data: { username: user.username } }
  }

  @Post('/login')
  @BodySchame({
    username: joi.string().required(),
    password: joi.string().required()
  })
  async login(@Body() body: any) {
    const { username, password } = body
    const user = await userModel.getUserByName(username)
    if (!user || user.password != password) {
      return { code: 5000, message: '用户名或密码错误！' }
    }
    return { code: 0, data: generateToken(user.username) }
  }
}
