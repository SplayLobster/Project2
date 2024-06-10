<template>
  <v-btn @click="router.push({ name: 'Catalog' })" color="primary" variant="elevated">
    Back to catalog
  </v-btn>

  <div class="product">
    <div class="product-image">
      <img :src="selectedProduct.thumbnail" alt="" />
    </div>
    <div class="product-details">
      <h2>{{ selectedProduct.title }}</h2>
      <h5 style="color: lightskyblue">{{ selectedProduct.brand }}</h5>
      <div class="rating">
        <font-awesome-icon
          v-for="star in fullStars"
          :key="`full-${star}`"
          icon="star"
          class="star"
        />
        <font-awesome-icon v-if="hasHalfStar" icon="star-half-alt" class="half-star" />
        <font-awesome-icon
          v-for="star in emptyStars"
          :key="`empty-${star}`"
          icon="star"
          class="empty-star"
        />
      </div>
      <br />
      <p>{{ selectedProduct.description }}</p>
      <br />
      <h2>Price: ${{ selectedProduct.price }}</h2>
      <v-btn variant="elevated" color="indigo-lighten-3" @click="addToCart">Add to cart</v-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ProductDetails'
})
</script>

<script setup>
import { computed } from 'vue'
import { productsStore } from '@/stores/products'
import { useRoute, useRouter } from 'vue-router'

const store = productsStore()
const router = useRouter()
const route = useRoute()

const selectedProduct = computed(() => {
  return store.products.find((item) => item.title === route.params.title)
})

const addToCart = () => {
  store.addToCart(selectedProduct.value)
}

const fullStars = computed(() => Math.floor(selectedProduct.value.rating))
const hasHalfStar = computed(() => selectedProduct.value.rating % 1 !== 0)
const emptyStars = computed(() => 5 - fullStars.value - (hasHalfStar.value ? 1 : 0))
</script>

<style scoped>
.product {
  display: flex;
  margin-top: 50px;
}

.product-image {
  margin-right: 24px;
}

.rating {
  display: flex;
  align-items: center;
}

.rating .fa-star {
  color: yellow;
}

.rating .half-star {
  position: relative;
  color: yellow;
}

.rating .empty-star {
  color: #ffffff;
  border-color: rgb(255, 230, 0);
}
</style>
