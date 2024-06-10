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
            <button @click="decrementQuantity(index)">-</button>
            {{ groupQuantity[index] }}
            <button @click="incrementQuantity(index)">+</button>
          </span>
          <button @click="removeFromCart(group[0].id)">Remove</button>
        </div>
      </div>
    </div>
  </div>
  <div class="cart-item">
    <p>Summary of the order: {{ returnSum(group, index) }}</p>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  name: 'CartView'
})
</script>

<script setup>
import { productsStore } from '@/stores/products'

const store = productsStore()

const returnSum = () => {
  return store.cart.reduce((acc, item) => acc + item.price, 0)
}

const removeFromCart = (id) => {
  store.removeFromCart(id)
}

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

const groupQuantity = ref(groupedCart.value.map((group) => group.length))

const incrementQuantity = (index) => {
  groupQuantity.value[index]++
}

const decrementQuantity = (index) => {
  if (groupQuantity.value[index] > 1) {
    groupQuantity.value[index]--
  }
}
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
</style>
