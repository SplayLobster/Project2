<template>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <div id="app">
    <v-app>
      <v-toolbar app dense fixed class="app-toolbar">
        <v-btn icon @click="resetAndNavigateHome">
          <img src="./assets/home.png" alt="Home" class="toolbar-home" />
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="openAccountModal">
          <img src="./assets/logo.png" alt="Logo" class="toolbar-logo" />
        </v-btn>

        <a href="https://www.onologistics.com/" target="blank">
          <button style="color: white">INTRANET</button>
        </a>
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
        <Footer v-if="showFooter && $route.path !== '/cart'" class="footer" />
      </v-main>

      <AccountModal v-if="isModalVisible" @close="closeAccountModal" :show="isModalVisible" />
    </v-app>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Footer from './components/Footer.vue'
import AccountModal from './components/AccountModal.vue' // Import the modal component
import { productsStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const store = productsStore()
const router = useRouter()
const showFooter = ref(false)

// State for modal visibility
const isModalVisible = ref(false)

const resetAndNavigateHome = () => {
  store.resetStore()
  router.push('/')
}

// Function to open the account modal
const openAccountModal = () => {
  isModalVisible.value = true
}

// Function to close the account modal
const closeAccountModal = () => {
  isModalVisible.value = false
}

let debounceTimeout = null
const handleScroll = () => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    const scrollPosition = window.scrollY + window.innerHeight
    const threshold = document.documentElement.scrollHeight - window.innerHeight * 0.1 // Show footer when within 10% of the bottom
    showFooter.value = scrollPosition >= threshold
  }, 50)
}

handleScroll()

const debounceScroll = () => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(handleScroll, 50)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check in case user is already at the bottomù
  const session = JSON.parse(localStorage.getItem('session'))
  if (session) {
    console.log('User is logged in:', session)
    // Handle user being logged in, e.g., show their info or update UI
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', debounceScroll)
})
</script>

<style scoped>
#app {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container fills the screen */
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
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
  position: relative;
  flex-grow: 1;
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

.footer-spacing {
  height: 160px; /* Adjust based on the height of your footer */
}
</style>
