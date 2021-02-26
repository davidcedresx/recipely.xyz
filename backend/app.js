import {
  Auth,
  User,
  Ingredients,
  Utensils,
  Recipes,
  IngredientUsages,
  UtensilUsages
} from "./services"
import { connect } from "./db"
import cors from "@koa/cors"
import dotenv from "dotenv"
import Koa from "koa"
import koaBody from "koa-body"
import koaJwt from "koa-jwt"
import logger from "koa-logger"

dotenv.config()

const app = new Koa()

app.use(koaBody({ multipart: true }))
app.use(logger())

if (process.env.NODE_ENV === "development") {
  app.use(cors())
}

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.throw(400, error)
  }
})

app.use(Auth)
app.use(koaJwt({ secret: process.env.SECRET }))

app.use(User)
app.use(Recipes)
app.use(Ingredients)
app.use(Utensils)
app.use(IngredientUsages)
app.use(UtensilUsages)

connect()

export const server = app.listen(process.env.PORT)
