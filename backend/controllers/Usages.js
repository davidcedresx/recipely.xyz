import { Usage } from "../db"
import Router from "koa-router"

const usages = new Router({ prefix: "/usages" })

// todo: check that ingredient are recipe belong to user
usages.post("/", async (ctx) => {
  ctx.body = await Usage.create({
    ...ctx.request.body
  })
})

// DEBUG -- BEGIN

usages.get("/", async (ctx) => {
  ctx.body = await Usage.find()
})

// usages.get("/:id", async (ctx) => {
//   ctx.body = await Usage.find({
//     _id: ctx.params.id,
//     user: ctx.state.user.id
//   })
// })

// usages.put("/:id", async (ctx) => {
//   ctx.body = await Usage.findOneAndUpdate(
//     { _id: ctx.params.id, user: ctx.state.user.id },
//     ctx.request.body,
//     { new: true }
//   )
// })

// DEBUG -- END

// todo: check that ingredient are recipe belong to user
usages.delete("/:id", async (ctx) => {
  ctx.body = await Usage.findOneAndDelete({
    _id: ctx.params.id
  })
})

export default usages.routes()
