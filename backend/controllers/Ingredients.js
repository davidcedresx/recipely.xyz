import { Ingredient } from "../db"
import Router from "koa-router"

const ingredients = new Router({ prefix: "/ingredients" })

ingredients.post("/", async (ctx) => {
  ctx.body = await Ingredient.create({
    ...ctx.request.body,
    user: ctx.state.user.id
  })
})

ingredients.get("/", async (ctx) => {
  ctx.body = await Ingredient.find({ user: ctx.state.user.id })
})

ingredients.get("/:id", async (ctx) => {
  ctx.body = await Ingredient.find({
    _id: ctx.params.id,
    user: ctx.state.user.id
  })
})

ingredients.put("/:id", async (ctx) => {
  ctx.body = await Ingredient.findOneAndUpdate(
    { _id: ctx.params.id, user: ctx.state.user.id },
    ctx.request.body,
    { new: true }
  )
})

ingredients.delete("/:id", async (ctx) => {
  ctx.body = await Ingredient.findOneAndDelete({
    _id: ctx.params.id,
    user: ctx.state.user.id
  })
})

export default ingredients.routes()
