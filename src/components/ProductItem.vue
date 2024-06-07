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
    <v-card-actions>
      <v-btn v-if="showAddToCart" @click.stop="addToCart">Add to Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent } from 'vue'
import { productsStore } from '@/stores/products'

export default defineComponent({
  name: 'ProductItem',
  props: {
    productData: {
      type: Object,
      required: true
    },
    showAddToCart: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const store = productsStore()

    const addToCart = () => {
      store.addToCart(props.productData)
    }

    return {
      addToCart
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
