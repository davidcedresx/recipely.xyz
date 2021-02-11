import { reactive, toRaw, watch } from 'vue'

const store = reactive(
  loadStore() ??
  {
    ingredients: {},
    recipes: {},
    usages: {},
    user: {}
  }
)

function loadStore() {
  const value = JSON.parse(localStorage.getItem('store'))
  console.log('restoring store from local storage', value)
  return value
}

function saveStore() {
  console.log('saving store to local storage')
  localStorage.setItem('store', JSON.stringify(toRaw(store)))
}

export function useStore() {
  watch(store, () => {
    saveStore(store)
  })
  return store
}

export function resetStore() {
  store.ingredients = {}
  store.recipes = {}
  store.usages = {}
  store.user = {}
}
