<!-- src/components/ProductPreview.vue -->
<template>
  <v-card
    v-if="product"
    class="product-preview"
    :class="{ show: visible }"
    :style="{
      top: `${position.y}px`,
      left: `${position.x}px`,
      transform: 'translate(-50%, -100%)' /* Offset to place the preview above and center */
    }"
  >
    <v-card-title>{{ product.title }}</v-card-title>
    <v-card-subtitle>{{ product.category }}</v-card-subtitle>
    <v-card-text>{{ product.description }}</v-card-text>
  </v-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductPreview',
  props: {
    product: Object,
    position: Object,
    visible: Boolean
  }
})
</script>

<style scoped>
.product-preview {
  position: absolute;
  z-index: 100;
  width: 250px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  pointer-events: none;
}

.product-preview.show {
  opacity: 1;
  pointer-events: all;
}
</style>
