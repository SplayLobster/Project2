<template>
  <title>Intranet</title>
  <div class="products-list">
    <v-text-field clearable label="Search"></v-text-field>
    <v-row no-gutters>
      <v-col
        style="padding: 12px"
        v-for="product in store.products"
        :key="product.title"
        cols="6"
        sm="6"
        md="4"
        lg="3"
        @click="goToProductPage(product.title)"
      >
        <product-item
          style="cursor: pointer"
          :product-data="product"
          @item-clicked="goToProductPage"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ProductItem from '@/components/ProductItem.vue'
export default defineComponent({
  name: 'CatalogView',
  components: {
    ProductItem
  }
})
</script>

<script setup>
import { onMounted } from 'vue'
import { productsStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const store = productsStore()
const router = useRouter()

const goToProductPage = (title) => {
  router.push({ name: 'ProductView', params: { title } })
}

onMounted(async () => {
  await store.fetchProductsFromDB()
})
</script>

<style scoped></style>
