import mongoose from 'mongoose'

// prepare two possible database uris
const development_uri = 'mongodb://localhost:27017/recipely'
const production_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`

// database
mongoose.connect(
    process.env.NODE_ENV === 'production' ? production_uri : development_uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

mongoose.set('useCreateIndex', true)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('connection stablished'))

// schemas
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
})

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    user: { type: mongoose.ObjectId, required: true },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

RecipeSchema.virtual('usages', {
    ref: 'Usage',
    localField: '_id',
    foreignField: 'recipe'
})

const IngredientSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    user: { type: mongoose.ObjectId, required: true },
})

const UsageSchema = new mongoose.Schema({
    user: { type: mongoose.ObjectId, required: true },
    recipe: { type: mongoose.ObjectId, required: true },
    ingredient: { type: mongoose.ObjectId, required: true },
})

// models
export const User = mongoose.model('User', UserSchema)
export const Recipe = mongoose.model('Recipe', RecipeSchema)
export const Ingredient = mongoose.model('Ingredient', IngredientSchema)
export const Usage = mongoose.model('Usage', UsageSchema)
