import { User } from "../db"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import Router from "koa-router"

const auth = new Router({ prefix: "/auth" })

auth.post("/signup", async (ctx) => {
  const { password, username } = ctx.request.body
  const user = new User({
    username,
    password: bcrypt.hashSync(password, +process.env.SALT)
  })
  await user.save()
  ctx.body = {
    token: jsonwebtoken.sign({ id: user._id }, process.env.SECRET)
  }
})

auth.post("/signin", async (ctx) => {
  const { username, password } = ctx.request.body

  if (!username) throw new Error("username missing")
  if (!password) throw new Error("password missing")

  const user = await User.findOne({ username })
  if (!user) throw new Error("User not found")

  const ok = bcrypt.compareSync(password, user.password)
  if (!ok) throw new Error("Wrong passsword")

  ctx.body = {
    token: jsonwebtoken.sign({ id: user._id }, process.env.SECRET)
  }
})

export default auth.routes()
