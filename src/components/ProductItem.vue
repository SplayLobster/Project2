<!-- ProductItem.vue -->
<template>
  <v-card class="product-card">
    <v-img
      :src="productData.thumbnail"
      alt="Product Image"
      class="product-image"
      height="200px"
    ></v-img>
    <v-card-title>{{ productData.title }}</v-card-title>
    <v-card-subtitle>${{ productData.price }}</v-card-subtitle>
  </v-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductItem',
  props: {
    productData: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped>
/* Base styles for the product card */
.product-card {
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

/* Styles for the product image */
.product-image {
  transition:
    filter 0.2s,
    transform 0.2s;
}

/* Hover effect */
.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-card:hover .product-image {
  filter: brightness(0.8);
  transform: scale(1.05);
}
</style>
