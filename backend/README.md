# Recipely Backend

REST api powered by Node, koa and mongoose

## Resources

- Ingredient
  An ingredient is the base of all recipes, it can have many presentations

- Presentation
  Is a buying choice for a given ingredient, it has a price, amount and unit

- Usage
  Links an ingredient with the recipes who use it
  Links a recipe with the ingredients it uses
  It also includes an amount and unit that the recipe requires

- Recipe
  Has a name

# Deploy to heroku

    git subtree push --prefix api heroku master
