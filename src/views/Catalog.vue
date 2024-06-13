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
            <product-item :product-data="product" @item-clicked="goToProductPage" />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.search-bar {
  margin: 20px;
  width: 80%;
  max-width: 600px;
}

.products-list {
  width: 100%;
  padding: 0 20px;
}

.category-section {
  margin-bottom: 40px;
}

.category-title {
  margin: 20px 0;
  font-size: 24px;
  text-align: left;
  width: 100%;
  border-bottom: 2px solid #f1f1f1;
}

.products-row {
  display: flex;
  flex-wrap: wrap;
}

.product-col {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.524);
  cursor: pointer;
  width: 100%;
  height: 100%;
  max-width: 150px;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
}
</style>
