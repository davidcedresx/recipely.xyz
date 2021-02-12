import { User } from "../db"
import Router from "koa-router"

const users = new Router({ prefix: "/user" })

users.get("/", async (ctx) => {
  ctx.body = await User.findById(
    ctx.state.user.id, 'username profit'
  )

  delete ctx.body.password
})

users.put("/", async (ctx) => {
  // forbid changing password
  delete ctx.request.body.password

  ctx.body = await User.findOneAndUpdate(
    { _id: ctx.state.user.id },
    ctx.request.body,
    { new: true }
  )
})

users.delete("/:id", async (ctx) => {
  ctx.body = await User.findOneAndDelete({
    _id: ctx.state.user.id,
  })
})

export default users.routes()
