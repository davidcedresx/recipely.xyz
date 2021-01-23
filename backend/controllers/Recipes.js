import Router from 'koa-router'
import { Recipe } from '../db'

const recipes = new Router({ prefix: '/recipes' })

recipes.post('/', async (ctx) => {
    const { name } = ctx.request.body

    if (!name) throw new Error('field name is required')

    const recipe = await Recipe.create({
        name,
        user: ctx.state.user.id,
    })

    ctx.body = recipe
})

recipes.get('/', async (ctx) => {
    ctx.body = await Recipe.find({ user: ctx.state.user.id }).populate('usages')
})

recipes.get('/:id', async (ctx) => {
    ctx.body = await Recipe.find({
        _id: ctx.params.id,
        user: ctx.state.user.id,
    }).populate('usages')
})

recipes.put('/:id', async (ctx) => {
    const recipe = await Recipe.findOneAndUpdate(
        { _id: ctx.params.id, user: ctx.state.user.id },
        ctx.request.body,
        { new: true }
    )
    if (!recipe) throw new Error('recipe not found')

    ctx.body = recipe
})

recipes.delete('/:id', async (ctx) => {
    const recipe = await Recipe.findOneAndDelete({
        _id: ctx.params.id,
        user: ctx.state.user.id,
    })
    if (!recipe) throw new Error('recipe not found')

    ctx.body = recipe
})

export default recipes.routes()
