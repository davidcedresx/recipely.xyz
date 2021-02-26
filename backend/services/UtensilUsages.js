import { UtensilUsage, Utensil, Recipe } from "../db"
import Router from "koa-router"

const router = new Router({ prefix: "/utensil-usages" })

router.post("/", async (ctx) => {
  validate(ctx)

  ctx.body = await UtensilUsage.create({
    ...ctx.request.body,
    user: ctx.state.user.id
  })
})

router.get("/", async (ctx) => {
  ctx.body = await UtensilUsage.find()
})

router.get("/:id", async (ctx) => {
  ctx.body = await UtensilUsage.find({
    _id: ctx.params.id,
    user: ctx.state.user.id
  })
})

router.put("/:id", async (ctx) => {
  validate(ctx)

  ctx.body = await UtensilUsage.findOneAndUpdate(
    { _id: ctx.params.id, user: ctx.state.user.id },
    ctx.request.body,
    { new: true }
  )
})

router.delete("/:id", async (ctx) => {
  ctx.body = await UtensilUsage.findOneAndDelete({
    _id: ctx.params.id,
    user: ctx.state.user.id
  })
})

export default router.routes()

// a user can only create / put an usage between utensil and recipe of his ownership
async function validate(ctx) {
  if (
    !(await Utensil.findOne({
      _id: ctx.request.body.utensil,
      user: ctx.state.user.id
    }))
  )
    throw new Error("invalid utensil")

  if (
    !(await Recipe.findOne({
      _id: ctx.request.body.recipe,
      user: ctx.state.user.id
    }))
  )
    throw new Error("invalid recipe")
}
