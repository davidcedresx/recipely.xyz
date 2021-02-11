const API_URL = process.env.NODE_ENV === 'production' ? 'https://api.recipely.xyz'  : 'http://localhost:3000'

function getToken() {
    return localStorage.getItem('token')
}

function getHeaders() {
    return {
        Authorization: 'Bearer ' + getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
}

async function request(url, payload) {
    const response = await fetch(API_URL + url, { ...payload, headers: getHeaders(), body: JSON.stringify(payload.body) })

    if (!response.ok) {
        throw new Error(await response.text())
    }

    return await response.json()
}

export const Auth = {
    login(username, password) {
        return request(`/auth/signin`, {
            method: 'POST',
            body: { username, password },
        })
    },
    register(username, password) {
        console.log('registering ', username, password)
        return request(`/auth/signup`, {
            method: 'POST',
            body: { username, password },
        })
    },
}


export const User = {
    get() {
        return request(`/user/`, {
            method: 'GET'
        })
    }
}

export const Ingredients = {
    get() {
        return request(`/ingredients`, {
            method: 'GET',
        })
    },
    create(recipe) {
        return request(`/ingredients/`, {
            method: 'POST',
            body: recipe,
        })
    },
    update(id, recipe) {
        return request(`/ingredients/${id}`, {
            method: 'PUT',
            body: recipe,
        })
    },
    delete(id) {
        return request(`/ingredients/${id}`, {
            method: 'DELETE',
        })
    },
}

export const Recipes = {
    get() {
        return request(`/recipes/`, {
            method: 'GET',
        })
    },
    create(recipe) {
        return request(`/recipes/`, {
            method: 'POST',
            body: recipe,
        })
    },
    update(id, recipe) {
        return request(`/recipes/${id}`, {
            method: 'PUT',
            body: recipe,
        })
    },
    delete(id) {
        return request(`/recipes/${id}`, {
            method: 'DELETE',
        })
    }
}

export const Usages = {
    get() {
        return request(`/usages`, {
            method: 'GET',
        })
    },
    create(usage) {
        return request(`/usages/`, {
            method: 'POST',
            body: usage,
        })
    },
    delete(id) {
        return request(`/usages/${id}`, {
            method: 'DELETE',
        })
    }
}