<template>
  <header>
    <v-toolbar title="Shop">
      <v-btn @click="router.push({ name: 'CartView' })" color="primary" variant="elevated"
        >Cart
        <v-badge v-if="cartQuantity" color="red" :content="cartQuantity"></v-badge>
      </v-btn>
    </v-toolbar>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { productsStore } from '@/stores/products'

const router = useRouter()
const store = productsStore()

const cartQuantity = computed(() => store.cartQuantity)
</script>

<style scoped>
.cart-items {
  text-align: end;
  padding: 16px;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
}
</style>
