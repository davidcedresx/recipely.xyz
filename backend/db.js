import mongoose from "mongoose"

// prepare two possible database uris
const development_uri = "mongodb://localhost:27017/recipely"
const production_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`

// database
mongoose.connect(
  process.env.NODE_ENV === "production" ? production_uri : development_uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

mongoose.set("useCreateIndex", true)

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => console.log("connection stablished"))

// schemas
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
})

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  presentations: [
    {
      price: { type: Number, required: true },
      amount: { type: Number, required: true },
      unit: { type: String, required: true }
    }
  ],
  user: { type: mongoose.ObjectId, required: true }
})

const RecipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    user: { type: mongoose.ObjectId, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

RecipeSchema.virtual("usages", {
  ref: "Usage",
  localField: "_id",
  foreignField: "recipe"
})

RecipeSchema.virtual('price').get(async function() {
  console.log('calculating price for recipe', this.name)
  return 99.99
})

const UsageSchema = new mongoose.Schema({
  recipe: { type: mongoose.ObjectId, required: true, ref: 'Recipe' },
  ingredient: { type: mongoose.ObjectId, required: true, ref: 'Ingredient' },
  amount: { type: Number, required: true },
  unit: { type: String, required: true }
})

// models
export const User = mongoose.model("User", UserSchema)
export const Ingredient = mongoose.model("Ingredient", IngredientSchema)
export const Recipe = mongoose.model("Recipe", RecipeSchema)
export const Usage = mongoose.model("Usage", UsageSchema)
