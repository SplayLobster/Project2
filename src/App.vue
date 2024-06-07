<!-- App.vue -->
<template>
  <div id="app">
    <v-app>
      <v-toolbar app dense fixed class="app-toolbar">
        <v-btn icon @click="resetAndNavigateHome">
          <img src="./assets/home.png" alt="Home" class="toolbar-home" />
        </v-btn>

        <v-spacer></v-spacer>
        INTRANET
        <v-spacer></v-spacer>

        <router-link to="/cart">
          <v-btn icon>
            <v-badge :content="cartQuantity" color="red" overlap offset-x="10" offset-y="10">
              <img src="./assets/cart.png" alt="Cart" class="toolbar-cart" />
            </v-badge>
          </v-btn>
        </router-link>
      </v-toolbar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { productsStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const store = productsStore()
const router = useRouter()
const cartQuantity = computed(() => store.cart.length)

const resetAndNavigateHome = () => {
  store.resetStore() // Reset the store
  router.push('/') // Navigate to home
}
</script>

<style scoped>
.app-toolbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: #0ac6ffad;
  color: white;
}

.v-main {
  margin-top: 56px;
  padding: 16px;
}

.toolbar-home {
  width: 40px;
  height: 32px;
  cursor: pointer;
}

.toolbar-cart {
  width: 54px;
  height: 40px;
  cursor: pointer;
}
</style>
