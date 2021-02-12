<script>
import { computed } from "vue"
import { useStore } from "../store"

export default {
  name: "RecipeCard",
  props: { recipe: Object },
  setup(props) {
    const store = useStore()
    const usages = computed(() =>
      Object.values(store.usages).filter(
        (usage) => usage.recipe === props.recipe._id
      )
    )
    const price = computed(() => usages.value.reduce((acc, usage) => {
      const presentations = store.ingredients[usage.ingredient].presentations

      // let's assume for now that there must exist a presentation with the same unit as the usage
      // under this circumstance is just a matter of multiplying
      const presentation = presentations.find(presentation => presentation.unit === usage.unit)
      if (!presentation) return -99999

      return acc + usage.amount * presentation.price / presentation.amount
    }, 0) * (100 + store.user.profit) / 100)

    return { usages, price }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-content">
      <p class="title">
        {{ recipe.name }}
      </p>
      <p class="subtitle">{{ Object.keys(usages).length }} ingredients</p>
      <p class="subtitle">
        <strong>$ {{ price }}</strong>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* https://tobiasahlin.com/blog/how-to-animate-box-shadow/ */
.card {
  position: relative;
  display: inline-block;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.card::after {
  content: "";
  border-radius: 5px;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.card:hover {
  -webkit-transform: scale(1.1, 1.1);
  transform: scale(1.1, 1.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.card:hover::after {
  opacity: 1;
}
</style>
