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

import ResultUtils from '@/utils/result-utils'
import topics from '@/mqtt/topics'

@Controller('/mqtt')
@Description('MQTT')
export default class Mqtt {
  @Get('/topics')
  async hi() {
    return ResultUtils.success(topics)
  }
}
