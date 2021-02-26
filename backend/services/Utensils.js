import { Utensil } from "../db"
import Router from "koa-router"

const router = new Router({ prefix: "/utensils" })

router.post("/", async (ctx) => {
  ctx.body = await Utensil.create({
    ...ctx.request.body,
    user: ctx.state.user.id
  })
})

router.get("/", async (ctx) => {
  ctx.body = await Utensil.find({ user: ctx.state.user.id })
})

router.get("/:id", async (ctx) => {
  ctx.body = await Utensil.find({
    _id: ctx.params.id,
    user: ctx.state.user.id
  })
})

router.put("/:id", async (ctx) => {
  ctx.body = await Utensil.findOneAndUpdate(
    { _id: ctx.params.id, user: ctx.state.user.id },
    ctx.request.body,
    { new: true }
  )
})

router.delete("/:id", async (ctx) => {
  ctx.body = await Utensil.findOneAndDelete({
    _id: ctx.params.id,
    user: ctx.state.user.id
  })
})

export default router.routes()
