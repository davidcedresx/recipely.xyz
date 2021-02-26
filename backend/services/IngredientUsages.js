import { IngredientUsage, Ingredient, Recipe } from "../db"
import Router from "koa-router"

const router = new Router({ prefix: "/ingredient-usages" })

router.post("/", async (ctx) => {
  validate(ctx)

  ctx.body = await IngredientUsage.create({
    ...ctx.request.body,
    user: ctx.state.user.id
  })
})

router.get("/", async (ctx) => {
  ctx.body = await IngredientUsage.find({ user: ctx.state.user.id })
})

router.put("/:id", async (ctx) => {
  validate(ctx)

  ctx.body = await IngredientUsage.findOneAndUpdate(
    { _id: ctx.params.id, user: ctx.state.user.id },
    ctx.request.body,
    {
      new: true
    }
  )
})

router.delete("/:id", async (ctx) => {
  ctx.body = await IngredientUsage.findOneAndDelete({
    _id: ctx.params.id,
    user: ctx.state.user.id
  })
})

export default router.routes()

// a user can only create / put an usage between ingredient and recipes of his ownership
async function validate(ctx) {
  if (
    !(await Ingredient.findOne({
      _id: ctx.request.body.ingredient,
      user: ctx.state.user.id
    }))
  )
    throw new Error("invalid ingredient")

  if (
    !(await Recipe.findOne({
      _id: ctx.request.body.recipe,
      user: ctx.state.user.id
    }))
  )
    throw new Error("invalid recipe")
}
