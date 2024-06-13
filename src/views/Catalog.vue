<template>
  <title>Intranet</title>
  <div class="catalog-container" @mousemove="updatePreviewPosition">
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
            @mouseenter="showPreview(product, $event)"
            @mouseleave="hidePreview"
          >
            <product-item :product-data="product" @item-clicked="goToProductPage" />
          </v-col>
        </v-row>
      </div>
    </div>
    <ProductPreview
      v-if="previewProduct"
      :product="previewProduct"
      :position="previewPosition"
      :visible="isPreviewVisible"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ProductItem from '@/components/ProductItem.vue'
export default defineComponent({
  name: 'CatalogView',
  components: {
    ProductItem,
    ProductPreview
  }
})
</script>

<script setup>
import { onMounted, onUnmounted, computed, ref } from 'vue'
import { productsStore } from '@/stores/products'
import ProductPreview from '@/components/ProductPreview.vue'
import { useRouter } from 'vue-router'

const store = productsStore()
const router = useRouter()

const searchQuery = ref('')
const previewProduct = ref(null)
const previewPosition = ref({ x: 0, y: 0 })
const isPreviewVisible = ref(false)
let previewTimeout = null

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

const showPreview = (product, event) => {
  if (previewTimeout) clearTimeout(previewTimeout)
  previewTimeout = setTimeout(() => {
    previewProduct.value = product
    isPreviewVisible.value = true
    previewPosition.value = {
      x: event.clientX + 10,
      y: event.clientY + 10
    }
  }, 300) // Delay of 300ms before showing the preview
}

const hidePreview = () => {
  if (previewTimeout) clearTimeout(previewTimeout)
  isPreviewVisible.value = false
  previewTimeout = setTimeout(() => {
    previewProduct.value = null
  }, 300) // Delay hiding to allow fade-out animation
}

onMounted(async () => {
  await store.fetchProductsFromDB()
})
onUnmounted(() => {
  if (previewTimeout) clearTimeout(previewTimeout)
})
</script>

<style scoped>
.catalog-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px; /* Adjust bottom padding to accommodate footer */
}

.search-bar {
  margin: 20px;
  width: 80%;
  max-width: 600px;
}

.products-list {
  width: 100%;
  padding: 0 20px;
  max-width: auto; /* Limit maximum width for better readability */
  background-color: #0ac6ff10;
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
  max-width: 180px; /* Adjust product column width */
  padding: 10px;
  margin-bottom: 20px;
}

.product-col:hover {
  transform: translateY(-5px);
  z-index: 100;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

.product-col img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-col .v-card-title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
}

.product-col .v-card-subtitle {
  font-size: 14px;
  color: #666;
}

.product-col .v-card-text {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

@media (max-width: 960px) {
  .product-col {
    width: 45%;
  }
}

@media (max-width: 600px) {
  .product-col {
    width: 100%;
  }
}
</style>
