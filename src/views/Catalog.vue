<template>
  <title>Intranet</title>
  <div class="catalog-container">
    <v-text-field v-model="searchQuery" clearable label="Search" class="search-bar"></v-text-field>
    <div class="products-list">
      <div v-for="(products, category) in filteredCatalog" :key="category" class="category-section">
        <h2 class="category-title">{{ category }}</h2>
        <v-row dense class="products-row">
          <v-col
            v-for="product in products"
            :key="product.title"
            cols="6"
            sm="4"
            md="3"
            lg="2"
            class="product-col"
            @click="goToProductPage(product.title)"
          >
            <div class="product-item">
              <product-item :product-data="product" @item-clicked="goToProductPage" />
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
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
import { onMounted, computed, ref } from 'vue'
import { productsStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const store = productsStore()
const router = useRouter()

const searchQuery = ref('')

// Compute grouped catalog based on search query
const filteredCatalog = computed(() => {
  const grouped = {}
  for (const item of store.products) {
    // Filter by search query
    if (!item.title.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      continue
    }

    const key = item.category
    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(item)
  }

  return grouped
})

const goToProductPage = (title) => {
  router.push({ name: 'ProductView', params: { title } })
}

onMounted(async () => {
  await store.fetchProductsFromDB()
})
</script>

<style scoped>
.catalog-container {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-bar {
  position: fixed;
  z-index: 100;
  top: 7%;
  left: 10%;
  width: 100%;
  max-width: 80%;
  background-color: white;
  padding: 6px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.products-list {
  max-width: 85%;
  margin: 80px auto 0;
}

.category-section {
  max-width: 85%;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 4px solid #0ac6ffad;
}

.category-title {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid #f1f1f1;
}

.products-row {
  justify-content: flex-start;
  flex-wrap: wrap;
}

.product-col {
  display: flex;
  justify-content: center;
  padding: 5px;
}

.product-item {
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.524);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 220px;
  min-width: 180;
  margin: 0 auto;
  justify-content: space-between;
}

.product-item-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.product-brand {
  font-size: 12px;
  color: #757575;
  margin-bottom: 5px;
}

.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
}
</style>
