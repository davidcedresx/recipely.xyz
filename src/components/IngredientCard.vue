<script>
export default {
    name: 'IngredientCard',
    props: { ingredient: Object }
}
</script>

<template>
  <div class="card">
    <div class="card-content">
      <p class="title">
        {{ ingredient.name }}
      </p>
      <p class="subtitle">${{ ingredient.price }}</p>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Save</a>
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>