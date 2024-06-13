<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div v-if="!groupedCart.length" class="empty-cart">
      <h1>Empty Cart ...</h1>
    </div>
    <div class="cart-items" v-else>
      <div class="cart-item" v-for="(group, index) in groupedCart" :key="index">
        <div class="item-details">
          <img
            @click="goToProductPage(group[0].title)"
            style="cursor: pointer; height: 150px; width: 200px"
            :src="group[0].thumbnail"
            alt=""
          />

          <div class="item-info">
            <h2>{{ group[0].title }}</h2>
            <span>Brand: {{ group[0].brand }}</span> <br />
            <span>Category: {{ group[0].category }}</span> <br />
            <span>Price: ${{ group[0].price }}</span> <br />
            <div class="quantity-controls">
              <button
                style="color: red; font-size: 28px"
                @click="decrementQuantity(group[0].id, group[0].title)"
              >
                -
              </button>
              {{ group.length }}
              <button
                style="color: greenyellow; font-size: 20px"
                @click="incrementQuantity(group[0].id, group[0].title)"
              >
                +
              </button>
            </div>
            <button style="color: blue" @click="removeAllFromCart(group[0].id)">Remove</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="groupedCart.length" class="cart-summary">
      <div class="summary-info">
        <h4 style="float: right">${{ returnSum }}</h4>
        <p style="float: left; padding-right: 4px">Summary of order ({{ returnlenght }} items):</p>
      </div>
      <button type="button" class="payment-button" @click="showModal">PAYMENT</button>
      <Modal v-if="isModalVisible" @close="closeModal">
        <h2>Payment Details</h2>
        <!-- Add your payment details here -->
      </Modal>
    </div>
    <br />
    <Transition name="bounce">
      <p v-if="showRemoveMessage">{{ removedProductName }} removed from cart</p>
    </Transition>
    <Transition name="bounce">
      <p v-if="showAddMessage">{{ addedProductName }} added to cart</p>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { productsStore } from '@/stores/products'
import { useRouter } from 'vue-router'
import Modal from '@/components/Modal.vue'

const store = productsStore()
const router = useRouter()

// Modal visibility state
const isModalVisible = ref(false)
const showRemoveMessage = ref(false)
const showAddMessage = ref(false)
const removedProductName = ref('')
const addedProductName = ref('')

const showModal = () => {
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}

const goToProductPage = (title) => {
  router.push({ name: 'ProductView', params: { title } })
}

const returnlenght = computed(() => {
  return store.cart.length
})

// Calculate total price
const returnSum = computed(() => {
  return Math.floor(store.cart.reduce((acc, item) => acc + item.price, 0) * 100) / 100
})

// Add one unit of the product
const incrementQuantity = (id, name) => {
  const product = store.products.find((item) => item.id === id)
  if (product) {
    store.addToCart(product)
    if (!showRemoveMessage.value) {
      showAddMessage.value = true
      addedProductName.value = name
      setTimeout(() => {
        showAddMessage.value = false
      }, 1000)
    } else {
      setTimeout(() => {
        showAddMessage.value = true
        addedProductName.value = name
        setTimeout(() => {
          showAddMessage.value = false
        }, 1000)
      }, 1200)
    }
  }
}

const decrementQuantity = (id, name) => {
  store.removeOneFromCart(id)
  if (!showAddMessage.value) {
    showRemoveMessage.value = true
    removedProductName.value = name
    setTimeout(() => {
      showRemoveMessage.value = false
    }, 1000)
  } else {
    setTimeout(() => {
      showRemoveMessage.value = true
      removedProductName.value = name
      setTimeout(() => {
        showRemoveMessage.value = false
      }, 1000)
    }, 1200)
  }
}

const removeAllFromCart = (id) => {
  store.removeFromCart(id)
}

// Group cart items by their ID
const groupedCart = computed(() => {
  const grouped = {}
  for (const item of store.cart) {
    const key = item.id
    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(item)
  }

  return Object.values(grouped)
})
</script>

<style scoped>
/* General Styles */
h1,
h2,
span,
p {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #444;
  margin: 0;
}

.empty-cart {
  text-align: center;
  margin-top: 50px;
}

.empty-cart h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.empty-cart p {
  font-size: 16px;
  color: #777;
}

/* Cart Items Container */
.cart-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Display 4 items per row */
  gap: 20px;
  padding: 1px;
}

/* Cart Item Styles */
.cart-item {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 15px;
}
.cart-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Product Thumbnail */
.product-thumbnail {
  cursor: pointer;
  height: 180px;
  width: 100%;
  object-fit: cover;
}

/* Item Info */
.item-info {
  padding: 8px;
  display: flex;
  flex-direction: column;
}

.item-info h2 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.item-info .brand,
.item-info .category,
.item-info .price {
  font-size: 14px;
  color: #ff0000;
}

/* Quantity Controls */
.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center; /* Center horizontally */
  gap: 10px;
  margin: 10px 0;
}

.quantity-button {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.quantity-button.increment:hover {
  background-color: #dff0d8; /* Light green */
}
.quantity-button.decrement:hover {
  background-color: #f2dede; /* Light red */
}

.quantity {
  font-size: 16px;
  color: #333;
}

/* Remove Button */
.remove-button {
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;
  margin-top: 10px;
}
.remove-button:hover {
  background-color: #d32f2f;
}

/* Cart Summary */
.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 22px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 4px;
}

.summary-info {
  font-size: 16px;
  color: #333;
}

.summary-info h4 {
  font-size: 20px;
  font-weight: bold;
  color: #222;
}

.payment-button {
  background-color: #ffd814;
  border: none;
  color: #000;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;
}
.payment-button:hover {
  background-color: #ffb800;
  transform: translateY(-2px);
}

/* Feedback Messages */
.feedback-message {
  margin-top: 10px;
  font-size: 14px;
  color: #4caf50; /* Green for success */
  text-align: center;
  transition: opacity 0.5s ease-in-out;
}

/* Bounce Animation */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-out 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
