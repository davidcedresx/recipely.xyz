import { Auth, Ingredients, Recipes, Usages, User } from "./controllers"
import { connect } from './db'
import cors from "@koa/cors"
import dotenv from "dotenv"
import Koa from "koa"
import koaBody from "koa-body"
import koaJwt from "koa-jwt"
import logger from "koa-logger"

dotenv.config()

const app = new Koa()

app.use(cors())
app.use(koaBody())
app.use(logger())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.throw(400, error)
  }
})

app.use(Auth)
app.use(koaJwt({ secret: process.env.SECRET }))

app.use(Recipes)
app.use(Ingredients)
app.use(Usages)
app.use(User)

connect()

app.listen(process.env.PORT)
