import Router from "koa-router";
import { Usage } from "../db";

const usages = new Router({ prefix: "/usages" });

usages.post("/", async (ctx) => {
  const { recipe, ingredient } = ctx.request.body;

  if (!recipe || !ingredient)
    throw new Error("recipe and ingredient are required");

  ctx.body = await Usage.create({
    recipe,
    ingredient,
    user: ctx.state.user.id,
  });
});

usages.get("/", async (ctx) => {
  ctx.body = await Usage.find({ user: ctx.state.user.id });
});

usages.get("/:id", async (ctx) => {
  ctx.body = await Usage.find({
    _id: ctx.params.id,
    user: ctx.state.user.id,
  });
});

usages.put("/:id", async (ctx) => {
  const usage = await Usage.findOneAndUpdate(
    { _id: ctx.params.id, user: ctx.state.user.id },
    ctx.request.body,
    { new: true }
  );
  if (!usage) throw new Error("usage not found");

  ctx.body = usage;
});

usages.delete("/:id", async (ctx) => {
  const usage = await Usage.findOneAndDelete({
    _id: ctx.params.id,
    user: ctx.state.user.id,
  });
  if (!usage) throw new Error("usage not found");

  ctx.body = usage;
});

export default usages.routes();
