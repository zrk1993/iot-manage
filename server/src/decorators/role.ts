/**
 * @Author: kun
 * @Date: 2019-10
 */

import { Use, Description, Context } from 'koast'
import { verify } from '@/middleware/app-jwt'

export default function Role(...roles: string[]) {
  const role = Use(async (ctx: Context, next: () => Promise<void>) => {
    const signData = await verify(ctx)
    ctx.state.curUser = signData
    // const sql = `
    //   SELECT R.code FROM role R
    //   LEFT JOIN user_roles UR ON UR.role_id = R.id
    //   WHERE UR.user_id = ?
    // `;
    // const userRoles = await db.query(sql, [signData.id]);
    // if (roles.some(r => userRoles.find(ur => ur.code === r))) {
    //   next();
    // } else {
    //   throw new Error('no authorization!');
    // }

    await next()
  })

  const description = Description(`【${roles.join()}】`)

  return (target: any, propertyKey?: string) => {
    role(target, propertyKey)
    description(target, propertyKey)
  }
}
