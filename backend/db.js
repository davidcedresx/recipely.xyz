import mongoose from "mongoose"

export const connect = () => {
  // prepare two possible database uris
  const development_uri = "mongodb://localhost:27017/recipely"
  const production_uri = [
    "mongodb+srv://",
    process.env.DB_USER +
      ":" +
      process.env.DB_PASSWORD +
      "@" +
      process.env.DB_HOST +
      "/" +
      process.env.DB_NAME,
    "?retryWrites=true&w=majority"
  ].join("")

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
}

// ########################### SCHEMAS ###################################
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profit: {
    type: Number,
    default: 0,
    min: [0, "Profit must be a natural number"]
  }
})

const UtensilSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be a natural number"]
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount must be a natural number"]
  },
  user: { type: mongoose.ObjectId, required: true }
})

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be a natural number"]
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount must be a natural number"]
  },
  unit: {
    type: String,
    required: true,
    enum: ["KG", "GR", "LT", "ML", "UNIT"]
  },
  user: { type: mongoose.ObjectId, required: true }
})

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.ObjectId, required: true }
})

const IngredientUsageSchema = new mongoose.Schema({
  recipe: { type: mongoose.ObjectId, required: true, ref: "Recipe" },
  ingredient: { type: mongoose.ObjectId, required: true, ref: "Ingredient" },
  amount: { type: Number, required: true },
  unit: { type: String, required: true },
  user: { type: mongoose.ObjectId, required: true }
})

const UtensilUsageSchema = new mongoose.Schema({
  recipe: { type: mongoose.ObjectId, required: true, ref: "Recipe" },
  utensil: { type: mongoose.ObjectId, required: true, ref: "Utensil" },
  amount: { type: Number, required: true },
  user: { type: mongoose.ObjectId, required: true }
})

// ########################### MODELS ###################################
export const User = mongoose.model("User", UserSchema)
export const Ingredient = mongoose.model("Ingredient", IngredientSchema)
export const Utensil = mongoose.model("Utensil", UtensilSchema)
export const Recipe = mongoose.model("Recipe", RecipeSchema)
export const IngredientUsage = mongoose.model(
  "IngredientUsage",
  IngredientUsageSchema
)
export const UtensilUsage = mongoose.model("UtensilUsage", UtensilUsageSchema)
