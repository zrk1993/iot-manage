import {  Controller, Get, Post, Use, Query, Body, Ctx, Context, Description, joi, QuerySchame, BodySchame } from 'koast';

@Controller()
export default class Test {
  @Get()
  async hi(@Ctx() ctx: Context) {
    return `<h1>Hi, ${ctx.ip}</h1>`;
  }
}