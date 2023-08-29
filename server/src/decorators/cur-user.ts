import { createParamDecorator } from 'koast'

const CurUser = createParamDecorator(ctx => {
  return ctx.state.curUser
})

export default CurUser
