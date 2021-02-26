import { User } from "../db"
import Router from "koa-router"

const router = new Router({ prefix: "/user" })

router.get("/", async (ctx) => {
  ctx.body = await User.findById(ctx.state.user.id, "username profit")

  delete ctx.body.password
})

router.put("/", async (ctx) => {
  // forbid changing password
  delete ctx.request.body.password

  ctx.body = await User.findOneAndUpdate(
    { _id: ctx.state.user.id },
    ctx.request.body,
    { new: true }
  )
})

router.delete("/:id", async (ctx) => {
  ctx.body = await User.findOneAndDelete({
    _id: ctx.state.user.id
  })
})

export default router.routes()
