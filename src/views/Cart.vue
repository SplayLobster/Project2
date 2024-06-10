<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="!groupedCart.length" style="text-align: center">
    <h1>Empty Cart ...</h1>
  </div>
  <div class="cart-items" v-else>
    <div class="cart-item" v-for="(group, index) in groupedCart" :key="index">
      <div class="item-details">
        <img :src="group[0].thumbnail" alt="" />
        <div>
          <span>Brand: {{ group[0].brand }}</span> <br />
          <span>Category: {{ group[0].category }}</span> <br />
          <span>Price: ${{ group[0].price }}</span> <br />
          <span>
            <button @click="decrementQuantity(group[0].id)">-</button>
            {{ group.length }}
            <button @click="incrementQuantity(group[0].id)">+</button>
          </span>
          <button @click="removeAllFromCart(group[0].id)">Remove</button>
        </div>
      </div>
    </div>
    <div class="cart-summary">
      <p>Summary of the order: ${{ returnSum }}</p>
    </div>
    <button type="button" class="payment-button" @click="showModal">PAYMENT</button>
    <Modal v-if="isModalVisible" @close="closeModal">
      <h2>Payment Details</h2>
      <!-- Add your payment details here -->
    </Modal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { productsStore } from '@/stores/products'
import Modal from '@/components/Modal.vue'

const store = productsStore()

// Modal visibility state
const isModalVisible = ref(false)

const showModal = () => {
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}

// Calculate total price
const returnSum = computed(() => {
  return Math.floor(store.cart.reduce((acc, item) => acc + item.price, 0) * 100) / 100
})

// Add one unit of the product
const incrementQuantity = (id) => {
  const product = store.products.find((item) => item.id === id)
  if (product) {
    store.addToCart(product)
  }
}

// Remove one unit of the product
const decrementQuantity = (id) => {
  store.removeOneFromCart(id)
}

// Remove all units of the product
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
.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  box-shadow: 0 0 17px 6px #e7e7e7;
  border-radius: 8px;
  padding: 16px;
}

.item-details img {
  width: 20%;
}

.identical-items {
  margin-left: 20px;
  font-size: 14px;
  color: #888;
}

button {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}

input[type='number'] {
  width: 40px;
  padding: 5px;
  font-size: 14px;
}
.payment-button {
  background-color: #ffd814;
  color: #000000;
  font-size: 14px;
  cursor: pointer;
  width: 120px;
  height: 30px;
  border-radius: 15px;
  text-align: center;
  font-size: 11px;
  line-height: 1.42857;
}
</style>
