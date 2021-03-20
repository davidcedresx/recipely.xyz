const API_URL = process.env.NODE_ENV === 'production' ? 'https://api.recipely.xyz' : 'http://localhost:3000'

function getToken() {
    return localStorage.getItem('token')
}

function getHeaders() {
    return {
        Authorization: 'Bearer ' + getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
}

async function request(url: string, payload: Record<string, unknown>) {
    const response = await fetch(API_URL + url, { ...payload, headers: getHeaders(), body: JSON.stringify(payload.body) })

    if (!response.ok) {
        throw new Error(await response.text())
    }

    return await response.json()
}

export const Auth = {
    login(username: string, password: string) {
        return request(`/auth/signin`, {
            method: 'POST',
            body: { username, password },
        })
    },
    register(username: string, password: string) {
        return request(`/auth/signup`, {
            method: 'POST',
            body: { username, password },
        })
    },
}


// export const User = {
//     get() {
//         return request(`/user/`, {
//             method: 'GET'
//         })
//     },
//     update(user: Types.user) {
//         return request(`/user/`, {
//             method: 'PUT',
//             body: user
//         })
//     }
// }

// export const Ingredients = {
//     get() {
//         return request(`/ingredients`, {
//             method: 'GET',
//         })
//     },
//     create(ingredient: Types.ingredient) {
//         return request(`/ingredients/`, {
//             method: 'POST',
//             body: ingredient,
//         })
//     },
//     update(id: string, ingredient: Types.ingredient) {
//         return request(`/ingredients/${id}`, {
//             method: 'PUT',
//             body: ingredient,
//         })
//     },
//     delete(id: string) {
//         return request(`/ingredients/${id}`, {
//             method: 'DELETE',
//         })
//     },
// }

// export const Recipes = {
//     get() {
//         return request(`/recipes/`, {
//             method: 'GET',
//         })
//     },
//     create(recipe: Types.recipe) {
//         return request(`/recipes/`, {
//             method: 'POST',
//             body: recipe,
//         })
//     },
//     update(id: string, recipe: Types.recipe) {
//         return request(`/recipes/${id}`, {
//             method: 'PUT',
//             body: recipe,
//         })
//     },
//     delete(id: string) {
//         return request(`/recipes/${id}`, {
//             method: 'DELETE',
//         })
//     }
// }

// export const Usages = {
//     get() {
//         return request(`/usages`, {
//             method: 'GET',
//         })
//     },
//     create(usage: Types.usage) {
//         return request(`/usages/`, {
//             method: 'POST',
//             body: usage,
//         })
//     },
//     delete(id: string) {
//         return request(`/usages/${id}`, {
//             method: 'DELETE',
//         })
//     }
// }