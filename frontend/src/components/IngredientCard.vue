<script>
export default {
  name: "IngredientCard",
  props: { ingredient: Object },
};
</script>

<template>
  <div class="card">
    <div class="card-content">
      <p class="title">
        {{ ingredient.name }}
      </p>
      <p class="subtitle">${{ ingredient.price }}</p>
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
