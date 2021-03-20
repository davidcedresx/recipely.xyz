// enums
enum Unit {
    Up = 1,
    Down,
    Left,
    Right,
}

// models
export interface User {
    username: string
    password: string
    profit: number
}

export interface Utensil {
    name: string
    price: number
    amount: number
}

export interface Ingredient {
    name: string
    price: number
    amount: number
    unit: Unit
}

export interface Recipe {
    name: string
}

// usages
export interface Usage {
    recipe: string
    ingredient: string
}

export interface UtensilUsage {
    recipe: string
    utensil: string
    amount: number
}

export interface IngredientUsage {
    recipe: string
    ingredient: string
    amount: number
    unit: Unit
}
