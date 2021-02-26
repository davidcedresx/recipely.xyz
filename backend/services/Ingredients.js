import { Ingredient } from "../db"
import Router from "koa-router"

const router = new Router({ prefix: "/ingredients" })

router.post("/", async (ctx) => {
  ctx.body = await Ingredient.create({
    ...ctx.request.body,
    user: ctx.state.user.id
  })
})

router.get("/", async (ctx) => {
  ctx.body = await Ingredient.find({ user: ctx.state.user.id })
})

router.put("/:id", async (ctx) => {
  ctx.body = await Ingredient.findOneAndUpdate(
    { _id: ctx.params.id, user: ctx.state.user.id },
    ctx.request.body,
    { new: true }
  )
})

router.delete("/:id", async (ctx) => {
  ctx.body = await Ingredient.findOneAndDelete({
    _id: ctx.params.id,
    user: ctx.state.user.id
  })
})

export default router.routes()
