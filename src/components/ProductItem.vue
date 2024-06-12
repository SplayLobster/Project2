<template>
  <v-card class="product-item-card">
    <v-img :src="productData.thumbnail" class="product-image" aspect-ratio="1" />
    <v-card-title class="product-title">{{ productData.title }}</v-card-title>
    <v-card-subtitle class="product-brand">{{ productData.brand }}</v-card-subtitle>
    <v-card-text class="product-price">${{ productData.price }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    productData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.product-item-card {
  width: 100%;
  height: 100%;
  max-width: 150px; /* Consistent width */
  max-height: 300px; /* Consistent height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 10px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-title {
  font-size: 14px;
  font-weight: bold;
}

.product-brand {
  font-size: 12px;
  color: #757575;
}

.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
}
</style>
