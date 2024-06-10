<!-- App.vue -->
<template>
  <div id="app">
    <v-app>
      <v-toolbar app dense fixed class="app-toolbar">
        <v-btn icon @click="resetAndNavigateHome">
          <img src="./assets/home.png" alt="Home" class="toolbar-home" />
        </v-btn>

        <v-spacer></v-spacer>
        <a href="https://intranet-web.it/" target="blank">
          <v-btn icon>
            <img src="./assets/intranet.png" alt="Logo" class="toolbar-logo" />
          </v-btn>
        </a>
        INTRANET
        <v-spacer></v-spacer>

        <router-link to="/cart">
          <v-btn icon>
            <v-badge
              class="toolbar-cart"
              :content="store.cart.length"
              color="red"
              overlap
              offset-x="10"
              offset-y="10"
            >
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
import { productsStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const store = productsStore()
const router = useRouter()

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

.toolbar-logo {
  width: 56px;
  height: 46px;
  cursor: alias;
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
  justify-content: center;
  align-items: center;
  height: fit-content;
}
.toolbar-cart:hover {
  animation: shaking 0.4s 2;
}
@keyframes shaking {
  0% {
    transform: translateX(0) rotate(0deg);
  }
  25% {
    transform: translateX(4px) rotate(5deg);
  }
  50% {
    transform: translateX(0px) rotate(0deg);
  }
  75% {
    transform: translateX(-4px) rotate(-5deg);
  }
  100% {
    transform: translateX(0px) rotate(0deg);
  }
}
</style>
