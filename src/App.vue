<template>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Intranet</title>
  <div id="app">
    <v-app>
      <v-toolbar app dense fixed class="app-toolbar">
        <v-btn icon @click="resetAndNavigateHome">
          <img src="./assets/home.png" alt="Home" class="toolbar-home" />
        </v-btn>

        <v-spacer></v-spacer>
        <a href="https://intranet-web.it/" target="blank">
          <v-btn icon>
            <img src="./assets/logo.png" alt="Logo" class="toolbar-logo" />
          </v-btn>
        </a>
        INTRANET
        <v-spacer></v-spacer>

        <router-link to="/cart">
          <v-btn style="margin-right: 12px" icon>
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

      <v-main class="main-content">
        <router-view></router-view>
        <div :class="{ 'footer-spacing': showFooter }"></div>
        <Footer v-if="showFooter" />
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Footer from './components/Footer.vue'
import { productsStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const store = productsStore()
const router = useRouter()
const showFooter = ref(false)

const resetAndNavigateHome = () => {
  store.resetStore()
  router.push('/')
}

let timeout = null
const handleScroll = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    const scrollPosition = window.scrollY + window.innerHeight
    const threshold = document.documentElement.scrollHeight - window.innerHeight * 0.1 // Show footer when within 10% of the bottom
    showFooter.value = scrollPosition >= threshold
  }, 50)
}

// Debounce scroll event
let debounceTimeout = null
const debounceScroll = () => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(handleScroll, 50)
}

onMounted(() => {
  window.addEventListener('scroll', debounceScroll)
  handleScroll() // Initial check in case user is already at the bottom
})

onUnmounted(() => {
  window.removeEventListener('scroll', debounceScroll)
})
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
  position: relative; /* Ensure the positioning context is set */
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

/* Add this for the footer spacing */
.footer-spacing {
  height: 200px; /* Adjust based on the height of your footer */
}
</style>
