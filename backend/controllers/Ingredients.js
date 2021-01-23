import Router from 'koa-router'
import { Ingredient } from '../db'

const ingredients = new Router({ prefix: '/ingredients' })

ingredients.post('/', async (ctx) => {
    const { name, price } = ctx.request.body

    if (!name || !price) throw new Error('name and price are required')

    const ingredient = await Ingredient.create({
        name,
        price,
        user: ctx.state.user.id,
    })

    ctx.body = ingredient
})

ingredients.get('/', async (ctx) => {
    ctx.body = await Ingredient.find({ user: ctx.state.user.id })
    /**
     * .populate({
        path: 'presentations',
        populate: { path: 'unit' },
    })
     */
})

ingredients.get('/:id', async (ctx) => {
    ctx.body = await Ingredient.find({
        _id: ctx.params.id,
        user: ctx.state.user.id,
    })
})

ingredients.put('/:id', async (ctx) => {
    const ingredient = await Ingredient.findOneAndUpdate(
        { _id: ctx.params.id, user: ctx.state.user.id },
        ctx.request.body,
        { new: true }
    )
    if (!ingredient) throw new Error('ingredient not found')

    ctx.body = ingredient
})

ingredients.delete('/:id', async (ctx) => {
    const ingredient = await Ingredient.findOneAndDelete({
        _id: ctx.params.id,
        user: ctx.state.user.id,
    })
    if (!ingredient) throw new Error('ingredient not found')

    ctx.body = ingredient
})

export default ingredients.routes()
