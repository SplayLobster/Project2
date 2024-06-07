<!-- App.vue -->
<template>
  <div id="app">
    <v-app>
      <!-- Adjusted toolbar to be fixed at the top -->
      <v-toolbar app dense fixed class="app-toolbar">
        <router-link to="/">
          <img src="./assets/home.png" alt="Home" class="toolbar-home" />
        </router-link>

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

      <!-- Ensure main content starts after the toolbar -->
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { productsStore } from '@/stores/products'

const store = productsStore()

// Use a computed property to access the cart quantity from the store
const cartQuantity = computed(() => store.cart.length)
</script>

<style scoped>
/* Toolbar remains fixed at the top */
.app-toolbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: #1976d24f; /* Adjust to match your theme */
  color: white; /* Ensure text is visible */
}

/* Ensure the main content area starts after the fixed toolbar */
.v-main {
  margin-top: 56px; /* Adjust based on toolbar height */
  padding: 16px;
}

/* Adjust the size of images and align them properly within the toolbar */
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

/* Optional: styling to match the rest of your site */
.v-btn {
  margin-left: 10px;
}
</style>
