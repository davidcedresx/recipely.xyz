import { Recipe } from "../db"
import Router from "koa-router"

const router = new Router({ prefix: "/recipes" })

router.post("/", async (ctx) => {
  ctx.body = await Recipe.create({
    ...ctx.request.body,
    user: ctx.state.user.id
  })
})

router.get("/", async (ctx) => {
  ctx.body = await Recipe.find({ user: ctx.state.user.id })
})

router.get("/:id", async (ctx) => {
  ctx.body = await Recipe.find({
    _id: ctx.params.id,
    user: ctx.state.user.id
  })
})

router.put("/:id", async (ctx) => {
  ctx.body = await Recipe.findOneAndUpdate(
    { _id: ctx.params.id, user: ctx.state.user.id },
    ctx.request.body,
    { new: true }
  )
})

router.delete("/:id", async (ctx) => {
  ctx.body = await Recipe.findOneAndDelete({
    _id: ctx.params.id,
    user: ctx.state.user.id
  })
})

export default router.routes()
