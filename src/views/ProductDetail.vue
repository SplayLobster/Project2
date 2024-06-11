<template>
  <div class="product-page">
    <div class="product">
      <div class="product-image">
        <img :src="selectedProduct.thumbnail" alt="" />
      </div>
      <div class="product-details">
        <h2>{{ selectedProduct.title }}</h2>
        <h5 style="color: lightskyblue">{{ selectedProduct.brand }}</h5>
        <div class="rating">
          <font-awesome-icon
            v-for="index in fullStars"
            :key="`full-${index}`"
            :icon="['fas', 'star']"
            class="rated"
          />
          <font-awesome-icon v-if="hasHalfStar" :icon="['fas', 'star-half-alt']" class="rated" />
          <font-awesome-icon
            v-for="index in emptyStars"
            :key="`empty-${index}`"
            :icon="['far', 'star']"
            class="unrated"
          />
        </div>
        <br />
        <p style="margin-bottom: 0px">{{ selectedProduct.description }}</p>
        <br />
        <h2 style="margin-top: -12px">Price: ${{ selectedProduct.price }}</h2>
        <div class="button-alert-container">
          <v-btn
            style="margin-right: 10px"
            variant="elevated"
            color="indigo-lighten-3"
            @click="handleAddToCart"
            >Add to cart</v-btn
          >
          <v-btn variant="elevated" class="payment-button" @click="showModal">Buy now</v-btn>
          <transition name="fade">
            <div v-if="cartAlertVisible" class="cart-alert">
              <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="alert-icon" />
              <p>Item added to cart</p>
            </div>
          </transition>
        </div>
        <Modal v-if="isModalVisible" @close="closeModal">
          <h2>Payment Details</h2>
          <!-- Add your payment details here -->
        </Modal>
      </div>
    </div>
    <div class="suggested-products">
      <h3>Suggested Products</h3>
      <v-row>
        <v-col v-for="suggested in suggestedProducts" :key="suggested.title" cols="6" sm="6" md="6">
          <v-card @click="goToProductPage(suggested.title)" style="cursor: pointer">
            <v-img :src="suggested.thumbnail" height="150px" />
            <v-card-title>{{ suggested.title }}</v-card-title>
            <v-card-subtitle>{{ suggested.brand }}</v-card-subtitle>
            <v-card-text>${{ suggested.price }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
import { computed, ref } from 'vue'
import { productsStore } from '@/stores/products'
import { useRoute, useRouter } from 'vue-router'
import Modal from '@/components/Modal.vue'

const isModalVisible = ref(false)
const cartAlertVisible = ref(false)

const showModal = () => {
  isModalVisible.value = true
}
const closeModal = () => {
  isModalVisible.value = false
}

const store = productsStore()
const router = useRouter()
const route = useRoute()

const selectedProduct = computed(() => {
  return store.products.find((item) => item.title === route.params.title)
})

const suggestedProducts = computed(() => {
  if (!selectedProduct.value) return []
  return store.products.filter(
    (item) =>
      item.title !== selectedProduct.value.title &&
      (item.category === selectedProduct.value.category ||
        item.brand === selectedProduct.value.brand)
  )
})

const addToCart = () => {
  store.addToCart(selectedProduct.value)
}
const handleAddToCart = () => {
  addToCart()
  cartAlertVisible.value = true
  setTimeout(() => {
    cartAlertVisible.value = false
  }, 3000)
}

const goToProductPage = (title) => {
  router.push({ name: 'ProductView', params: { title } })
}

const fullStars = computed(() => Math.floor(selectedProduct.value.rating))
const hasHalfStar = computed(() => selectedProduct.value.rating % 1 !== 0)
const emptyStars = computed(() => 5 - fullStars.value - (hasHalfStar.value ? 1 : 0))
</script>

<style scoped>
.product-page {
  display: flex;
  margin-top: 50px;
}
.payment-button {
  background-color: #ffd814;
  color: #000000;
  cursor: pointer;
  width: 120px;
  height: 30px;
  text-align: center;
  line-height: 1.42857;
}
.top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.product-image {
  max-width: 100%;
  overflow: hidden;
}
.product {
  flex: 3;
  margin-right: 24px;
}

.suggested-products {
  flex: 1;
  margin-left: 24px;
  margin-top: -32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.suggested-product {
  cursor: pointer;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.suggested-product img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 8px;
}

.suggested-product p {
  margin: 0;
  text-align: center;
  font-size: 14px;
}

.rating {
  display: flex;
  align-items: center;
}

.rated {
  color: #ffab00;
  cursor: pointer;
}

.unrated {
  color: #757575;
  cursor: pointer;
}
.cart-alert {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: auto;
}

.alert-icon {
  color: orange;
  margin-right: 5px;
}
.button-alert-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.cart-alert {
  display: flex;
  align-items: center;
  margin-left: 10px; /* Space between the button and the alert */
}

.alert-icon {
  font-size: 30px;
  color: orange;
  margin-right: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
