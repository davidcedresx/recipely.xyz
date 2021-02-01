import { Recipe } from "../db"
import Router from "koa-router"

const recipes = new Router({ prefix: "/recipes" })

recipes.post("/", async (ctx) => {
  ctx.body = await Recipe.create({
    ...ctx.request.body,
    user: ctx.state.user.id
  })
})

recipes.get("/", async (ctx) => {
  ctx.body = await Recipe.find({ user: ctx.state.user.id }).populate({
    path: 'usages'
  })
})

// recipes.get("/:id", async (ctx) => {
//   ctx.body = await Recipe.find({
//     _id: ctx.params.id,
//     user: ctx.state.user.id
//   })
// })

recipes.put("/:id", async (ctx) => {
  ctx.body = await Recipe.findOneAndUpdate(
    { _id: ctx.params.id, user: ctx.state.user.id },
    ctx.request.body,
    { new: true }
  )
})

recipes.delete("/:id", async (ctx) => {
  ctx.body = await Recipe.findOneAndDelete({
    _id: ctx.params.id,
    user: ctx.state.user.id
  })
})

export default recipes.routes()
